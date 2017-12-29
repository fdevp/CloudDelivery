using AutoMapper;
using CloudDelivery.Data.Entities;
using CloudDelivery.Models;
using CloudDelivery.Services;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Authentication;
using System.Web.Http;

namespace CloudDelivery.Controllers
{
    [Authorize(Roles = "admin")]
    [RoutePrefix("api/Users")]
    public class UsersController : ApiController
    {
        public UsersController() { }

        public UsersController(IUsersService usersService, IOrganisationsService organisationsService)
        {
            this.usersService = usersService;
        }

        [HttpGet]
        [Route("List")]
        public IHttpActionResult List()
        {
            var asd = usersService.GetUsersList();
            List<UserListVM> usersVmList = Mapper.Map<List<UserListVM>>(asd);
            foreach (var item in usersVmList)
            {
                try
                {
                    item.Roles = usersService.GetUserRolesString(item.Id);
                }
                catch (Exception e)
                {
                    item.Roles = String.Empty;
                }

            }
            return Ok(usersVmList);
        }

        [HttpGet]
        [Route("RolesList")]
        public IHttpActionResult RolesList()
        {
            return Ok(Mapper.Map<List<RoleVM>>(usersService.GetRolesList()));
        }

        [HttpGet]
        [Route("Details/{id}")]
        public IHttpActionResult Details(int id)
        {
            var user = Mapper.Map<UserVM>(usersService.GetUser(id));

            try
            {
                user.Roles = usersService.GetUserRolesString(id);
            }
            catch (Exception e)
            {
                user.Roles = String.Empty;
            }

            return Ok(user);
        }

        [HttpDelete]
        [Route("Remove/{id}")]
        public IHttpActionResult Remove(int id)
        {
            try
            {
                usersService.RemoveUser(id);
                return Ok();
            }
            catch (NullReferenceException e)
            {
                return InternalServerError(e);
            }

        }


        [HttpPut]
        [Route("Phone/{id}")]
        public IHttpActionResult Phone(int id, [FromBody] string phone)
        {
            try
            {
                usersService.SetPhone(id, phone);
                return Ok();
            }
            catch (NullReferenceException e)
            {
                return InternalServerError(e);
            }


        }


        [HttpPut]
        [Route("Name/{id}")]
        public IHttpActionResult Name(int id, [FromBody] string name)
        {
            try
            {
                usersService.SetName(id, name);
                return Ok();
            }
            catch (NullReferenceException e)
            {
                return InternalServerError(e);
            }


        }


        [HttpPut]
        [Route("Organisation/{id}")]
        public IHttpActionResult Organisation(int id, [FromBody] int? organisationId)
        {
            var user = usersService.GetUser(this.User.Identity.GetUserId());
            try
            {
                usersService.SetOrganisation(id, organisationId);
                return Ok();
            }
            catch (NullReferenceException e)
            {
                return InternalServerError(e);
            }

        }
        [HttpPut]
        [Route("Role/{id}")]
        public IHttpActionResult Role(int id, [FromBody] string role)
        {
            role = role.ToLower();
            var user = usersService.GetUser(this.User.Identity.GetUserId());
            var roleId = usersService.GetRolesList().FirstOrDefault(x => x.Name.ToLower() == role)?.Id;
            try
            {
                usersService.SetSingleRole(id, roleId);
                return Ok();
            }
            catch (NullReferenceException e)
            {
                return InternalServerError(e);
            }
        }


        private IUsersService usersService;
    }
}
