using AutoMapper;
using CloudDelivery.Data.Entities;
using CloudDelivery.Models;
using CloudDelivery.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
                    item.Role = usersService.GetUserRolesString(item.Id);
                }
                catch (Exception e)
                {
                    item.Role = String.Empty;
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
                user.Role = usersService.GetUserRolesString(id);
            }
            catch (Exception e)
            {
                user.Role = String.Empty;
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
                usersService.SetPhone(id, user.Phone);
                usersService.SetDescription(id, user.Descripition);
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
