using CloudDelivery.Services;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CloudDelivery.Controllers
{
    public abstract class BaseController : ApiController
    {
        public BaseController(IAuthorizationService authService)
        {
            this.authService = authService;
        }

        public bool CanCheckUserDetails(int targetUserId)
        {
            if (authService.GetUserId(this.User.Identity.GetUserId()) == targetUserId || this.IsAdmin())
                return true;

            int? orgId = authService.GetUserOrganisationId(targetUserId);

            return orgId.HasValue && this.IsOrganisator(orgId.Value);
        }


        protected bool IsAdmin()
        {
            return this.User.IsInRole("admin");
        }

        protected bool IsOrganisator(int organisationId)
        {
            return this.User.IsInRole("organisator") && authService.IsUserInOrg(this.User.Identity.GetUserId(),organisationId);
        }

        protected IAuthorizationService authService;
    }
}
