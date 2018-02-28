﻿using AutoMapper;
using CloudDelivery.Data.Entities;
using CloudDelivery.Models;
using CloudDelivery.Models.Orders;
using CloudDelivery.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace CloudDelivery.Controllers
{
    [Authorize]
    [RoutePrefix("api/Orders")]
    public class OrdersController : BaseController
    {
        IOrdersService ordersService;

        public OrdersController(IAuthorizationService authService, IOrdersService ordersService) : base(authService)
        {
            this.ordersService = ordersService;
        }


        [HttpGet]
        [Route("Details/{orderId}")]
        public IHttpActionResult Details(int orderId)
        {
            if (!this.authService.CanCheckOrderDetails(orderId, this.User))
                return Unauthorized();

            Order orderDb = this.ordersService.Details(orderId);
            OrderVM orderVm = Mapper.Map<OrderVM>(orderDb);

            return Ok(orderVm);
        }

        [HttpPost]
        [Authorize(Roles = "salepoint")]
        [Route("Add")]
        public IHttpActionResult Add([FromBody] OrderEditModel model)
        {
            int salePointId = this.authService.GetSalePointId(this.User);
            Order newOrder = Mapper.Map<Order>(model);
            int newOrderId = this.ordersService.AddOrder(newOrder, salePointId);

            return Ok(newOrderId);
        }

        [HttpPut]
        [Authorize(Roles = "carrier")]
        [Route("Accept/{orderId}")]
        public IHttpActionResult Accept(int orderId)
        {
            int carrierId = this.authService.GetCarrierId(this.User);

            this.ordersService.AcceptOrder(orderId, carrierId);

            return Ok();
        }


        [HttpPut]
        [Authorize(Roles = "salepoint,admin")]
        [Route("Cancel/{orderId}")]
        public IHttpActionResult Cancel(int orderId)
        {
            if (!this.authService.HasSalepointPerms(orderId, this.User))
                return Unauthorized();

            this.ordersService.CancelOrder(orderId);

            return Ok();
        }


        [HttpGet]
        [Route("List")]
        public IHttpActionResult List([FromUri] OrderFiltersModel filters)
        {
            if (filters == null)
                filters = new OrderFiltersModel();

            if (this.User.IsInRole("carrier"))
                filters.CarrierUserId = this.authService.GetAppUserId(this.User);

            if (this.User.IsInRole("salepoint"))
                filters.SalePointUserId = this.authService.GetAppUserId(this.User);

            if (this.User.IsInRole("organisator"))
                filters.OrganisationId = this.authService.GetOrganisationId(this.User);

            List<Order> ordersDb = this.ordersService.List(filters);
            List<OrderListVM> orders = Mapper.Map<List<OrderListVM>>(ordersDb);
            return Ok(orders);
        }

        [HttpGet]
        [Authorize(Roles ="carrier,admin")]
        [Route("PendingList")]
        public IHttpActionResult PendingList()
        {
            var filters = new OrderFiltersModel() { Status = Data.Enums.OrderStatus.Added };
            List<Order> ordersDb = this.ordersService.List(filters);
            List<OrderMapVM> orders = Mapper.Map<List<OrderMapVM>>(ordersDb);
            
            return Ok(orders);
        }


        [HttpPut]
        [Authorize(Roles = "carrier")]
        [Route("delivered/{orderId}")]
        public IHttpActionResult Delivered(int orderId)
        {
            if (!this.authService.HasCarrierPerms(orderId, this.User))
                return Unauthorized();

            this.ordersService.SetDelivered(orderId);

            return Ok();
        }

        [HttpPut]
        [Authorize(Roles = "carrier")]
        [Route("pickup/{orderId}")]
        public IHttpActionResult Pickup(int orderId)
        {
            if (!this.authService.HasCarrierPerms(orderId, this.User))
                return Unauthorized();

            this.ordersService.SetPickup(orderId);

            return Ok();
        }


        [HttpPut]
        [Authorize(Roles = "carrier")]
        [Route("discard/{orderId}")]
        public IHttpActionResult Discard(int orderId)
        {
            if (!this.authService.HasCarrierPerms(orderId, this.User))
                return Unauthorized();

            this.ordersService.DiscardOrder(orderId);

            return Ok();
        }

    }
}