using Microsoft.VisualStudio.TestTools.UnitTesting;
using CloudDelivery.Services.Implementations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CloudDelivery.Tests.Initialize;
using CloudDelivery.Data;
using CloudDelivery.Providers;
using CloudDelivery.Data.Entities;
using CloudDelivery.Data.Enums.Routes;
using CloudDelivery.Models.Routes;
using CloudDelivery.Models;
using CloudDelivery.Data.Enums;

namespace CloudDelivery.Services.Tests
{
    [TestClass()]
    public class RoutesServiceTests
    {
        IRoutesService routesService;
        ICDContext ctx;

        public RoutesServiceTests()
        {
            ICDContextFactory ctxFactory = DatabaseMocksFactory.GetCtxFactoryMock().Object;
            ctx = ctxFactory.GetContext();

            var cache = new CacheProvider();
            routesService = new RoutesService(cache, ctxFactory);
        }

        [TestMethod()]
        public void Add_ShouldAddNewRoute()
        {
            //find carrier who has no active routes and has orders with accepted status
            List<Carrier> carriers = ctx.Carriers.Where(x => !ctx.Routes.Any(y => y.CarrierId == x.Id && y.Status == RouteStatus.Active)).ToList();
            int carrierId = carriers.Where(x => ctx.Orders.Any(y => y.CarrierId == x.Id && y.Status == OrderStatus.Accepted)).FirstOrDefault().Id;

            //find orders taken by carrier and with status accepted
            List<Order> orders = ctx.Orders.Where(x => x.CarrierId == carrierId && x.Status == OrderStatus.Accepted).ToList();

            //create RoutePointEMs
            int index = 0;
            List<RoutePointEditModel> pointsEM = orders.Select(x => new RoutePointEditModel { Index = index++, OrderId = x.Id, Type = (RoutePointType)(index % 2) }).ToList();

            //add route and get results
            int addedRouteId = routesService.Add(carrierId, pointsEM, new GeoPosition { lat = "", lng = "" });
            Route addedRoute = ctx.Routes.Where(x => x.Id == addedRouteId).FirstOrDefault();
            List<RoutePoint> points = ctx.RoutePoints.Where(x => x.Id == addedRouteId).OrderBy(x => x.Index).ToList();

            //validate points
            for (int i = 0; i < points.Count; i++)
            {
                Assert.AreEqual(pointsEM[i].Index, points[i].Index);
                Assert.AreEqual(pointsEM[i].OrderId, points[i].OrderId);
                Assert.AreEqual(pointsEM[i].Type, points[i].Type);
                Assert.AreEqual(addedRouteId, points[i].RouteId);
            }

            //validate route
            Assert.IsNotNull(addedRoute.AddedTime);
            Assert.AreEqual(orders.Count, points.Count);
            Assert.AreEqual(RouteStatus.Active, addedRoute.Status);
            Assert.AreEqual(addedRoute.CarrierId, carrierId);

        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void Add_ShouldThrowCarrierNullException()
        {
            routesService.Add(int.MinValue, new List<RoutePointEditModel>(), new GeoPosition { lat = "", lng = "" });
        }

        [TestMethod()]
        [ExpectedException(typeof(ArgumentException))]
        public void Add_ShouldThrowActiveRouteExistsException()
        {
            int carrierId = ctx.Routes.Where(x => x.Status == RouteStatus.Active).FirstOrDefault().CarrierId;


            List<Order> orders = ctx.Orders.Where(x => x.CarrierId == carrierId && x.Status == OrderStatus.Accepted).ToList();
            int index = 0;
            List<RoutePointEditModel> pointsEM = orders.Select(x => new RoutePointEditModel { Index = index++, OrderId = x.Id, Type = RoutePointType.EndPoint }).ToList();

            routesService.Add(carrierId, pointsEM, new GeoPosition { lat = "", lng = "" });
        }



        [TestMethod()]
        [ExpectedException(typeof(ArgumentException))]
        public void Add_ShouldThrowWrongPointStatusException()
        {
            //find carrier who has no active routes and has orders with accepted status
            List<Carrier> carriers = ctx.Carriers.Where(x => !ctx.Routes.Any(y => y.CarrierId == x.Id && y.Status == RouteStatus.Active)).ToList();
            int carrierId = carriers.Where(x => ctx.Orders.Any(y => y.CarrierId == x.Id && y.Status == OrderStatus.Accepted)).FirstOrDefault().Id;

            //find orders taken by carrier and with status accepted
            List<Order> orders = ctx.Orders.Where(x => x.CarrierId == carrierId && x.Status == OrderStatus.Accepted).ToList();

            //create RoutePointEMs
            int index = 0;
            List<RoutePointEditModel> pointsEM = orders.Select(x => new RoutePointEditModel { Index = index++, OrderId = x.Id, Type = (RoutePointType)(index % 2) }).ToList();

            //add point with incorrect type
            Order deliveredOrder = ctx.Orders.Where(x => x.CarrierId == carrierId && x.Status == OrderStatus.Delivered).FirstOrDefault();
            pointsEM.Add(new RoutePointEditModel { Index = index++, OrderId = deliveredOrder.Id, Type = RoutePointType.SalePoint });


            //add route
            int addedRouteId = routesService.Add(carrierId, pointsEM, new GeoPosition { lat = "", lng = "" });
        }


        [TestMethod()]
        [ExpectedException(typeof(ArgumentException))]
        public void Add_ShouldThrowWrongPointCarrierException()
        {
            //find carrier who has no active routes and has orders with accepted status
            List<Carrier> carriers = ctx.Carriers.Where(x => !ctx.Routes.Any(y => y.CarrierId == x.Id && y.Status == RouteStatus.Active)).ToList();
            int carrierId = carriers.Where(x => ctx.Orders.Any(y => y.CarrierId == x.Id && y.Status == OrderStatus.Accepted)).FirstOrDefault().Id;

            //find orders taken by carrier and with status accepted
            List<Order> orders = ctx.Orders.Where(x => x.CarrierId == carrierId && x.Status == OrderStatus.Accepted).ToList();

            //create RoutePointEMs
            int index = 0;
            List<RoutePointEditModel> pointsEM = orders.Select(x => new RoutePointEditModel { Index = index++, OrderId = x.Id, Type = (RoutePointType)(index % 2) }).ToList();

            //add point with incorrect carrierId
            Order deliveredOrder = ctx.Orders.Where(x =>x.Status == OrderStatus.Accepted).FirstOrDefault();
            pointsEM.Add(new RoutePointEditModel { Index = index++, OrderId = deliveredOrder.Id, Type = RoutePointType.SalePoint });


            //add route
            int addedRouteId = routesService.Add(carrierId, pointsEM, new GeoPosition { lat = "", lng = "" });
        }



        [TestMethod()]
        public void Details_ShouldReturnRouteDetails()
        {
            Route dbRoute = ctx.Routes.FirstOrDefault();
            Route route = routesService.Details(dbRoute.Id);

            Assert.AreEqual(dbRoute.Id, route.Id);
            Assert.IsNotNull(dbRoute.Carrier);
            Assert.IsNotNull(dbRoute.Points);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void Details_ShouldThrowRouteNullException()
        {
            routesService.Details(int.MinValue);
        }

        //GetActiveRoute
        [TestMethod()]
        public void ActiveRouteDetails_ShouldReturnActiveRouteDetails()
        {
            int carrierId = ctx.Carriers.Where(x => ctx.Routes.Any(y => y.CarrierId == x.Id && y.Status == RouteStatus.Active)).FirstOrDefault().Id;
            Route dbActiveRoute = ctx.Routes.Where(x => x.CarrierId == carrierId && x.Status == RouteStatus.Active).FirstOrDefault();
            Route activeRoute = routesService.ActiveRouteDetails(carrierId);
            Assert.AreEqual(dbActiveRoute.Id, activeRoute.Id);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void ActiveRouteDetails_ShouldThrowRouteNullException()
        {
            int carrierId = ctx.Carriers.Where(x => !ctx.Routes.Any(y => y.CarrierId == x.Id && y.Status == RouteStatus.Active)).FirstOrDefault().Id;
            routesService.ActiveRouteDetails(carrierId);
        }


        [TestMethod()]
        public void Finish_ShouldFinishRoute()
        {
            Route route = ctx.Routes.Where(x => x.Status == RouteStatus.Active).FirstOrDefault();
            this.routesService.Finish(route.Id);
            Assert.AreEqual(RouteStatus.Finished, route.Status);
            Assert.IsNotNull(route.FinishTime);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void Finish_ShouldThrowRouteNullException()
        {
            routesService.Finish(int.MinValue);
        }

        [TestMethod()]
        [ExpectedException(typeof(ArgumentException))]
        public void Finish_ShouldThrowRouteStatusException()
        {
            Route route = ctx.Routes.Where(x => x.Status == RouteStatus.Finished).FirstOrDefault();
            routesService.Finish(route.Id);
        }


        [TestMethod()]
        public void List_ShouldReturnRoutesWithoutFilters()
        {
            int dbRoutesCount = ctx.Routes.Count();
            int serviceRoutesCount = routesService.List(null).Count;
            Assert.AreEqual(dbRoutesCount, serviceRoutesCount);
        }

        [TestMethod()]
        public void List_ShouldReturnListWithCarrierFilter()
        {
            int carrierId = 2;
            int dbRoutesCount = ctx.Routes.Where(x => x.CarrierId == carrierId).Count();

            RouteFiltersModel filters = new RouteFiltersModel { CarrierId = carrierId };

            int serviceRoutesCount = routesService.List(filters).Count;
            Assert.AreEqual(dbRoutesCount, serviceRoutesCount);
        }


        [TestMethod()]
        public void List_ShouldReturnListWithStatusFilter()
        {
            //active routes
            int dbRoutesCount = ctx.Routes.Where(x => x.Status == RouteStatus.Active).Count();

            RouteFiltersModel filters = new RouteFiltersModel { Status = RouteStatus.Active };

            int serviceRoutesCount = routesService.List(filters).Count;
            Assert.AreEqual(dbRoutesCount, serviceRoutesCount);

            //finished routes
            dbRoutesCount = ctx.Routes.Where(x => x.Status == RouteStatus.Finished).Count();

            filters.Status = RouteStatus.Finished;
            serviceRoutesCount = routesService.List(filters).Count;

            Assert.AreEqual(dbRoutesCount, serviceRoutesCount);
        }

        [TestMethod()]
        public void List_ShouldReturnListWithAddedTimeFilter()
        {
            DateTime startDateTime = DateTime.Now.AddDays(1);
            DateTime endDateTime = DateTime.Now.AddDays(8);
            int dbRoutesCount = ctx.Routes.Where(x => x.AddedTime >= startDateTime && x.AddedTime <= endDateTime).Count();

            RouteFiltersModel filters = new RouteFiltersModel { AddedTimeStart = startDateTime, AddedTimeEnd = endDateTime };

            int serviceRoutesCount = routesService.List(filters).Count;
            Assert.AreEqual(dbRoutesCount, serviceRoutesCount);
        }

        [TestMethod()]
        public void List_ShouldReturnListWithFinishTimeFilter()
        {
            DateTime startDateTime = DateTime.Now.AddDays(1);
            DateTime endDateTime = DateTime.Now.AddDays(8);

            int dbRoutesCount = ctx.Routes.Where(x => x.FinishTime >= startDateTime && x.FinishTime <= endDateTime).Count();

            RouteFiltersModel filters = new RouteFiltersModel { FinishTimeStart = startDateTime, FinishTimeEnd = endDateTime };

            int serviceRoutesCount = routesService.List(filters).Count;
            Assert.AreEqual(dbRoutesCount, serviceRoutesCount);
        }

        [TestMethod()]
        public void List_ShouldReturnListWithDurationFilter()
        {
            int durationMin = 4;
            int durationMax = 7;

            int dbRoutesCount = ctx.Routes.Where(x => x.Duration >= durationMin && x.Duration <= durationMax).Count();

            RouteFiltersModel filters = new RouteFiltersModel { DurationMin = durationMin, DurationMax = durationMax };

            int serviceRoutesCount = routesService.List(filters).Count;
            Assert.AreEqual(dbRoutesCount, serviceRoutesCount);
        }

        [TestMethod()]
        public void List_ShouldReturnListWithDistanceFilter()
        {
            int distanceMin = 400;
            int distanceMax = 700;

            int dbRoutesCount = ctx.Routes.Where(x => x.Distance >= distanceMin && x.Distance <= distanceMax).Count();

            RouteFiltersModel filters = new RouteFiltersModel { DistanceMin = distanceMin, DistanceMax = distanceMax };

            int serviceRoutesCount = routesService.List(filters).Count;
            Assert.AreEqual(dbRoutesCount, serviceRoutesCount);
        }

        [TestMethod()]
        public void List_ShouldReturnListWithAllFilters()
        {
            RouteFiltersModel filters = new RouteFiltersModel();

            filters.CarrierId = 1;

            filters.AddedTimeStart = DateTime.Now;
            filters.AddedTimeEnd = DateTime.Now.AddDays(11);

            filters.FinishTimeStart = DateTime.Now;
            filters.FinishTimeEnd = DateTime.Now.AddDays(12);

            filters.DistanceMin = 350;
            filters.DistanceMax = 550;

            filters.DurationMin = 1;
            filters.DurationMax = 5;

            filters.Status = RouteStatus.Finished;

            int dbRoutesCount = ctx.Routes.Where(x => x.CarrierId == filters.CarrierId &&
                                                      x.Status == filters.Status &&

                                                      x.AddedTime >= filters.AddedTimeStart &&
                                                      x.AddedTime <= filters.AddedTimeEnd &&

                                                      x.AddedTime >= filters.FinishTimeStart &&
                                                      x.AddedTime <= filters.FinishTimeEnd &&

                                                      x.Distance >= filters.DistanceMin &&
                                                      x.Distance <= filters.DistanceMax &&

                                                      x.Duration >= filters.DurationMin &&
                                                      x.Duration <= filters.DurationMax).Count();



            int serviceRoutesCount = routesService.List(filters).Count;
            Assert.AreEqual(dbRoutesCount, serviceRoutesCount);
        }
    }
}