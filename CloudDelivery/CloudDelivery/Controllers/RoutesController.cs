using AutoMapper;
using CloudDelivery.Data.Entities;
using CloudDelivery.Data.Enums.Routes;
using CloudDelivery.Models.Routes;
using CloudDelivery.Models.Routes.Route;
using CloudDelivery.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace CloudDelivery.Controllers
{
    [Authorize(Roles = "admin,carrier")]
    [RoutePrefix("api/Routes")]
    public class RoutesController : BaseController
    {
        IRoutesService routesService;
        IOrdersService ordersService;

        public RoutesController(IAuthorizationService authService, IRoutesService routesService, IOrdersService ordersService) : base(authService)
        {
            this.routesService = routesService;
            this.ordersService = ordersService;
        }

        [HttpPost]
        [Route("Add")]
        public IHttpActionResult Add([FromBody] List<RoutePointEditModel> model)
        {
            int carrierId = this.authService.GetCarrierId(this.User);
            Route newRoute = this.routesService.Add(carrierId, model);
            RouteVM route = Mapper.Map<RouteVM>(newRoute);
            return Ok(route);
        }

        [HttpGet]
        [Route("ActiveRouteDetails")]
        public IHttpActionResult ActiveRouteDetails()
        {
            int carrierId = this.authService.GetCarrierId(this.User);
            Route routeDb = this.routesService.ActiveRouteDetails(carrierId);
            RouteVM route = Mapper.Map<RouteVM>(routeDb);
            return Ok(route);
        }

        [HttpPut]
        [Route("Finish/{routeId}")]
        public IHttpActionResult Finish(int routeId)
        {
            if (!this.authService.CanCheckRouteDetails(routeId, this.User))
                return Unauthorized();

            this.routesService.Finish(routeId);

            return Ok();
        }

        [HttpGet]
        [Route("Details/{routeId}")]
        public IHttpActionResult Details(int routeId)
        {
            if (!this.authService.CanCheckRouteDetails(routeId, this.User))
                return Unauthorized();

            Route routeDb = this.routesService.Details(routeId);
            RouteVM route = Mapper.Map<RouteVM>(routeDb);
            return Ok(route);
        }

        [HttpPut]
        [Route("PassPoint/{pointId}")]
        public IHttpActionResult PassPoint(int pointId)
        {
            if (!this.authService.CanPassPoint(pointId, this.User))
                return Unauthorized();

            this.routesService.PassPoint(pointId);

            RoutePoint routePoint = this.routesService.PointDetails(pointId);
            try
            {
                if (routePoint.Type == RoutePointType.EndPoint)
                    this.ordersService.SetDelivered(routePoint.OrderId.Value);
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
                filters.CarrierId = this.authService.GetCarrierId(this.User);

            List<Route> routesDb = this.routesService.List(filters);
            List<RouteListVM> routes = Mapper.Map<List<RouteListVM>>(routesDb);
            return Ok(routes);
        }
    }
}