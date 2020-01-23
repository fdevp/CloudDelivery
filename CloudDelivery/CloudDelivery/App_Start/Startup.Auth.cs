using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Google;
using Microsoft.Owin.Security.OAuth;
using Owin;
using CloudDelivery.Providers;
using CloudDelivery.Models;
using CloudDelivery.Data;
using CloudDelivery.Providers.Implementations;
using System.Configuration;
using CloudDelivery.Models.GoogleAuth;
using CloudDelivery.Services;

namespace CloudDelivery
{
    public partial class Startup
    {
        public static string PublicClientId { get; private set; }

        // For more information on configuring authentication, please visit https://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            string clientId = ConfigurationManager.AppSettings["GoogleClientId"];
            string clientSecret = ConfigurationManager.AppSettings["GoogleClientSecret"];
            string authUri = ConfigurationManager.AppSettings["GoogleAuthUri"];
            var googleAuthParameters = new GoogleOAuthParameters(clientId, clientSecret, authUri);

            var dbContextFactor = new CDContextFactory();

            var userService = new UsersService(new CacheProvider(), dbContextFactor);
            // Configure the db context and user manager to use a single instance per request
            app.CreatePerOwinContext(CDContext.Create);
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);

            // Configure the application for OAuth based flow
            PublicClientId = "self";
            var oAuthOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/Token"),
                Provider = new ApplicationOAuthProvider(PublicClientId),
                AuthorizeEndpointPath = new PathString("/api/Account/ExternalLogin"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(30),
                RefreshTokenProvider = new ApplicationOAuthRefreshTokenProvider(dbContextFactor),
                // In production mode set AllowInsecureHttp = false
                AllowInsecureHttp = true,
                AuthorizationCodeProvider = new GoogleAuthorizationCodeProvider(new System.Net.Http.HttpClient(), userService, googleAuthParameters)
            };

            app.UseOAuthBearerTokens(oAuthOptions);
            app.UseOAuthAuthorizationServer(oAuthOptions);
        }
    }
}
