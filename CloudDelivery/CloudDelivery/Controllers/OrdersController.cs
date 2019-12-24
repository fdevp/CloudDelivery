using AutoMapper;
using CloudDelivery.Data.Entities;
using CloudDelivery.Data.Enums;
using CloudDelivery.Hubs;
using CloudDelivery.Models;
using CloudDelivery.Models.Orders;
using CloudDelivery.Services;
using Authorize = System.Web.Http.AuthorizeAttribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.SignalR;
using CloudDelivery.Data;

namespace CloudDelivery.Controllers
{
    [Authorize]
    [RoutePrefix("api/Orders")]
    public class OrdersController : BaseController
    {
        IOrdersService ordersService;
        IHubContext<INotificationsHub> notificationsHub;

        public OrdersController(IAuthorizationService authService, IOrdersService ordersService, IHubContext<INotificationsHub> notificationsHub) : base(authService)
        {
            this.ordersService = ordersService;
            this.notificationsHub = notificationsHub;
        }


        [HttpGet]
        [Route("Details/{orderId}")]
        public IHttpActionResult Details(int orderId)
        {
            if (!this.authorizationService.CanCheckOrderDetails(orderId, this.User))
                return Unauthorized();

            Order orderDb = this.ordersService.Details(orderId);
            OrderDetailsVM orderVm = Mapper.Map<OrderDetailsVM>(orderDb);

            return Ok(orderVm);
        }

        [HttpPost]
        [Authorize(Roles = "salepoint")]
        [Route("Add")]
        public IHttpActionResult Add([FromBody] OrderEditModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Order newOrder = Mapper.Map<Order>(model);
            int salePointId = this.authorizationService.GetSalePointId(this.User);

            //packages not completed for now
            newOrder.PackageId = 1;

            newOrder.Id = this.ordersService.AddOrder(newOrder, salePointId);

            OrderCarrierVM orderCarrierVM = Mapper.Map<OrderCarrierVM>(newOrder);
            this.notificationsHub.Clients.Group("carriers").OrderAdded(orderCarrierVM);

            OrderSalepointVM orderVM = Mapper.Map<OrderSalepointVM>(newOrder);
            return Ok(orderVM);
        }

        [HttpPut]
        [Authorize(Roles = "carrier")]
        [Route("Accept/{orderId}")]
        public IHttpActionResult Accept(int orderId)
        {
            int carrierId = this.authorizationService.GetCarrierId(this.User);
            this.ordersService.AcceptOrder(orderId, carrierId);

            Order acceptedOrder = this.ordersService.Details(orderId);

            OrderSalepointVM orderVM = Mapper.Map<OrderSalepointVM>(acceptedOrder);
            this.notificationsHub.Clients.Group("carriers").OrderAccepted(orderId);
            this.notificationsHub.Clients.User(acceptedOrder.SalePoint.User.AspNetUser.UserName).OrderAccepted(orderVM);

            return Ok();
        }


        [HttpPut]
        [Authorize(Roles = "salepoint,admin")]
        [Route("Cancel/{orderId}")]
        public IHttpActionResult Cancel(int orderId)
        {
            if (!this.authorizationService.HasSalepointPerms(orderId, this.User))
                return Unauthorized();


            this.ordersService.CancelOrder(orderId);
            Order cancelledOrder = this.ordersService.Details(orderId);

            if (cancelledOrder.CarrierId != null)
                this.notificationsHub.Clients.User(cancelledOrder.Carrier.User.AspNetUser.UserName).OrderCancelled(orderId);
            else
                this.notificationsHub.Clients.Group("carriers").OrderCancelled(orderId);

            return Ok();
        }


        [HttpGet]
        [Route("List")]
        public IHttpActionResult List([FromUri] OrdersListFiltersModel filters)
        {
            if (filters == null)
                filters = new OrdersListFiltersModel();

            if (this.User.IsInRole("carrier"))
                filters.CarrierUserId = this.authorizationService.GetAppUserId(this.User);

            if (this.User.IsInRole("salepoint"))
                filters.SalePointUserId = this.authorizationService.GetAppUserId(this.User);

            if (this.User.IsInRole("organisator"))
                filters.OrganisationId = this.authorizationService.GetOrganisationId(this.User);

            List<Order> ordersDb = this.ordersService.List(filters);
            List<OrderListVM> orders = Mapper.Map<List<OrderListVM>>(ordersDb);
            return Ok(orders);
        }

        [HttpGet]
        [Authorize(Roles = "carrier,admin")]
        [Route("PendingList")]
        public IHttpActionResult PendingList()
        {
            var filters = new OrdersListFiltersModel() { Status = new OrderStatus[] { OrderStatus.Added } };
            List<Order> ordersDb = this.ordersService.List(filters);
            List<OrderCarrierVM> orders = Mapper.Map<List<OrderCarrierVM>>(ordersDb);

            return Ok(orders);
        }

        [HttpGet]
        [Authorize(Roles = "carrier")]
        [Route("AcceptedList")]
        public IHttpActionResult AcceptedList()
        {
            var userId = this.authorizationService.GetAppUserId(this.User);
            var filters = new OrdersListFiltersModel() { Status = new OrderStatus[] { OrderStatus.Accepted }, CarrierUserId = userId };

            List<Order> ordersDb = this.ordersService.List(filters);
            List<OrderCarrierVM> orders = Mapper.Map<List<OrderCarrierVM>>(ordersDb);
            return Ok(orders);
        }

        [HttpGet]
        [Authorize(Roles = "salepoint")]
        [Route("InProgressList")]
        public IHttpActionResult InProgressList()
        {
            var userId = this.authorizationService.GetAppUserId(this.User);
            var filters = new OrdersListFiltersModel() { Status = new OrderStatus[] { OrderStatus.Accepted, OrderStatus.InDelivery }, SalePointUserId = userId };

            List<Order> ordersDb = this.ordersService.List(filters);
            List<OrderSalepointVM> orders = Mapper.Map<List<OrderSalepointVM>>(ordersDb);
            return Ok(orders);
        }

        [HttpGet]
        [Authorize(Roles = "salepoint")]
        [Route("AddedList")]
        public IHttpActionResult AddedList()
        {
            var userId = this.authorizationService.GetAppUserId(this.User);
            var filters = new OrdersListFiltersModel() { Status = new OrderStatus[] { OrderStatus.Added }, SalePointUserId = userId };
            List<Order> ordersDb = this.ordersService.List(filters);
            List<OrderSalepointVM> orders = Mapper.Map<List<OrderSalepointVM>>(ordersDb);
            return Ok(orders);
        }

        [HttpPut]
        [Authorize(Roles = "admin,carrier")]
        [Route("delivered/{orderId}")]
        public IHttpActionResult Delivered(int orderId)
        {
            if (!this.authorizationService.HasCarrierPerms(orderId, this.User))
                return Unauthorized();

            this.ordersService.SetDelivered(orderId);
            Order pickedOrder = this.ordersService.Details(orderId);
            this.notificationsHub.Clients.User(pickedOrder.SalePoint.User.AspNetUser.UserName).OrderDelivered(orderId);

            return Ok();
        }

        [HttpGet]
        [Authorize(Roles = "salepoint")]
        [Route("FinishedList")]
        public IHttpActionResult FinishedList()
        {
            var userId = this.authorizationService.GetAppUserId(this.User);
            var filters = new OrdersListFiltersModel() { Status = new OrderStatus[] { OrderStatus.Cancelled, OrderStatus.Delivered }, SalePointUserId = userId };
            List<Order> ordersDb = this.ordersService.List(filters);
            List<OrderFinishedListVM> orders = Mapper.Map<List<OrderFinishedListVM>>(ordersDb);
            orders = orders.OrderByDescending(x => x.DeliveredTime ?? x.CancellationTime ?? x.AddedTime).ToList();

            return Ok(orders);
        }

        [HttpPut]
        [Authorize(Roles = "admin,carrier")]
        [Route("pickup/{orderId}")]
        public IHttpActionResult Pickup(int orderId)
        {
            if (!this.authorizationService.HasCarrierPerms(orderId, this.User))
                return Unauthorized();

            this.ordersService.SetPickup(orderId);
            Order pickedOrder = this.ordersService.Details(orderId);
            this.notificationsHub.Clients.User(pickedOrder.SalePoint.User.AspNetUser.UserName).OrderPickedUp(orderId);

            return Ok();
        }


        [HttpPut]
        [Authorize(Roles = "admin,carrier")]
        [Route("discard/{orderId}")]
        public IHttpActionResult Discard(int orderId)
        {
            if (!this.authorizationService.HasCarrierPerms(orderId, this.User))
                return Unauthorized();

            this.ordersService.DiscardOrder(orderId);

            return Ok();
        }

        [HttpGet]
        [Route("Count")]
        public IHttpActionResult Count([FromUri] OrderCountFiltersModel filters)
        {
            if (filters == null)
                filters = new OrderCountFiltersModel();

            if (this.User.IsInRole("carrier"))
                filters.CarrierUserId = this.authorizationService.GetAppUserId(this.User);

            if (this.User.IsInRole("salepoint"))
                filters.SalePointUserId = this.authorizationService.GetAppUserId(this.User);

            if (this.User.IsInRole("organisator"))
                filters.OrganisationId = this.authorizationService.GetOrganisationId(this.User);

            int ordersCount = this.ordersService.Count(filters);
            return Ok(ordersCount);
        }
    }
}