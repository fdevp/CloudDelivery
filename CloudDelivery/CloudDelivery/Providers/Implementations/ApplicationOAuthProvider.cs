using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using CloudDelivery.Models;
using CloudDelivery.Data;
using System.Web.Security;
using CloudDelivery.Services;

namespace CloudDelivery.Providers
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly string _publicClientId;
        private IUsersService usersService;
        private IAuthenticationService authenticationService;
        private const string RefreshTokenGranTypeName = "refresh_token";

        public ApplicationOAuthProvider(string publicClientId)
        {
            if (publicClientId == null)
            {
                throw new ArgumentNullException("publicClientId");
            }

            this.usersService = (IUsersService)System.Web.Http.GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof(IUsersService));
            this.authenticationService = (IAuthenticationService)System.Web.Http.GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof(IAuthenticationService));

            _publicClientId = publicClientId;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();

            ExtendedIdentityUser user = await userManager.FindAsync(context.UserName, context.Password);            
            if (user == null)
            {
                context.SetError("invalid_grant", "The user name or password is incorrect.");
                return;
            }

            ClaimsIdentity oAuthIdentity = await user.GenerateUserIdentityAsync(userManager,
               OAuthDefaults.AuthenticationType);

            var userRoles = await userManager.GetRolesAsync(user.Id);
            var appUser = usersService.GetUser(user.Id);
            
            AuthenticationProperties properties = CreateProperties(user.UserName, Newtonsoft.Json.JsonConvert.SerializeObject(userRoles), appUser.Name);
            AuthenticationTicket ticket = new AuthenticationTicket(oAuthIdentity, properties);
            context.Validated(ticket);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override async Task GrantRefreshToken(OAuthGrantRefreshTokenContext context)
        {
            var userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();
            var user = await userManager.FindByNameAsync(context.Ticket.Identity.Name);
            var userRoles = await userManager.GetRolesAsync(user.Id);

            var form = await context.Request.ReadFormAsync();
            var grantType = form.GetValues("grant_type");
            var oAuthIdentity = await user.GenerateUserIdentityAsync(userManager, grantType[0]);

            AuthenticationProperties properties = CreateProperties(user.UserName, Newtonsoft.Json.JsonConvert.SerializeObject(userRoles), user.UserName);
            var newTicket = new AuthenticationTicket(oAuthIdentity, properties);

            context.Validated(newTicket);
        }

        public override Task ValidateAuthorizeRequest(OAuthValidateAuthorizeRequestContext context)
        {
            return base.ValidateAuthorizeRequest(context);
        }

        public override Task ValidateTokenRequest(OAuthValidateTokenRequestContext context)
        {
            if (context.TokenRequest.IsRefreshTokenGrantType)
            {
                var validationResult = this.authenticationService.ValidateRefreshToken(context.TokenRequest.RefreshTokenGrant.RefreshToken);
                if (validationResult)
                    context.Validated();
                else
                    context.SetError("invalid_grant");
                return Task.CompletedTask;
            }
            else
            {
                return base.ValidateTokenRequest(context);
            }
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            // Resource owner password credentials does not provide a client ID.
            context.TryGetFormCredentials(out string clientId, out string clientSecret);        
            context.Validated();
            return Task.FromResult<object>(null);
        }

        private static AuthenticationProperties CreateProperties(string Login, string Roles, string Name)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                { "Login", Login },
                { "Roles", Roles },
                { "Name", Name}
            };
            return new AuthenticationProperties(data);
        }

    }
}