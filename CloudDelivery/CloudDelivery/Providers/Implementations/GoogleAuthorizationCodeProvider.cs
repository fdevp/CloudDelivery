using CloudDelivery.Data;
using CloudDelivery.Models;
using CloudDelivery.Models.GoogleAuth;
using CloudDelivery.Services;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Infrastructure;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace CloudDelivery.Providers.Implementations
{
    public class GoogleAuthorizationCodeProvider : AuthenticationTokenProvider
    {
        private readonly HttpClient httpClient;
        private readonly IUsersService userService;
        private readonly GoogleOAuthParameters authParameters;

        public GoogleAuthorizationCodeProvider(HttpClient httpClient, IUsersService userService, GoogleOAuthParameters authParameters)
        {
            this.httpClient = httpClient;
            this.userService = userService;
            this.authParameters = authParameters;
        }

        public async override Task ReceiveAsync(AuthenticationTokenReceiveContext context)
        {
            var payload = CreatePayload(context.Token);
            var content = new StringContent(payload, Encoding.UTF8, "application/json");
            var result = await httpClient.PostAsync(authParameters.AuthUrl, content);
            if (!result.IsSuccessStatusCode)
            {
                return;
            }

            var googleAuthResult = Newtonsoft.Json.JsonConvert.DeserializeObject<GoogleOAuthResponse>(result.Content.ReadAsStringAsync().Result);
            var decodedIdToken = DecodeJwtToken(googleAuthResult.IdToken);
            var tokenClaims = decodedIdToken.Claims.ToDictionary(claim => claim.Type, claim => claim.Value);

            var email = tokenClaims["email"];
            var userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();

            var user = await userManager.FindByEmailAsync(email) ?? await CreateUser(userManager, email, tokenClaims["name"]);
            var userRoles = await userManager.GetRolesAsync(user.Id);

            var properties = CreateAuthProps(user.Email, Newtonsoft.Json.JsonConvert.SerializeObject(userRoles), user.UserName );
            var claimsIdentity = await user.GenerateUserIdentityAsync(userManager, DefaultAuthenticationTypes.ExternalBearer);
            var ticket = new AuthenticationTicket(claimsIdentity, properties);
            context.SetTicket(ticket);
        }

        private string CreatePayload(string authorizationCode)
        {
            var jsonObject = new JObject();
            jsonObject.Add("client_id", authParameters.ClientId);
            jsonObject.Add("client_secret", authParameters.ClientSecret);
            jsonObject.Add("grant_type", "authorization_code");
            jsonObject.Add("redirect_uri", "");
            jsonObject.Add("code", authorizationCode);

            return jsonObject.ToString();
        }

        private JwtSecurityToken DecodeJwtToken(string jwtToken)
        {
            var handler = new JwtSecurityTokenHandler();
            return handler.ReadJwtToken(jwtToken);
        }

        private AuthenticationProperties CreateAuthProps(string Login, string Roles, string Name)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                { "Login", Login },
                { "Roles", Roles },
                { "Name", Name}
            };
            var authProps = new AuthenticationProperties(data);
            authProps.Dictionary.Add("client_id", authParameters.ClientId);
            authProps.ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(1);
            authProps.IssuedUtc = DateTime.UtcNow;

            return authProps;
        }

        private async Task<ExtendedIdentityUser> CreateUser(ApplicationUserManager userManager, string email, string name)
        {
            var user = new ExtendedIdentityUser { UserName = email, Email = email };
            await userManager.CreateAsync(user);
            await userManager.AddToRoleAsync(user.Id, "salepoint");
            userService.AddGoogleSalepointUser(user.Id, string.IsNullOrEmpty(name) ? email : name, null);
            return user;
        }
    }

}