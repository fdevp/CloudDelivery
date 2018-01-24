using CloudDelivery.Data;
using CloudDelivery.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace CloudDelivery.Services
{
    public class AuthorizationService : IAuthorizationService
    {

        public AuthorizationService(ICacheProvider cacheProvider, ICDContextFactory ctxFactory)
        {
            this.cacheProvider = cacheProvider;
            this.ctxFactory = ctxFactory;
        }

        public bool IsUserInOrg(int userId, int orgId)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                return ctx.UserData.Any(x => x.OrganisationId == orgId && x.Id == userId);
            }
        }

        public bool IsUserInOrg(string identityId, int orgId)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                return ctx.UserData.Any(x => x.OrganisationId == orgId && x.IdentityId == identityId);
            }
        }

        public bool UserIsSalePoint(int userId, int spId)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                return ctx.SalePoints.Any(x => x.UserId == userId && x.Id == spId);
            }
        }


        public bool UserIsSalePoint(string identityId, int spId)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                return ctx.SalePoints.Include(x => x.User).Any(x => x.User.IdentityId == identityId && x.Id == spId);
            }
        }

        public bool UserIsCarrier(int userId, int carrierId)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                return ctx.Carriers.Any(x => x.UserId == userId && x.Id == carrierId);
            }
        }


        public bool UserIsCarrier(string identityId, int carrierId)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                return ctx.Carriers.Include(x => x.User).Any(x => x.User.IdentityId == identityId && x.Id == carrierId);
            }
        }


        public int GetUserId(string identityId)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                var user = ctx.UserData.Where(x => x.IdentityId == identityId).FirstOrDefault();

                if (user == null)
                    throw new NullReferenceException("Nie znaleziono użytkownika");

                return (user.Id);
            }
        }

        public int? GetUserOrganisationId(string identityId)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                var user = ctx.UserData.Where(x => x.IdentityId == identityId).FirstOrDefault();

                if (user == null)
                    throw new NullReferenceException("Nie znaleziono użytkownika");

                return (user.OrganisationId);
            }
        }

        public int? GetUserOrganisationId(int userId)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                var user = ctx.UserData.Where(x => x.Id == userId).FirstOrDefault();

                if (user == null)
                    throw new NullReferenceException("Nie znaleziono użytkownika");

                return (user.OrganisationId);
            }
        }

        private ICacheProvider cacheProvider;
        private ICDContextFactory ctxFactory;
    }
}