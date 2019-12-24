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
        protected IAuthorizationService authorizationService;

        public BaseController(IAuthorizationService authService)
        {
            this.authorizationService = authService;
        }        
    }
}
