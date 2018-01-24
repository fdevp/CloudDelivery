using AutoMapper;
using CloudDelivery.Models;
using CloudDelivery.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace CloudDelivery.Controllers
{
    [Authorize]
    [RoutePrefix("api/Carriers")]
    public class CarriersController : BaseController
    {
        ICarriersService carriersService;

        public CarriersController(IAuthorizationService authService, ICarriersService carriersService) : base(authService)
        {
            this.carriersService = carriersService;
        }


        [HttpGet]
        [Authorize(Roles = "admin")]
        [Route("List")]
        public IHttpActionResult List()
        {
            var dbList = carriersService.GetCarriers();
            List<CarrierVM> carrierVmList = Mapper.Map<List<CarrierVM>>(dbList);
            return Ok(carrierVmList);
        }


        [HttpGet]
        [Route("Details/{userId}")]
        public IHttpActionResult Details(int userId)
        {
            var carrier = Mapper.Map<CarrierVM>(carriersService.GetCarrier(userId));
            return Ok(carrier);
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        [Route("Color/{id}")]
        public IHttpActionResult Color(int id, [FromBody] string color)
        {
            carriersService.SetColor(id, color);
            return Ok();
        }
    }
}
