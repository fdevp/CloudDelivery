using AutoMapper;
using CloudDelivery.Data.Entities;
using CloudDelivery.Data.Enums.Routes;
using CloudDelivery.Hubs;
using CloudDelivery.Models.Routes;
using CloudDelivery.Models.Routes.Route;
using CloudDelivery.Services;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Authorize = System.Web.Http.AuthorizeAttribute;

namespace CloudDelivery.Controllers
{
    [Authorize(Roles = "admin,carrier")]
    [RoutePrefix("api/Routes")]
    public class RoutesController : BaseController
    {
        IRoutesService routesService;
        IOrdersService ordersService;
        IHubContext<INotificationsHub> notificationsHub;

        public RoutesController(IAuthorizationService authService, IRoutesService routesService, IOrdersService ordersService, IHubContext<INotificationsHub> notificationsHub) : base(authService)
        {
            this.routesService = routesService;
            this.ordersService = ordersService;
            this.notificationsHub = notificationsHub;
        }

        [HttpPost]
        [Route("Add")]
        public IHttpActionResult Add([FromBody] List<RoutePointEditModel> model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            int carrierId = this.authorizationService.GetCarrierId(this.User);
            Route newRoute = this.routesService.Add(carrierId, model);
            RouteVM route = Mapper.Map<RouteVM>(newRoute);
            return Ok(route);
        }

        [HttpGet]
        [Route("ActiveRouteDetails")]
        public IHttpActionResult ActiveRouteDetails()
        {
            int carrierId = this.authorizationService.GetCarrierId(this.User);
            Route routeDb = this.routesService.ActiveRouteDetails(carrierId);
            RouteVM route = Mapper.Map<RouteVM>(routeDb);
            return Ok(route);
        }

        [HttpPut]
        [Route("Finish/{routeId}")]
        public IHttpActionResult Finish(int routeId)
        {
            if (!this.authorizationService.CanCheckRouteDetails(routeId, this.User))
                return Unauthorized();

            this.routesService.Finish(routeId);

            return Ok();
        }

        [HttpGet]
        [Route("Details/{routeId}")]
        public IHttpActionResult Details(int routeId)
        {
            if (!this.authorizationService.CanCheckRouteDetails(routeId, this.User))
                return Unauthorized();

            Route routeDb = this.routesService.Details(routeId);
            RouteVM route = Mapper.Map<RouteVM>(routeDb);
            return Ok(route);
        }

        [HttpPut]
        [Route("PassPoint/{pointId}")]
        public IHttpActionResult PassPoint(int pointId)
        {
            if (!this.authorizationService.CanPassPoint(pointId, this.User))
                return Unauthorized();

            this.routesService.PassPoint(pointId);

            RoutePoint routePoint = this.routesService.PointDetails(pointId);
            try
            {
                
                if (routePoint.Type == RoutePointType.EndPoint)
                {
                    this.ordersService.SetDelivered(routePoint.OrderId.Value);
                    this.notificationsHub.Clients.User(routePoint.Order.SalePoint.User.AspNetUser.UserName).OrderDelivered(routePoint.OrderId.Value);
                }
                    
            }
            catch (Exception e) { }


            return Ok();
        }

        [HttpGet]
        [Route("List")]
        public IHttpActionResult List([FromUri] RouteFiltersModel filters)
        {
            if (filters == null)
                filters = new RouteFiltersModel();

            if (this.User.IsInRole("carrier"))
                filters.CarrierId = this.authorizationService.GetCarrierId(this.User);

            List<Route> routesDb = this.routesService.List(filters);
            List<RouteListVM> routes = Mapper.Map<List<RouteListVM>>(routesDb);
            return Ok(routes);
        }

        [HttpGet]
        [Authorize(Roles = "carrier")]
        [Route("FinishedList")]
        public IHttpActionResult FinishedList()
        {
            var carrierId = this.authorizationService.GetCarrierId(this.User);
            var filters = new RouteFiltersModel() { Status = RouteStatus.Finished, CarrierId = carrierId };
            List<Route> ordersDb = this.routesService.List(filters);
            List<RouteListVM> orders = Mapper.Map<List<RouteListVM>>(ordersDb);
            orders = orders.OrderByDescending(x => x.FinishTime).ToList();

            return Ok(orders);
        }


    }
}