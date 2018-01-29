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
    [RoutePrefix("api/Salepoints")]
    public class SalepointsController : BaseController
    {
        ISalepointsService salepointsService;

        public SalepointsController(ISalepointsService salepointsService, IAuthorizationService authService) : base(authService)
        {
            this.salepointsService = salepointsService;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        [Route("List")]
        public IHttpActionResult List()
        {
            var dbList = salepointsService.GetSalePoints();
            List<SalepointVM> spVmList = Mapper.Map<List<SalepointVM>>(dbList);
            return Ok(spVmList);
        }

        [HttpGet]
        [Route("List/{organisationId}")]
        [Authorize(Roles = "admin, organisator")]
        public IHttpActionResult OrganisationList(int organisationId)
        {
            if (!IsOrganisator(organisationId) && !IsAdmin())
                throw new HttpException(401, "Brak dostepu do zasobu");


            var dbList = salepointsService.GetOrganisationSalePoints(organisationId);
            List<SalepointVM> spVmList = Mapper.Map<List<SalepointVM>>(dbList);
            return Ok(spVmList);
        }


        [HttpGet]
        [Route("Details/{userId}")]
        public IHttpActionResult Details(int userId)
        {
            var salepoint = Mapper.Map<SalepointVM>(salepointsService.GetSalePoint(userId));
            return Ok(salepoint);
        }


        [HttpPut]
        [Authorize(Roles = "admin")]
        [Route("City/{userId}")]
        public IHttpActionResult City(int userId, [FromBody] string city)
        {
            salepointsService.SetCity(userId, city);
            return Ok();
        }


        [HttpPut]
        [Authorize(Roles = "admin")]
        [Route("Address/{userId}")]
        public IHttpActionResult Address(int userId, [FromBody] string address)
        {
            salepointsService.SetAddress(userId, address);
            return Ok();
        }


        [HttpPut]
        [Authorize(Roles = "admin")]
        [Route("LatLng/{userId}")]
        public IHttpActionResult LatLng(int userId, [FromBody] string latlng)
        {
            salepointsService.SetLatLng(userId, latlng);
            return Ok();
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        [Route("Color/{userId}")]
        public IHttpActionResult Color(int userId, [FromBody] string color)
        {
            salepointsService.SetColor(userId, color);
            return Ok();
        }
    }
}
