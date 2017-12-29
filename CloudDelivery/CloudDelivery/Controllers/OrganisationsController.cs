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
        IUsersService usersService;

        public OrganisationsController() { }

        public OrganisationsController(IOrganisationsService organisationsService, IUsersService usersService)
        {
            this.organisationsService = organisationsService;
            this.usersService = usersService;
        }

        [HttpGet]
        [Route("List")]
        public IHttpActionResult List()
        {
            var vmList = Mapper.Map<List<OrganisationVM>>(organisationsService.GetOrganisationsList());
            foreach(var org in vmList)
            {
                org.MembersNumber = organisationsService.GetMembersNumber(org.Id);
            }

            return Ok(vmList);
        }

        [HttpPost]
        [Route("Add")]
        public IHttpActionResult Add([FromBody] string name)
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
            var list = organisationsService.GetMembersList(id);
            var vmList = Mapper.Map<List<UserListVM>>(list);
            foreach(var item in vmList)
            {
                item.Roles = this.usersService.GetUserRolesString(item.Id);
            }
            return Ok(vmList);
        }

    }
}