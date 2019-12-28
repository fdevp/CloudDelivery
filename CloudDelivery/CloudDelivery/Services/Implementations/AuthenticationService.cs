using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using CloudDelivery.Data;
using CloudDelivery.Data.Entities;
using Microsoft.AspNet.Identity;

namespace CloudDelivery.Services.Implementations
{
    public class AuthenticationService : IAuthenticationService
    {
        private ICDContextFactory ctxFactory;

        public AuthenticationService(ICDContextFactory ctxFactory)
        {
            this.ctxFactory = ctxFactory;
        }

        public IEnumerable<RefreshToken> GetActiveRefreshTokens(IPrincipal user)
        {
            using (ICDContext ctx = ctxFactory.GetContext())
            {
                string identityId = user.Identity.GetUserId();
                var tokens = ctx.RefreshTokens.Where(x => x.IdentityId == identityId && x.Active);
                return tokens.ToArray();
            }
        }

        public void CancelRefreshToken(int tokenId, IPrincipal user)
        {
            using (ICDContext ctx = ctxFactory.GetContext())
            {
                string identityId = user.Identity.GetUserId();
                var token = ctx.RefreshTokens.FirstOrDefault(x => x.IdentityId == identityId && x.Id == tokenId);
                if (token == null)
                    throw new KeyNotFoundException("Token not found.");

                token.Active = false;
                ctx.SaveChanges();
            }
        }

        public void CancelRefreshToken(string token, IPrincipal user)
        {
            using (ICDContext ctx = ctxFactory.GetContext())
            {
                string identityId = user.Identity.GetUserId();
                var dbToken = ctx.RefreshTokens.FirstOrDefault(x => x.IdentityId == identityId && x.Token == token);
                if (dbToken == null)
                    throw new KeyNotFoundException("Token not found.");

                dbToken.Active = false;
                ctx.SaveChanges();
            }
        }

        public bool ValidateRefreshToken(string token)
        {
            using (ICDContext ctx = ctxFactory.GetContext())
            {
                var refreshToken = ctx.RefreshTokens.FirstOrDefault(x => x.Token == token);
                if (refreshToken == null)
                    return false;

                return refreshToken.Active;
            }
        }


    }
}