using Microsoft.VisualStudio.TestTools.UnitTesting;
using CloudDelivery.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CloudDelivery.Data;
using CloudDelivery.Providers;
using CloudDelivery.Tests.Initialize;
using CloudDelivery.Tests.Mocks;
using CloudDelivery.Models;
using CloudDelivery.Data.Entities;
using CloudDelivery.Data.Enums;
using CloudDelivery.Models.Orders;
using Moq;

namespace CloudDelivery.Services.Tests
{
    [TestClass()]
    public class OrdersServiceTests
    {
        IOrdersService ordersService;
        ICDContext ctx;

        public OrdersServiceTests()
        {
            ICDContextFactory ctxFactory = DatabaseMocksFactory.GetCtxFactoryMock().Object;
            ctx = ctxFactory.GetContext();

            Mock<IHttpProvider> httpProvider = HttpProviderMocks.GMapsHttpProviderMock();
            var gMapsProvider = new GMapsProvider(httpProvider.Object);

            var cache = new CacheProvider();
            ordersService = new OrdersService(cache, gMapsProvider, ctxFactory);
        }

        [TestMethod()]
        public void AcceptOrder_ShouldSetAcceptedStatus()
        {
            Order order = ctx.Orders.Where(x => x.Status == OrderStatus.Added).FirstOrDefault();
            var carrier = ctx.Carriers.FirstOrDefault();

            order.AcceptedTime = null;
            this.ordersService.AcceptOrder(order.Id, carrier.Id);

            Assert.AreEqual(carrier.Id, order.CarrierId);
            Assert.IsNotNull(order.AcceptedTime);
            Assert.AreEqual(OrderStatus.Accepted, order.Status);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void AcceptOrder_ShouldThrowCarrierNullReferenceException()
        {
            Order order = this.ctx.Orders.FirstOrDefault();
            this.ordersService.AcceptOrder(order.Id, int.MinValue);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void AcceptOrder_ShouldThrowOrderNullReferenceException()
        {
            Carrier carrier = this.ctx.Carriers.FirstOrDefault();
            this.ordersService.AcceptOrder(int.MinValue, carrier.Id);
        }

        [TestMethod()]
        [ExpectedException(typeof(ArgumentException))]
        public void AcceptOrder_ShouldThrowInvalidStatusArgumentException()
        {
            Carrier carrier = this.ctx.Carriers.FirstOrDefault();
            Order order = this.ctx.Orders.Where(x => x.Status != OrderStatus.Added).FirstOrDefault();
            this.ordersService.AcceptOrder(order.Id, carrier.Id);
        }


        [TestMethod()]
        public void AddOrder_ShouldAddNewOrder()
        {
            Order order = new Order();
            SalePoint SalePoint = ctx.SalePoints.FirstOrDefault();

            this.ordersService.AddOrder(order, SalePoint.Id);

            Assert.IsNotNull(order.AddedTime);
            Assert.AreEqual(SalePoint.Id, order.SalePointId);
            Assert.AreEqual(OrderStatus.Added, order.Status);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void AddOrder_ShouldThrowSalePointNullReferenceException()
        {
            this.ordersService.AddOrder(new Order(), int.MinValue);
        }

        [TestMethod()]
        public void CancelOrder_ShouldSetCancelledStatus()
        {
            Order order = ctx.Orders.Where(x => x.Status <= OrderStatus.Accepted && x.Status != OrderStatus.Cancelled).FirstOrDefault();
            order.CancellationTime = null;

            this.ordersService.CancelOrder(order.Id);

            Assert.IsNotNull(order.CancellationTime);
            Assert.AreEqual(OrderStatus.Cancelled, order.Status);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void CancelOrder_ShouldThrowOrderNullReferenceException()
        {
            this.ordersService.CancelOrder(int.MinValue);
        }

        [TestMethod()]
        [ExpectedException(typeof(ArgumentException))]
        public void CancelOrder_ShouldThrowAlreadyCancelledArgumentException()
        {
            Order order = ctx.Orders.Where(x => x.Status == OrderStatus.Cancelled).FirstOrDefault();
            this.ordersService.CancelOrder(order.Id);
        }

        [TestMethod()]
        [ExpectedException(typeof(ArgumentException))]
        public void CancelOrder_ShouldThrownInvalidStatusArgumentException()
        {
            Order order = ctx.Orders.Where(x => x.Status > OrderStatus.Accepted).FirstOrDefault();
            this.ordersService.CancelOrder(order.Id);
        }


        [TestMethod()]
        public void CheckDistanceTime_ShouldReturnDistanceAndTimeToEndpointThroughSalePoint()
        {
            GeoPosition geoPos = new GeoPosition { lat = "52.406563", lng = "16.925853" };
            Order order = ctx.Orders.Where(x => x.EndLatLng == @"{'lat':'52.227799','lng':'20.985093'}").FirstOrDefault();

            ApproximateTrace trace = this.ordersService.CheckDistanceTime(order.Id, geoPos).Result;


            Assert.AreEqual(8296, trace.CarrierToSalePoint.Time);
            Assert.AreEqual(216020, trace.CarrierToSalePoint.Distance);

            Assert.AreEqual(5228, trace.SalePointToEndpoint.Time);
            Assert.AreEqual(127627, trace.SalePointToEndpoint.Distance);
        }

        [TestMethod()]
        public void CheckDistanceTime_ShouldThrowOrderNullReferenceException()
        {
            Assert.ThrowsExceptionAsync<NullReferenceException>(async () => await this.ordersService.CheckDistanceTime(int.MinValue, new GeoPosition()));
        }

        [TestMethod()]
        public void CheckDistanceTime_ShouldThrowInvalidStatusArgumentException()
        {
            Order order = ctx.Orders.Where(x => x.Status != OrderStatus.Added).FirstOrDefault();
            Assert.ThrowsExceptionAsync<ArgumentException>(async ()=> await this.ordersService.CheckDistanceTime(order.Id, new GeoPosition()));
        }

        [TestMethod()]
        public void Details_ShouldReturnOrderDetails()
        {
            Order order = ctx.Orders.FirstOrDefault();
            Order details = this.ordersService.Details(order.Id);
            Assert.AreEqual(order, details);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void Details_ShouldThrowOrderNullReferenceException()
        {
            this.ordersService.Details(int.MinValue);
        }


        [TestMethod()]
        public void List_ShouldReturnListWithoutFilters()
        {
            int ordersCount = ctx.Orders.Count();
            int listCount = this.ordersService.List(null).Count;
            Assert.AreEqual(ordersCount, listCount);
        }


        [TestMethod()]
        public void List_ShouldReturnListWithCarrierFilter()
        {
            var carrier = ctx.Carriers.FirstOrDefault();
            int ordersCount = ctx.Orders.Where(x => x.Carrier != null && x.Carrier.UserId == carrier.UserId).Count();

            var filter = new OrderFiltersModel() { CarrierUserId = carrier.UserId };
            int listCount = this.ordersService.List(filter).Count;

            Assert.AreEqual(ordersCount, listCount);
        }


        [TestMethod()]
        public void List_ShouldReturnListWithSalePointFilter()
        {
            SalePoint SalePoint = ctx.SalePoints.FirstOrDefault();
            int ordersCount = ctx.Orders.Where(x => x.SalePoint != null && x.SalePoint.UserId == SalePoint.UserId).Count();

            var filter = new OrderFiltersModel() { SalePointUserId = SalePoint.UserId };
            int listCount = this.ordersService.List(filter).Count;

            Assert.AreEqual(ordersCount, listCount);
        }


        [TestMethod()]
        public void List_ShouldReturnListWithOrganisationFilter()
        {
            var organisation = ctx.Organisations.FirstOrDefault();
            int ordersCount = ctx.Orders.Where(x => x.SalePoint != null && x.SalePoint.User.OrganisationId == organisation.Id ||
                                             x.Carrier != null && x.Carrier.User.OrganisationId == organisation.Id).Count();

            var filter = new OrderFiltersModel() { OrganisationId = organisation.Id };
            int listCount = this.ordersService.List(filter).Count;

            Assert.AreEqual(ordersCount, listCount);
        }


        [TestMethod()]
        public void List_ShouldReturnListWithStatusFilter()
        {
            int ordersCount = ctx.Orders.Where(x => x.Status == OrderStatus.Added).Count();

            var filter = new OrderFiltersModel() { Status = OrderStatus.Added };
            int listCount = this.ordersService.List(filter).Count;

            Assert.AreEqual(ordersCount, listCount);
        }


        [TestMethod()]
        public void List_ShouldReturnListWithPackageFilter()
        {
            Package package = ctx.Packages.FirstOrDefault();
            int ordersCount = ctx.Orders.Where(x => x.PackageId == package.Id).Count();

            var filter = new OrderFiltersModel() { PackageId = package.Id };
            int listCount = this.ordersService.List(filter).Count;

            Assert.AreEqual(ordersCount, listCount);
        }


        [TestMethod()]
        public void List_ShouldReturnListWithAddedTimeFilter()
        {
            var filters = new OrderFiltersModel { AddedTimeStart = new DateTime(2018, 03, 01), AddedTimeEnd = new DateTime(2018, 03, 08) };
            int ordersCount = ctx.Orders.Where(x => x.AddedTime >= filters.AddedTimeStart && x.AddedTime <= filters.AddedTimeEnd).Count();

            int listCount = this.ordersService.List(filters).Count;

            Assert.AreEqual(ordersCount, listCount);
        }

        [TestMethod()]
        public void List_ShouldReturnListWithPriorityFilter()
        {
            var filters = new OrderFiltersModel { PriorityMax = 3, PriorityMin = 1 };
            int ordersCount = ctx.Orders.Where(x => x.Priority >= filters.PriorityMin && x.Priority <= filters.PriorityMax).Count();

            int listCount = this.ordersService.List(filters).Count;

            Assert.AreEqual(ordersCount, listCount);
        }

        [TestMethod()]
        public void List_ShouldReturnListWithDeliveryFilter()
        {
            var filters = new OrderFiltersModel { DeliveredTimeStart = new DateTime(2018, 02, 14), DeliveredTimeEnd = new DateTime(2018, 03, 08) };
            int ordersCount = ctx.Orders.Where(x => x.DeliveredTime >= filters.DeliveredTimeStart && x.DeliveredTime <= filters.DeliveredTimeEnd).Count();

            int listCount = this.ordersService.List(filters).Count;

            Assert.AreEqual(ordersCount, listCount);
        }

        [TestMethod()]
        public void List_ShouldReturnListWithDistanceFilter()
        {
            var filters = new OrderFiltersModel { DistanceMax = 1500, DistanceMin = 500 };
            int ordersCount = ctx.Orders.Where(x => x.DistanceMeters >= filters.DistanceMin && x.DistanceMeters <= filters.DistanceMax).Count();

            int listCount = this.ordersService.List(filters).Count;

            Assert.AreEqual(ordersCount, listCount);
        }

        [TestMethod()]
        public void List_ShouldReturnListWithAllFilters()
        {
            var filters = new OrderFiltersModel();

            filters.AddedTimeStart = new DateTime(2018, 02, 14);
            filters.AddedTimeEnd = new DateTime(2018, 03, 08);

            filters.DeliveredTimeStart = new DateTime(2018, 02, 21);
            filters.DeliveredTimeEnd = new DateTime(2018, 03, 04);

            filters.DistanceMax = 2300;
            filters.DistanceMin = 1500;

            filters.PriorityMax = 9;
            filters.PriorityMin = 3;

            filters.DeliveryMinutesMax = 20;
            filters.DeliveryMinutesMin = 14;

            filters.OrganisationId = 1;

            filters.Status = OrderStatus.InDelivery;

            filters.CarrierUserId = 25;
            filters.SalePointUserId = 20;

            filters.PackageId = 5;

            int ordersCount = ctx.Orders.Where(x =>
                                    x.AddedTime >= filters.AddedTimeStart &&
                                    x.AddedTime <= filters.AddedTimeEnd &&
                                
                                    x.DeliveredTime >= filters.DeliveredTimeStart &&
                                    x.DeliveredTime <= filters.DeliveredTimeEnd &&
                                
                                    x.DistanceMeters >= filters.DistanceMin &&
                                    x.DistanceMeters <= filters.DistanceMax &&

                                    x.Priority >= filters.PriorityMin &&
                                    x.Priority <= filters.PriorityMax &&

                                    x.FinalMinutes >= filters.DeliveryMinutesMin &&
                                    x.FinalMinutes <= filters.DeliveryMinutesMax &&

                                    (x.SalePoint.User.OrganisationId == filters.OrganisationId || x.Carrier.User.OrganisationId == filters.OrganisationId) &&
                                
                                    x.Status == filters.Status &&
                                
                                    x.Carrier.UserId == filters.CarrierUserId &&
                                    x.SalePoint.UserId == filters.SalePointUserId &&
                                
                                    x.PackageId == filters.PackageId)
                                .Count();

            int listCount = this.ordersService.List(filters).Count;
            Assert.AreEqual(ordersCount, listCount);
        }


        [TestMethod()]
        public void SetDelivered_ShouldSetDeliveredStatus()
        {
            Order order = ctx.Orders.Where(x => x.Status == OrderStatus.InDelivery).FirstOrDefault();
            order.FinalMinutes = null;
            order.DeliveredTime = null;
            order.PickUpTime = DateTime.Now;

            this.ordersService.SetDelivered(order.Id);

            Assert.IsNotNull(order.DeliveredTime);
            Assert.AreEqual(OrderStatus.Delivered, order.Status);
            Assert.IsTrue(order.FinalMinutes.Value >= 0);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void SetDelivered_ShouldThrowOrderNullReferenceException()
        {
            this.ordersService.SetDelivered(int.MinValue);
        }

        [TestMethod()]
        [ExpectedException(typeof(ArgumentException))]
        public void SetDelivered_ShouldThrowInvalidStatusArgumentException()
        {
            Order order = ctx.Orders.Where(x => x.Status != OrderStatus.InDelivery).FirstOrDefault();
            this.ordersService.SetDelivered(order.Id);
        }

        [TestMethod()]
        public void SetPickup_ShouldSetInDeliveryStatus()
        {
            Order order = ctx.Orders.Where(x => x.Status == OrderStatus.Accepted).FirstOrDefault();
            order.PickUpTime = null;

            this.ordersService.SetPickup(order.Id);

            Assert.IsNotNull(order.PickUpTime);
            Assert.AreEqual(OrderStatus.InDelivery, order.Status);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void SetPickup_ShouldThrowOrderNullReferenceException()
        {
            this.ordersService.SetPickup(int.MinValue);
        }

        [TestMethod()]
        [ExpectedException(typeof(ArgumentException))]
        public void SetPickup_ShouldThrowInvalidStatusArgumentException()
        {
            Order order = ctx.Orders.Where(x => x.Status != OrderStatus.Accepted).FirstOrDefault();
            this.ordersService.SetPickup(order.Id);
        }

        [TestMethod()]
        public void SetTrace_ShouldSetNewTrace()
        {
            Order order = ctx.Orders.Where(x => x.EndLatLng == @"{'lat':'51.766664','lng':'19.478922'}").FirstOrDefault();
            var geoPos = new GeoPosition { lat = "52.406563", lng = "16.925853" };

            order.ExpectedMinutes = null;
            order.DistanceMeters = null;
            order.TraceJSON = null;
            order.StartLatLng = null;


            string traceJSON = this.ordersService.SetTrace(order.Id, geoPos).Result;

            Assert.IsFalse(String.IsNullOrEmpty(traceJSON));
            Assert.AreEqual(traceJSON, order.TraceJSON);
            Assert.AreEqual(267, order.ExpectedMinutes);
            Assert.AreEqual(436248, order.DistanceMeters);
            Assert.AreEqual(geoPos.ToJsonString(), order.StartLatLng);
        }

        [TestMethod()]
        public void SetTrace_ShouldThrowOrderNullReferenceException()
        {
            Assert.ThrowsExceptionAsync<NullReferenceException>(async () => await this.ordersService.SetTrace(int.MinValue, new GeoPosition()));
        }

        [TestMethod()]
        public void SetTrace_ShouldThrowInvalidStatusArgumentException()
        {
            Order order = ctx.Orders.Where(x => x.Status == OrderStatus.Delivered).FirstOrDefault();
            Assert.ThrowsExceptionAsync<ArgumentException>(async () => await this.ordersService.SetTrace(order.Id, new GeoPosition()));
        }


        [TestMethod()]
        public void GetTrace_ShouldReturnTraceJSON()
        {
            Order order = ctx.Orders.FirstOrDefault();
            string trace = this.ordersService.GetTrace(order.Id);
            Assert.AreEqual(order.TraceJSON, trace);
        }


        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetTrace_ShouldThrowOrderNullReferenceException()
        {
            this.ordersService.GetTrace(int.MinValue);
        }

        [TestMethod()]
        [ExpectedException(typeof(ArgumentException))]
        public void GetTrace_ShouldThrowNoTraceArgumentException()
        {
            Order order = this.ctx.Orders.FirstOrDefault();
            order.TraceJSON = "";
            this.ordersService.GetTrace(order.Id);
        }
    }
}