using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using CloudDelivery.Data;
using CloudDelivery.Data.Entities;
using CloudDelivery.Data.Enums;
using CloudDelivery.Data.Enums.Routes;
using CloudDelivery.Models;
using CloudDelivery.Models.GoogleApis;
using CloudDelivery.Models.Routes;
using CloudDelivery.Providers;
using Newtonsoft.Json;

namespace CloudDelivery.Services.Implementations
{
    public class RoutesService : IRoutesService
    {
        public RoutesService(ICacheProvider cacheProvider, ICDContextFactory ctxFactory)
        {
            this.cacheProvider = cacheProvider;
            this.ctxFactory = ctxFactory;
        }

        public int Add(int carrierId, List<RoutePointEditModel> points, GeoPosition startPosition)
        {
            using (ICDContext ctx = this.ctxFactory.GetContext())
            {
                //validate carrier
                if (!ctx.Carriers.Any(x => x.Id == carrierId))
                    throw new NullReferenceException("Dostawca nie istnieje.");

                
                if (ctx.Routes.Any(x => x.CarrierId == carrierId && x.Status == RouteStatus.Active))
                    throw new ArgumentException("Dostawca posiada aktywną trasę");
                

                //validate points
                var carrierOrders = ctx.Orders.Where(x => x.CarrierId == carrierId && x.Status == OrderStatus.Accepted).ToList();

                foreach (RoutePointEditModel point in points)
                {
                    if (!carrierOrders.Any(x => x.Id == point.OrderId))
                        throw new ArgumentException("Niewłaściwy punkt w trasie");
                }

                //add new route
                var route = new Route();
                route.AddedTime = DateTime.Now;
                route.CarrierId = carrierId;
                route.Status = RouteStatus.Active;
                route.StartLatLng = startPosition.ToJsonString();

                ctx.Routes.Add(route);
                ctx.SaveChanges();

                //add points to route
                foreach (RoutePointEditModel point in points)
                {
                    var dbPoint = new RoutePoint();

                    dbPoint.Index = point.Index;
                    dbPoint.RouteId = route.Id;
                    dbPoint.OrderId = point.OrderId;
                    dbPoint.Type = point.Type;

                    ctx.RoutePoints.Add(dbPoint);
                }

                ctx.SaveChanges();

                return route.Id;
            }
        }

        public Route Details(int routeId)
        {
            using (ICDContext ctx = this.ctxFactory.GetContext())
            {
                Route route = ctx.Routes.Where(x => x.Id == routeId).Include(x => x.Carrier).Include(x => x.Points).FirstOrDefault();

                if (route == null)
                    throw new NullReferenceException("Trasa nie istnieje.");

                return route;
            }
        }

        public void Finish(int routeId)
        {
            using (ICDContext ctx = this.ctxFactory.GetContext())
            {
                Route route = ctx.Routes.Where(x => x.Id == routeId).Include(x => x.Carrier).Include(x => x.Points).FirstOrDefault();

                if (route == null)
                    throw new NullReferenceException("Trasa nie istnieje.");

                if (route.Status != RouteStatus.Active)
                    throw new ArgumentException("Trasa jest nieaktywna.");

                route.FinishTime = DateTime.Now;
                route.Status = RouteStatus.Finished;

                ctx.SaveChanges();
            }
        }

        public List<Route> List(RouteFiltersModel filters)
        {
            using (ICDContext ctx = this.ctxFactory.GetContext())
            {
                IQueryable<Route> query = ctx.Routes.Include(x => x.Points).Include(x => x.Carrier);

                //no filters
                if (filters == null)
                    return query.ToList();

                //carrier id
                if (filters.CarrierId.HasValue)
                    query = query.Where(x => x.CarrierId == filters.CarrierId.Value);

                //status
                if(filters.Status.HasValue)
                    query = query.Where(x => x.Status == filters.Status.Value);

                //added time
                if (filters.AddedTimeStart.HasValue)
                    query = query.Where(x => x.AddedTime >= filters.AddedTimeStart.Value);

                if (filters.AddedTimeEnd.HasValue)
                    query = query.Where(x => x.AddedTime <= filters.AddedTimeEnd.Value);

                //finish time
                if (filters.FinishTimeStart.HasValue)
                    query = query.Where(x => x.FinishTime >= filters.FinishTimeStart.Value);

                if (filters.FinishTimeEnd.HasValue)
                    query = query.Where(x => x.FinishTime <= filters.FinishTimeEnd.Value);


                //duration
                if (filters.DurationMin.HasValue)
                    query = query.Where(x => x.Duration >= filters.DurationMin.Value);

                if (filters.DurationMax.HasValue)
                    query = query.Where(x => x.Duration <= filters.DurationMax.Value);


                //distance
                if (filters.DistanceMin.HasValue)
                    query = query.Where(x => x.Distance >= filters.DistanceMin.Value);

                if (filters.DistanceMax.HasValue)
                    query = query.Where(x => x.Distance <= filters.DistanceMax.Value);

                return query.ToList();
            }
        }

        private GeoPosition GetPositionFromPoint(RoutePoint point)
        {
            GeoPosition pointPosition;

            try
            {
                if (point.Type == RoutePointType.EndPoint)
                    pointPosition = JsonConvert.DeserializeObject<GeoPosition>(point.Order.EndLatLng);
                else
                    pointPosition = JsonConvert.DeserializeObject<GeoPosition>(point.Order.SalePoint.LatLng);
            }
            catch (Exception e)
            {
                throw new Exception("Problem przy przetwarzaniu pozycji");
            }


            return pointPosition;
        }

        private ICacheProvider cacheProvider;
        private ICDContextFactory ctxFactory;
    }
}