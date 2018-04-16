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

            var cache = new CacheProvider();
            ordersService = new OrdersService(cache, ctxFactory);
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

            var filter = new OrdersListFiltersModel() { CarrierUserId = carrier.UserId };
            int listCount = this.ordersService.List(filter).Count;

            Assert.AreEqual(ordersCount, listCount);
        }


        [TestMethod()]
        public void List_ShouldReturnListWithSalePointFilter()
        {
            SalePoint SalePoint = ctx.SalePoints.FirstOrDefault();
            int ordersCount = ctx.Orders.Where(x => x.SalePoint != null && x.SalePoint.UserId == SalePoint.UserId).Count();

            var filter = new OrdersListFiltersModel() { SalePointUserId = SalePoint.UserId };
            int listCount = this.ordersService.List(filter).Count;

            Assert.AreEqual(ordersCount, listCount);
        }


        [TestMethod()]
        public void List_ShouldReturnListWithOrganisationFilter()
        {
            var organisation = ctx.Organisations.FirstOrDefault();
            int ordersCount = ctx.Orders.Where(x => x.SalePoint != null && x.SalePoint.User.OrganisationId == organisation.Id ||
                                             x.Carrier != null && x.Carrier.User.OrganisationId == organisation.Id).Count();

            var filter = new OrdersListFiltersModel() { OrganisationId = organisation.Id };
            int listCount = this.ordersService.List(filter).Count;

            Assert.AreEqual(ordersCount, listCount);
        }


        [TestMethod()]
        public void List_ShouldReturnListWithStatusFilter()
        {
            int ordersCount = ctx.Orders.Where(x => x.Status == OrderStatus.Added).Count();

            var filter = new OrdersListFiltersModel() { Status = new OrderStatus[] { OrderStatus.Added } };
            int listCount = this.ordersService.List(filter).Count;

            Assert.AreEqual(ordersCount, listCount);
        }

        [TestMethod()]
        public void List_ShouldReturnListWithMultipleStatusesFilter()
        {
            int ordersCount = ctx.Orders.Where(x => x.Status == OrderStatus.Added || x.Status == OrderStatus.Cancelled).Count();

            var filter = new OrdersListFiltersModel() { Status = new OrderStatus[] { OrderStatus.Added, OrderStatus.Cancelled } };
            int listCount = this.ordersService.List(filter).Count;

            Assert.AreEqual(ordersCount, listCount);
        }


        [TestMethod()]
        public void List_ShouldReturnListWithPackageFilter()
        {
            Package package = ctx.Packages.FirstOrDefault();
            int ordersCount = ctx.Orders.Where(x => x.PackageId == package.Id).Count();

            var filter = new OrdersListFiltersModel() { PackageId = package.Id };
            int listCount = this.ordersService.List(filter).Count;

            Assert.AreEqual(ordersCount, listCount);
        }


        [TestMethod()]
        public void List_ShouldReturnListWithAddedTimeFilter()
        {
            var filters = new OrdersListFiltersModel { AddedTimeStart = DatabaseMocksFactory.dateTime.AddDays(5), AddedTimeEnd = DatabaseMocksFactory.dateTime.AddDays(15) };
            int ordersCount = ctx.Orders.Where(x => x.AddedTime >= filters.AddedTimeStart && x.AddedTime <= filters.AddedTimeEnd).Count();

            int listCount = this.ordersService.List(filters).Count;

            Assert.AreEqual(ordersCount, listCount);
        }

        [TestMethod()]
        public void List_ShouldReturnListWithPriorityFilter()
        {
            var filters = new OrdersListFiltersModel { PriorityMax = 3, PriorityMin = 1 };
            int ordersCount = ctx.Orders.Where(x => x.Priority >= filters.PriorityMin && x.Priority <= filters.PriorityMax).Count();

            int listCount = this.ordersService.List(filters).Count;

            Assert.AreEqual(ordersCount, listCount);
        }

        [TestMethod()]
        public void List_ShouldReturnListWithPriceFilter()
        {
            var filters = new OrdersListFiltersModel { PriceMax = 20, PriceMin = 15 };
            int ordersCount = ctx.Orders.Where(x => x.Price >= filters.PriceMin && x.Price <= filters.PriceMax).Count();

            int listCount = this.ordersService.List(filters).Count;

            Assert.AreEqual(ordersCount, listCount);
        }

        [TestMethod()]
        public void List_ShouldReturnListWithPagination()
        {
            var filters = new OrdersListFiltersModel { PageIndex = 3, PageSize = 5 };
            List<Order> ordersList = ctx.Orders.OrderByDescending(x => x.Id).Skip(10).Take(5).ToList();
            List<Order> filteredOrdersList = this.ordersService.List(filters);
            Assert.AreEqual(ordersList.First(), filteredOrdersList.First());
            Assert.AreEqual(ordersList.Last(), filteredOrdersList.Last());
            Assert.AreEqual(filteredOrdersList.Count, filters.PageSize);
        }

        [TestMethod()]
        public void List_ShouldReturnListWithPaginationWrongPage()
        {
            var filters = new OrdersListFiltersModel { PageIndex = -1, PageSize = 5 };
            List<Order> ordersList = ctx.Orders.OrderByDescending(x => x.Id).Skip(0).Take(5).ToList();
            List<Order> filteredOrdersList = this.ordersService.List(filters);
            Assert.AreEqual(ordersList.First(), filteredOrdersList.First());
            Assert.AreEqual(ordersList.Last(), filteredOrdersList.Last());
            Assert.AreEqual(filteredOrdersList.Count, filters.PageSize);
        }


        [TestMethod()]
        public void List_ShouldReturnListWithDeliveryFilter()
        {
            var filters = new OrdersListFiltersModel { DeliveredTimeStart = DatabaseMocksFactory.dateTime, DeliveredTimeEnd = DatabaseMocksFactory.dateTime.AddDays(10) };
            int ordersCount = ctx.Orders.Where(x => x.DeliveredTime >= filters.DeliveredTimeStart && x.DeliveredTime <= filters.DeliveredTimeEnd).Count();

            int listCount = this.ordersService.List(filters).Count;

            Assert.AreEqual(ordersCount, listCount);
        }

        [TestMethod()]
        public void List_ShouldReturnListWithAllFilters()
        {
            var filters = new OrdersListFiltersModel();
            filters.AddedTimeStart = DatabaseMocksFactory.dateTime;
            filters.AddedTimeEnd = DatabaseMocksFactory.dateTime.AddDays(20);

            filters.DeliveredTimeStart = DatabaseMocksFactory.dateTime.AddDays(5);
            filters.DeliveredTimeEnd = DatabaseMocksFactory.dateTime.AddDays(15);

            filters.PriceMin = 20;
            filters.PriceMax = 30;

            filters.PriorityMax = 9;
            filters.PriorityMin = 3;

            filters.DurationMax = 20;
            filters.DurationMin = 14;

            filters.OrganisationId = 1;

            filters.Status = new OrderStatus[] { OrderStatus.InDelivery };

            filters.CarrierUserId = 25;
            filters.SalePointUserId = 5;

            filters.PackageId = 5;
            var orders = ctx.Orders.ToList();
            var ordersCount = ctx.Orders.Where(x =>
                                    x.AddedTime >= filters.AddedTimeStart &&
                                    x.AddedTime <= filters.AddedTimeEnd &&

                                    x.DeliveredTime >= filters.DeliveredTimeStart &&
                                    x.DeliveredTime <= filters.DeliveredTimeEnd &&

                                    x.Priority >= filters.PriorityMin &&
                                    x.Priority <= filters.PriorityMax &&

                                    x.Duration >= filters.DurationMin &&
                                    x.Duration <= filters.DurationMax &&

                                    x.Price >= filters.PriceMin &&
                                    x.Price <= filters.PriceMax &&

                                    (x.SalePoint.User.OrganisationId == filters.OrganisationId || x.Carrier.User.OrganisationId == filters.OrganisationId) &&

                                    x.Status == filters.Status[0] &&

                                    x.Carrier.UserId == filters.CarrierUserId &&
                                    x.SalePoint.UserId == filters.SalePointUserId &&

                                    x.PackageId == filters.PackageId)
                                .ToList();

            int listCount = this.ordersService.List(filters).Count;
            Assert.AreEqual(ordersCount.Count, listCount);
        }


        [TestMethod()]
        public void SetDelivered_ShouldSetDeliveredStatus()
        {
            Order order = ctx.Orders.Where(x => x.Status == OrderStatus.InDelivery).FirstOrDefault();
            order.DeliveredTime = null;
            order.PickUpTime = DateTime.Now;

            this.ordersService.SetDelivered(order.Id);

            Assert.IsNotNull(order.DeliveredTime);
            Assert.AreEqual(OrderStatus.Delivered, order.Status);
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
        public void DiscardOrder_ShouldDiscardOrder()
        {
            Order order = ctx.Orders.Where(x => x.Status == OrderStatus.Accepted).FirstOrDefault();

            this.ordersService.DiscardOrder(order.Id);

            Assert.IsNull(order.PickUpTime);
            Assert.AreEqual(OrderStatus.Added, order.Status);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void DiscardOrder_ShouldThrowOrderNullReferenceException()
        {
            this.ordersService.DiscardOrder(int.MinValue);
        }

        [TestMethod()]
        [ExpectedException(typeof(ArgumentException))]
        public void DiscardOrder_ShouldThrowInvalidStatusArgumentException()
        {
            Order order = ctx.Orders.Where(x => x.Status != OrderStatus.Accepted).FirstOrDefault();
            this.ordersService.DiscardOrder(order.Id);
        }


        [TestMethod()]
        public void Count_ShouldReturnOrdersWithCarrierFilter()
        {
            var carrier = ctx.Carriers.FirstOrDefault();
            int ordersCount = ctx.Orders.Where(x => x.Carrier != null && x.Carrier.UserId == carrier.UserId).Count();

            var filter = new OrderCountFiltersModel() { CarrierUserId = carrier.UserId };
            int listCount = this.ordersService.Count(filter);

            Assert.AreEqual(ordersCount, listCount);
        }

        [TestMethod()]
        public void Count_ShouldReturnOrdersWithSalepointFilter()
        {
            var salepoint = ctx.SalePoints.FirstOrDefault();
            int ordersCount = ctx.Orders.Where(x => x.SalePoint != null && x.SalePoint.UserId == salepoint.UserId).Count();

            var filter = new OrderCountFiltersModel() { SalePointUserId = salepoint.UserId };
            int listCount = this.ordersService.Count(filter);

            Assert.AreEqual(ordersCount, listCount);
        }

        [TestMethod()]
        public void Count_ShouldReturnOrdersWithOrganisationFilter()
        {
            var organisation = ctx.Organisations.FirstOrDefault();
            int ordersCount = ctx.Orders.Where(x => x.SalePoint != null && x.SalePoint.User.OrganisationId == organisation.Id).Count();

            var filter = new OrderCountFiltersModel() { OrganisationId = organisation.Id };
            int listCount = this.ordersService.Count(filter);

            Assert.AreEqual(ordersCount, listCount);
        }


        [TestMethod()]
        public void Count_ShouldReturnOrdersWithStatusFilter()
        {
            OrderCountFiltersModel filters = new OrderCountFiltersModel();
            var statusList = new List<OrderStatus> { OrderStatus.Accepted, OrderStatus.Added, OrderStatus.Delivered, OrderStatus.InDelivery };
            filters.Status = statusList.ToArray();

            int ordersCount = ctx.Orders.Where(x => filters.Status.Any(y => y == x.Status)).Count();
            int methodCount = this.ordersService.Count(filters);


            Assert.AreEqual(ordersCount, methodCount);
        }


        [TestMethod()]
        public void Count_ShouldReturnOrdersWithAddedTimeStartFilter()
        {
            List<Order> orders = ctx.Orders.OrderBy(x => x.AddedTime).ToList();
            int orderToSelectIndex = orders.Count / 4;
            Order order = orders.ElementAt(orderToSelectIndex);

            OrderCountFiltersModel filters = new OrderCountFiltersModel();
            filters.AddedTimeStart = order.AddedTime;

            int ordersCount = ctx.Orders.Where(x => x.AddedTime >= order.AddedTime.Value).Count();
            int methodCount = this.ordersService.Count(filters);

            Assert.AreEqual(ordersCount, methodCount);
        }


        [TestMethod()]
        public void Count_ShouldReturnOrdersWithAddedTimeEndFilter()
        {
            List<Order> orders = ctx.Orders.OrderBy(x => x.AddedTime).ToList();
            int orderToSelectIndex = orders.Count / 4;
            Order order = orders.ElementAt(orderToSelectIndex);

            OrderCountFiltersModel filters = new OrderCountFiltersModel();
            filters.AddedTimeEnd = order.AddedTime;

            int ordersCount = ctx.Orders.Where(x => x.AddedTime <= order.AddedTime.Value).Count();
            int methodCount = this.ordersService.Count(filters);

            Assert.AreEqual(ordersCount, methodCount);
        }


        [TestMethod()]
        public void Count_ShouldReturnOrdersWithAcceptedTimeStartFilter()
        {
            List<Order> orders = ctx.Orders.Where(x=>x.AcceptedTime.HasValue).OrderBy(x => x.AcceptedTime).ToList();
            int orderToSelectIndex = orders.Count / 4;
            Order order = orders.ElementAt(orderToSelectIndex);

            OrderCountFiltersModel filters = new OrderCountFiltersModel();
            filters.AcceptedTimeStart = order.AcceptedTime;

            int ordersCount = ctx.Orders.Where(x =>  x.AcceptedTime.HasValue && x.AcceptedTime >= order.AcceptedTime.Value).Count();
            int methodCount = this.ordersService.Count(filters);

            Assert.AreEqual(ordersCount, methodCount);
        }


        [TestMethod()]
        public void Count_ShouldReturnOrdersWithAcceptedTimeEndFilter()
        {
            List<Order> orders = ctx.Orders.Where(x => x.AcceptedTime.HasValue).OrderBy(x => x.AcceptedTime).ToList();
            int orderToSelectIndex = orders.Count / 4;
            Order order = orders.ElementAt(orderToSelectIndex);

            OrderCountFiltersModel filters = new OrderCountFiltersModel();
            filters.AcceptedTimeEnd = order.AcceptedTime;

            int ordersCount = ctx.Orders.Where(x => x.AcceptedTime.HasValue && x.AcceptedTime <= order.AcceptedTime.Value).Count();
            int methodCount = this.ordersService.Count(filters);

            Assert.AreEqual(ordersCount, methodCount);
        }
    }
}