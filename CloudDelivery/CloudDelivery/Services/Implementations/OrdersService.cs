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
                var salepoint = ctx.SalePoints.Include(x => x.User.AspNetUser).Where(x => x.Id == salePointId).FirstOrDefault();

                if (salepoint == null)
                    throw new NullReferenceException("Punkt sprzedaży nie istnieje.");

                order.SalePoint = salepoint;

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
                Order order = ctx.Orders.Where(x => x.Id == orderId).Include(x => x.SalePoint.User.AspNetUser).Include(x => x.Carrier.User.AspNetUser).FirstOrDefault();

                if (order == null)
                    throw new NullReferenceException("Zamówienie nie istnieje.");

                return order;
            }
        }

        public List<Order> List(OrdersListFiltersModel filters)
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
                if (filters.Status != null)
                    query = query.Where(order => filters.Status.Any(statusValue => statusValue == order.Status));


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

                //pagination
                if (filters.PageIndex.HasValue && filters.PageSize.HasValue)
                {
                    int toSkipAmount = filters.PageIndex.Value - 1;

                    if (toSkipAmount < 0)
                        toSkipAmount = 0;

                    toSkipAmount = toSkipAmount * filters.PageSize.Value;

                    query = query.OrderByDescending(x => x.Id).Skip(toSkipAmount).Take(filters.PageSize.Value);
                }

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

                if (order.Status != OrderStatus.InDelivery && order.Status != OrderStatus.Accepted)
                    throw new ArgumentException("Na tym etapie nie można zakończyć dostawy.");

                //if carrier forgot to set picked up
                if (order.Status == OrderStatus.Accepted)
                    order.PickUpTime = order.DeliveredTime = DateTime.Now;
                else
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

        public int Count(OrderCountFiltersModel filters)
        {
            using(ICDContext ctx = this.ctxFactory.GetContext())
            {
                IQueryable<Order> query = ctx.Orders;

                //no filters
                if (filters == null)
                    return query.Count();

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
                if (filters.Status != null)
                    query = query.Where(order => filters.Status.Any(statusValue => statusValue == order.Status));

                //addedtime start
                if (filters.AddedTimeStart.HasValue)
                    query = query.Where(x => x.AddedTime >= filters.AddedTimeStart.Value);

                //addedtime end
                if (filters.AddedTimeEnd.HasValue)
                    query = query.Where(x => x.AddedTime <= filters.AddedTimeEnd.Value);

                //acceptedtime start
                if (filters.AcceptedTimeStart.HasValue)
                    query = query.Where(x => x.AcceptedTime >= filters.AcceptedTimeStart.Value);

                //acceptedtime end
                if (filters.AcceptedTimeEnd.HasValue)
                    query = query.Where(x => x.AcceptedTime <= filters.AcceptedTimeEnd.Value);

                return query.Count();
            }
        }

        private ICacheProvider cacheProvider;
        private ICDContextFactory ctxFactory;
    }
}