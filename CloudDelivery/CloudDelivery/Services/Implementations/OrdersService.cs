using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CloudDelivery.Data.Entities;
using CloudDelivery.Providers;
using CloudDelivery.Data;
using CloudDelivery.Models;
using System.Data.Entity;
using System.Threading.Tasks;
using Newtonsoft.Json;
using CloudDelivery.Data.Enums;
using CloudDelivery.Models.Orders;

namespace CloudDelivery.Services
{
    public class OrdersService : IOrdersService
    {
        public OrdersService(ICacheProvider cacheProvider, ICDContextFactory ctxFactory)
        {
            this.cacheProvider = cacheProvider;
            this.ctxFactory = ctxFactory;
        }

        public void AcceptOrder(int orderId, int carrierId)
        {
            using (ICDContext ctx = this.ctxFactory.GetContext())
            {
                if (!ctx.Carriers.Any(x => x.Id == carrierId))
                    throw new NullReferenceException("Dostawca nie istnieje.");

                Order order = ctx.Orders.Where(x => x.Id == orderId).FirstOrDefault();

                if (order == null)
                    throw new NullReferenceException("Zamówienie nie istnieje.");

                if (order.Status != OrderStatus.Added)
                    throw new ArgumentException("Na tym etapie nie można zaakceptować zamówienia.");

                order.CarrierId = carrierId;
                order.AcceptedTime = DateTime.Now;
                order.Status = OrderStatus.Accepted;
                ctx.SaveChanges();
            }
        }

        public int AddOrder(Order order, int salePointId)
        {
            using (ICDContext ctx = this.ctxFactory.GetContext())
            {
                if (!ctx.SalePoints.Any(x => x.Id == salePointId))
                    throw new NullReferenceException("Punkt sprzedaży nie istnieje.");

                order.AddedTime = DateTime.Now;
                order.SalePointId = salePointId;
                order.Status = OrderStatus.Added;

                ctx.Orders.Add(order);
                ctx.SaveChanges();
            }

            return order.Id;
        }

        public void CancelOrder(int orderId)
        {
            using (ICDContext ctx = this.ctxFactory.GetContext())
            {
                Order order = ctx.Orders.Where(x => x.Id == orderId).FirstOrDefault();

                if (order == null)
                    throw new NullReferenceException("Zamówienie nie istnieje.");

                if (order.Status == OrderStatus.Cancelled)
                    throw new ArgumentException("Zamówienie zostało już anulowane.");

                if (order.Status > OrderStatus.Accepted)
                    throw new ArgumentException("Na tym etapie nie można anulować zamówienia.");

                order.CancellationTime = DateTime.Now;
                order.Status = OrderStatus.Cancelled;
                ctx.SaveChanges();
            }
        }

        public Order Details(int orderId)
        {
            using (ICDContext ctx = this.ctxFactory.GetContext())
            {
                Order order = ctx.Orders.Where(x => x.Id == orderId).Include(x => x.SalePoint.User).Include(x => x.Carrier.User).FirstOrDefault();

                if (order == null)
                    throw new NullReferenceException("Zamówienie nie istnieje.");

                return order;
            }
        }

        public List<Order> List(OrderFiltersModel filters)
        {
            using (ICDContext ctx = this.ctxFactory.GetContext())
            {
                IQueryable<Order> query = ctx.Orders.Include(x => x.SalePoint.User).Include(x => x.Carrier.User.AspNetUser);

                //no filters
                if (filters == null)
                    return query.ToList();

                //carrier and SalePoint
                if (filters.SalePointUserId.HasValue)
                    query = query.Where(x => x.SalePoint != null && x.SalePoint.UserId == filters.SalePointUserId);
                if (filters.CarrierUserId.HasValue)
                    query = query.Where(x => x.Carrier != null && x.Carrier.UserId == filters.CarrierUserId);


                //organisation
                if (filters.OrganisationId.HasValue)
                    query = query.Where(x => x.SalePoint != null && x.SalePoint.User.OrganisationId == filters.OrganisationId ||
                                             x.Carrier != null && x.Carrier.User.OrganisationId == filters.OrganisationId);


                //status
                if (filters.Status.HasValue)
                    query = query.Where(x => x.Status == filters.Status);


                //package
                if (filters.PackageId.HasValue)
                    query = query.Where(x => x.PackageId == filters.PackageId);

                //added time
                if (filters.AddedTimeStart.HasValue)
                    query = query.Where(x => x.AddedTime >= filters.AddedTimeStart.Value);

                if (filters.AddedTimeEnd.HasValue)
                    query = query.Where(x => x.AddedTime <= filters.AddedTimeEnd.Value);


                //delivered time
                if (filters.DeliveredTimeStart.HasValue)
                    query = query.Where(x => x.DeliveredTime >= filters.DeliveredTimeStart.Value);

                if (filters.DeliveredTimeEnd.HasValue)
                    query = query.Where(x => x.DeliveredTime <= filters.DeliveredTimeEnd.Value);

                //price
                if (filters.PriceMin.HasValue)
                    query = query.Where(x => x.Price >= filters.PriceMin.Value);
                if (filters.PriceMax.HasValue)
                    query = query.Where(x => x.Price <= filters.PriceMax.Value);

                //priority
                if (filters.PriorityMin.HasValue)
                    query = query.Where(x => x.Priority >= filters.PriorityMin.Value);
                if (filters.PriorityMax.HasValue)
                    query = query.Where(x => x.Priority <= filters.PriorityMax.Value);

                //delivery minutes
                if (filters.DurationMin.HasValue)
                    query = query.Where(x => x.Duration >= filters.DurationMin.Value);
                if (filters.DurationMax.HasValue)
                    query = query.Where(x => x.Duration <= filters.DurationMax.Value);


                return query.ToList();
            }
        }

        public void SetDelivered(int orderId)
        {
            using (ICDContext ctx = this.ctxFactory.GetContext())
            {
                Order order = ctx.Orders.Where(x => x.Id == orderId).FirstOrDefault();

                if (order == null)
                    throw new NullReferenceException("Zamówienie nie istnieje.");

                if (order.Status != OrderStatus.InDelivery)
                    throw new ArgumentException("Na tym etapie nie można zakończyć dostawy.");

                order.DeliveredTime = DateTime.Now;

                TimeSpan deliveryTime = order.DeliveredTime.Value.Subtract(order.PickUpTime.Value);
                order.Duration = deliveryTime.Minutes;

                order.Status = OrderStatus.Delivered;

                ctx.SaveChanges();
            }
        }

        public void SetPickup(int orderId)
        {
            using (ICDContext ctx = this.ctxFactory.GetContext())
            {
                Order order = ctx.Orders.Where(x => x.Id == orderId).FirstOrDefault();

                if (order == null)
                    throw new NullReferenceException("Zamówienie nie istnieje.");

                if (order.Status != OrderStatus.Accepted)
                    throw new ArgumentException("Na tym etapie nie można podjąć zamówienia.");

                order.PickUpTime = DateTime.Now;
                order.Status = OrderStatus.InDelivery;

                ctx.SaveChanges();
            }
        }

        public void DiscardOrder(int orderId)
        {
            using (ICDContext ctx = this.ctxFactory.GetContext())
            {
                Order order = ctx.Orders.Where(x => x.Id == orderId).FirstOrDefault();

                if (order == null)
                    throw new NullReferenceException("Zamówienie nie istnieje.");

                if (order.Status != OrderStatus.Accepted)
                    throw new ArgumentException("Na tym etapie nie można porzucić zamówienia.");

                order.PickUpTime = null;
                order.Status = OrderStatus.Added;

                ctx.SaveChanges();
            }
        }

        public List<Order> InProgressList(int salepointId)
        {
            using(var ctx = this.ctxFactory.GetContext())
            {
                IQueryable<Order> query = ctx.Orders.Include(x => x.SalePoint.User).Include(x => x.Carrier.User.AspNetUser);

                query = query.Where(x => x.SalePointId == salepointId);
                query = query.Where(x => x.Status == OrderStatus.Accepted || x.Status == OrderStatus.InDelivery);

                return query.ToList();
            }
        }

        public List<Order> FinishedList(int salepointId)
        {
            using (var ctx = this.ctxFactory.GetContext())
            {
                IQueryable<Order> query = ctx.Orders.Include(x => x.SalePoint.User).Include(x => x.Carrier.User.AspNetUser);

                query = query.Where(x => x.SalePointId == salepointId);
                query = query.Where(x => x.Status == OrderStatus.Cancelled || x.Status == OrderStatus.Delivered);

                return query.ToList();
            }
        }

        private ICacheProvider cacheProvider;
        private ICDContextFactory ctxFactory;
    }
}