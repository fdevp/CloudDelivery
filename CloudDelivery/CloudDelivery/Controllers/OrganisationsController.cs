using AutoMapper;
using CloudDelivery.Models;
using CloudDelivery.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace CloudDelivery.Controllers
{
    [Authorize(Roles = "admin")]
    [RoutePrefix("api/Organisations")]
    public class OrganisationsController : ApiController
    {
        IOrganisationsService organisationsService;

        public OrganisationsController() { }

        public OrganisationsController(IOrganisationsService organisationsService)
        {
            this.organisationsService = organisationsService;
        }

        [HttpGet]
        [Route("List")]
        public IHttpActionResult List()
        {
            return Ok(Mapper.Map<List<OrganisationVM>>(organisationsService.GetOrganisationsList()));
        }

        [HttpPost]
        [Route("Add")]
        public IHttpActionResult Add(string name)
        {
            try
            {
                organisationsService.AddOrganisation(name);
                return Ok();
            }
            catch (NullReferenceException e)
            {
                return InternalServerError(e);
            }
        }

        [HttpDelete]
        [Route("Remove/{id}")]
        public IHttpActionResult Remove(int id)
        {
            try
            {
                organisationsService.RemoveOrganisation(id);
                return Ok();
            }
            catch (NullReferenceException e)
            {
                return InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("Members/{id}")]
        public IHttpActionResult Members(int id)
        {
            return Ok(Mapper.Map<List<UserVM>>(organisationsService.GetMembersList(id)));
        }

    }
}