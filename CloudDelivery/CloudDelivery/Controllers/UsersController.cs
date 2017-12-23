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
        [Route("Edit/{id}")]
        public IHttpActionResult Edit(int id, [FromBody] UserVM user)
        {
            try
            {
                usersService.SetData(user.Id, user.Phone, user.Name);
                return Ok();
            }
            catch (NullReferenceException e)
            {
                return InternalServerError(e);
            }


        }


        [HttpPut]
        [Route("Organisation/{id}")]
        public IHttpActionResult Organisation(int id, [FromBody] int organisationId)
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

        private IUsersService usersService;
    }
}
