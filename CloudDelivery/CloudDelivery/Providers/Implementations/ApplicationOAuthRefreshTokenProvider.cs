using CloudDelivery.Data;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Providers
{
    public class ApplicationOAuthRefreshTokenProvider : AuthenticationTokenProvider
    {
        private readonly ICDContextFactory ctxFactory;

        public ApplicationOAuthRefreshTokenProvider(ICDContextFactory ctxFactory)
        {
            this.ctxFactory = ctxFactory;
        }

        public override void Create(AuthenticationTokenCreateContext context)
        {
            var form = context.Request.ReadFormAsync().Result;
            var grantType = form.GetValues("grant_type");

            if (grantType[0] != "refresh_token")
                context.SetToken(context.SerializeTicket());

            base.Create(context);

            if (context.Token != null)
            {
                var device = form.GetValues("device");
                var issued = context.Ticket.Properties.IssuedUtc.Value.DateTime;
                SaveToken(context.Ticket.Identity.GetUserId(), context.Token, issued, device?.FirstOrDefault());
            }

        }

        public override void Receive(AuthenticationTokenReceiveContext context)
        {
            context.DeserializeTicket(context.Token);
            base.Receive(context);
        }

        private void SaveToken(string identityId, string token, DateTime issued, string device)
        {
            using (ICDContext ctx = ctxFactory.GetContext())
            {
                if (!ctx.RefreshTokens.Any(x => x.Token == token))
                {
                    ctx.RefreshTokens.Add(new Data.Entities.RefreshToken {
                        IdentityId = identityId,
                        Token = token,
                        Active = true,
                        Device = device,
                        Issued = issued });
                    ctx.SaveChanges();
                }
            }
        }
    }
}