using AutoMapper;
using CloudDelivery.Data.Entities;
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
    [RoutePrefix("api/SalePoints")]
    public class SalePointsController : BaseController
    {
        ISalePointsService SalePointsService;

        public SalePointsController(ISalePointsService SalePointsService, IAuthorizationService authService) : base(authService)
        {
            this.SalePointsService = SalePointsService;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        [Route("List")]
        public IHttpActionResult List()
        {
            List<SalePoint> dbList = SalePointsService.GetSalePoints();
            List<SalePointVM> spVmList = Mapper.Map<List<SalePointVM>>(dbList);
            return Ok(spVmList);
        }

        [HttpGet]
        [Route("List/{organisationId}")]
        [Authorize(Roles = "admin, organisator")]
        public IHttpActionResult OrganisationList(int organisationId)
        {
            if (!this.authorizationService.HasOrganisatorPerms(organisationId, this.User))
                throw new HttpException(401, "Brak dostepu do zasobu");


            List<SalePoint> dbList = SalePointsService.GetOrganisationSalePoints(organisationId);
            List<SalePointVM> spVmList = Mapper.Map<List<SalePointVM>>(dbList);
            return Ok(spVmList);
        }


        [HttpGet]
        [Route("Details/{userId}")]
        public IHttpActionResult Details(int userId)
        {
            SalePointVM salepoint = Mapper.Map<SalePointVM>(SalePointsService.GetSalePoint(userId));
            return Ok(salepoint);
        }


        [HttpPut]
        [Authorize(Roles = "admin")]
        [Route("City/{userId}")]
        public IHttpActionResult City(int userId, [FromBody] string city)
        {
            SalePointsService.SetCity(userId, city);
            return Ok();
        }


        [HttpPut]
        [Authorize(Roles = "admin")]
        [Route("Address/{userId}")]
        public IHttpActionResult Address(int userId, [FromBody] string address)
        {
            SalePointsService.SetAddress(userId, address);
            return Ok();
        }


        [HttpPut]
        [Authorize(Roles = "admin")]
        [Route("LatLng/{userId}")]
        public IHttpActionResult LatLng(int userId, [FromBody] string latlng)
        {
            SalePointsService.SetLatLng(userId, latlng);
            return Ok();
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        [Route("Color/{userId}")]
        public IHttpActionResult Color(int userId, [FromBody] string color)
        {
            SalePointsService.SetColor(userId, color);
            return Ok();
        }
    }
}
