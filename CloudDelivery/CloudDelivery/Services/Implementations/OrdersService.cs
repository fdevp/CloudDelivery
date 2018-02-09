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
        public OrdersService(ICacheProvider cacheProvider, IGMapsProvider gMapsProvider, ICDContextFactory ctxFactory)
        {
            this.cacheProvider = cacheProvider;
            this.ctxFactory = ctxFactory;
            this.gMapsProvider = gMapsProvider;
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

        public int AddOrder(Order order, int SalePointId)
        {
            using (ICDContext ctx = this.ctxFactory.GetContext())
            {
                if (!ctx.SalePoints.Any(x => x.Id == SalePointId))
                    throw new NullReferenceException("Punkt sprzedaży nie istnieje.");

                order.AddedTime = DateTime.Now;
                order.SalePointId = SalePointId;
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

        public async Task<ApproximateTrace> CheckDistanceTime(int orderId, GeoPosition startLocation)
        {
            Order order = null;
            using (ICDContext ctx = this.ctxFactory.GetContext())
            {
                order = ctx.Orders.Where(x => x.Id == orderId).Include(x => x.SalePoint).FirstOrDefault();

                if (order == null)
                    throw new NullReferenceException("Zamówienie nie istnieje.");

                if (order.Status != OrderStatus.Added)
                    throw new ArgumentException("Na tym etapie nie możesz sprawdzić dystansu.");
            }

            GeoPosition spPos = JsonConvert.DeserializeObject<GeoPosition>(order.SalePoint.LatLng);
            GeoPosition endPos = JsonConvert.DeserializeObject<GeoPosition>(order.EndLatLng);

            return await this.gMapsProvider.DistanceMatrix(startLocation.ToGoogleString(), spPos.ToGoogleString(), endPos.ToGoogleString());

        }

        public Order Details(int orderId)
        {
            using (ICDContext ctx = this.ctxFactory.GetContext())
            {
                Order order = ctx.Orders.Where(x => x.Id == orderId).Include(x => x.SalePoint).FirstOrDefault();

                if (order == null)
                    throw new NullReferenceException("Zamówienie nie istnieje.");

                return order;
            }
        }

        public List<Order> List(OrderFiltersModel filters)
        {
            using (ICDContext ctx = this.ctxFactory.GetContext())
            {
                IQueryable<Order> query = ctx.Orders.Include(x => x.SalePoint.User).Include(x => x.Carrier.User);

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


                //priority
                if (filters.PriorityMin.HasValue)
                    query = query.Where(x => x.Priority >= filters.PriorityMin.Value);
                if (filters.PriorityMax.HasValue)
                    query = query.Where(x => x.Priority <= filters.PriorityMax.Value);

                //delivery minutes
                if (filters.DeliveryMinutesMin.HasValue)
                    query = query.Where(x => x.FinalMinutes >= filters.DeliveryMinutesMin.Value);
                if (filters.DeliveryMinutesMax.HasValue)
                    query = query.Where(x => x.FinalMinutes <= filters.DeliveryMinutesMax.Value);

                //distance
                if (filters.DistanceMin.HasValue)
                    query = query.Where(x => x.DistanceMeters >= filters.DistanceMin.Value);
                if (filters.DistanceMax.HasValue)
                    query = query.Where(x => x.DistanceMeters <= filters.DistanceMax.Value);

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
                    throw new ArgumentException("Na tym etapie nie można zakończyń dostawy.");

                order.DeliveredTime = DateTime.Now;

                TimeSpan deliveryTime = order.PickUpTime.Value.Subtract(order.DeliveredTime.Value);
                order.FinalMinutes = deliveryTime.Minutes;

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

        public async Task<string> SetTrace(int orderId, GeoPosition startLocation)
        {
            Order order = null;
            using (ICDContext ctx = this.ctxFactory.GetContext())
            {
                order = ctx.Orders.Where(x => x.Id == orderId).Include(x => x.SalePoint).FirstOrDefault();
                if (order == null)
                    throw new NullReferenceException("Zamówienie nie istnieje.");

                if (order.Status == OrderStatus.Delivered || order.Status == OrderStatus.Cancelled)
                    throw new ArgumentException("Na tym etapie nie możesz wyznaczyć trasy.");
            }


            GeoPosition spPos = JsonConvert.DeserializeObject<GeoPosition>(order.SalePoint.LatLng);
            GeoPosition endPos = JsonConvert.DeserializeObject<GeoPosition>(order.EndLatLng);

            List<string> points = new List<string> { spPos.ToGoogleString() };
            OrderTrace response = await this.gMapsProvider.Directions(startLocation.ToGoogleString(), endPos.ToGoogleString(), points);

            order.ExpectedMinutes = response.properties.Time / 60;
            order.DistanceMeters = response.properties.Distance;
            order.TraceJSON = response.TraceJSON;
            order.StartLatLng = startLocation.ToJsonString();

            using (ICDContext ctx = this.ctxFactory.GetContext())
            {
                ctx.SaveChanges();
            }

            return order.TraceJSON;
        }

        public string GetTrace(int orderId)
        {
            Order order = null;
            using (ICDContext ctx = this.ctxFactory.GetContext())
            {
                order = ctx.Orders.Where(x => x.Id == orderId).FirstOrDefault();

                if (order == null)
                    throw new NullReferenceException("Zamówienie nie istnieje.");

                if (String.IsNullOrEmpty(order.TraceJSON))
                    throw new ArgumentException("Trasa nie została wygenerowana.");

                return order.TraceJSON;
            }
        }

        private ICacheProvider cacheProvider;
        private ICDContextFactory ctxFactory;
        private IGMapsProvider gMapsProvider;
    }
}