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
    public class UsersController : BaseController
    {
        private IUsersService usersService;
        private ICarriersService carriersService;
        private ISalePointsService SalePointsService;

        public UsersController(IUsersService usersService, ICarriersService carriersService, ISalePointsService SalePointsService,IAuthorizationService authService) : base(authService)
        {
            this.usersService = usersService;
            this.carriersService = carriersService;
            this.SalePointsService = SalePointsService;
        }

        [HttpGet]
        [Route("List")]
        public IHttpActionResult List()
        {
            List<User> dbList = usersService.GetUsersList();
            List<UserListVM> usersVmList = Mapper.Map<List<UserListVM>>(dbList);
            foreach (UserListVM item in usersVmList)
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
            UserVM user = Mapper.Map<UserVM>(usersService.GetUser(id));

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
            usersService.RemoveUser(id);
            return Ok();
        }


        [HttpPut]
        [Route("Phone/{id}")]
        public IHttpActionResult Phone(int id, [FromBody] string phone)
        {
            usersService.SetPhone(id, phone);
            return Ok();
        }


        [HttpPut]
        [Route("Name/{id}")]
        public IHttpActionResult Name(int id, [FromBody] string name)
        {
            usersService.SetName(id, name);
            return Ok();
        }


        [HttpPut]
        [Route("Organisation/{id}")]
        public IHttpActionResult Organisation(int id, [FromBody] int? organisationId)
        {
            User user = usersService.GetUser(this.User.Identity.GetUserId());
            usersService.SetOrganisation(id, organisationId);
            return Ok();

        }
        [HttpPut]
        [Route("Role/{id}")]
        public IHttpActionResult Role(int id, [FromBody] string role)
        {
            role = role.ToLower();
            User user = usersService.GetUser(this.User.Identity.GetUserId());
            string roleId = usersService.GetRolesList().FirstOrDefault(x => x.Name.ToLower() == role)?.Id;
            usersService.SetSingleRole(id, roleId);
            switch (role)
            {
                case "salepoint":
                    this.SalePointsService.SetSalePoint(id);
                    break;
                case "carrier":
                    this.carriersService.SetCarrier(id);
                    break;
            }
           
            try
            {
                switch (role)
                {
                    case "salepoint":
                        this.carriersService.RemoveCarrier(id);
                        break;
                    case "carrier":
                        this.SalePointsService.RemoveSalePoint(id);
                        break;
                }
                
            }
            catch (Exception e) {}

            return Ok();
        }
    }
}
