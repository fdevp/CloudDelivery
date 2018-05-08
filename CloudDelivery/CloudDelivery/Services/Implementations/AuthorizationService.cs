using CloudDelivery.Data;
using CloudDelivery.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using CloudDelivery.Data.Entities;
using System.Security.Principal;
using Microsoft.AspNet.Identity;

namespace CloudDelivery.Services
{
    public class AuthorizationService : IAuthorizationService
    {
        private ICacheProvider cacheProvider;
        private ICDContextFactory ctxFactory;

        public AuthorizationService(ICacheProvider cacheProvider, ICDContextFactory ctxFactory)
        {
            this.cacheProvider = cacheProvider;
            this.ctxFactory = ctxFactory;
        }

        public int GetAppUserId(IPrincipal user)
        {
            using (ICDContext ctx = ctxFactory.GetContext())
            {
                string identityId = user.Identity.GetUserId();
                var appUser = ctx.AppUsers.Where(x => x.IdentityId == identityId).FirstOrDefault();
                if (appUser == null)
                    throw new NullReferenceException("Brak użytkownika przypisanego do konta.");

                return appUser.Id;
            }
        }

        public int GetCarrierId(IPrincipal user)
        {
            using (ICDContext ctx = ctxFactory.GetContext())
            {
                string identityId = user.Identity.GetUserId();
                var carrier = ctx.Carriers.Include(x => x.User).Where(x => x.User.IdentityId == identityId).FirstOrDefault();
                if (carrier == null)
                    throw new NullReferenceException("Brak dostawcy przypisanego do konta.");

                return carrier.Id;
            }
        }

        public int GetSalePointId(IPrincipal user)
        {
            using (ICDContext ctx = ctxFactory.GetContext())
            {
                string identityId = user.Identity.GetUserId();
                var salePoint = ctx.SalePoints.Include(x => x.User).Where(x => x.User.IdentityId == identityId).FirstOrDefault();
                if (salePoint == null)
                    throw new NullReferenceException("Brak punktu sprzedaży przypisanego do konta.");

                return salePoint.Id;
            }
        }

        public int? GetOrganisationId(IPrincipal user)
        {
            using (ICDContext ctx = ctxFactory.GetContext())
            {
                string identityId = user.Identity.GetUserId();
                var appUser = ctx.AppUsers.Where(x => x.IdentityId == identityId).FirstOrDefault();
                return appUser.OrganisationId;
            }
        }

        public bool CanCheckOrderDetails(int orderId, IPrincipal user)
        {
            if (this.isAdministrator(user))
                return true;

            using (ICDContext ctx = ctxFactory.GetContext())
            {
                Order order = ctx.Orders.Include(x => x.Carrier.User).Include(x => x.SalePoint.User).Where(x => x.Id == orderId).FirstOrDefault();
                if (order == null)
                    return false;

                string identityId = user.Identity.GetUserId();

                //is carrier
                if (order.CarrierId != null && order.Carrier.User.IdentityId == identityId)
                    return true;

                //is salepoint
                if (order.SalePoint.User.IdentityId == identityId)
                    return true;

                //is organisator
                User appUser = ctx.AppUsers.Where(x => x.IdentityId == identityId).FirstOrDefault();

                if (user.IsInRole("organisator") && appUser != null && order.SalePoint.User.OrganisationId == appUser.OrganisationId)
                    return true;

                return false;
            }
        }


        public bool CanCheckRouteDetails(int routeId, IPrincipal user)
        {
            if (this.isAdministrator(user))
                return true;

            using (ICDContext ctx = ctxFactory.GetContext())
            {
                Route route = ctx.Routes.Include(x => x.Carrier.User).Where(x => x.Id == routeId).FirstOrDefault();
                if (route == null)
                    return false;

                string identityId = user.Identity.GetUserId();

                if (route.Carrier.User.IdentityId == identityId)
                    return true;

                return false;
            }
        }

        public bool HasCarrierPerms(int orderId, IPrincipal user)
        {
            if (this.isAdministrator(user))
                return true;

            using (ICDContext ctx = ctxFactory.GetContext())
            {
                string identityId = user.Identity.GetUserId();
                return user.IsInRole("carrier") &&
                       ctx.Orders.Include(x => x.Carrier.User)
                                 .Any(x => x.Id == orderId &&
                                           x.CarrierId != null &&
                                           x.Carrier.User.IdentityId == identityId);
            }
        }

        public bool HasSalepointPerms(int orderId, IPrincipal user)
        {
            if (this.isAdministrator(user))
                return true;

            using (ICDContext ctx = ctxFactory.GetContext())
            {
                string identityId = user.Identity.GetUserId();
                return user.IsInRole("salepoint") &&
                       ctx.Orders.Include(x => x.SalePoint.User)
                                 .Any(x => x.Id == orderId &&
                                           x.SalePoint.User.IdentityId == identityId);
            }
        }

        public bool HasOrganisatorPerms(int organisationId, IPrincipal user)
        {
            if (this.isAdministrator(user))
                return true;

            using (ICDContext ctx = ctxFactory.GetContext())
            {
                string identityId = user.Identity.GetUserId();
                return user.IsInRole("organisator") && ctx.AppUsers.Any(x => x.OrganisationId == organisationId &&
                                                                            x.IdentityId == identityId);
            }
        }

        private bool isAdministrator(IPrincipal user)
        {
            return user.IsInRole("admin");
        }

        public bool CanPassPoint(int pointId, IPrincipal user)
        {
            if (this.isAdministrator(user))
                return true;

            using (ICDContext ctx = ctxFactory.GetContext())
            {
                RoutePoint point = ctx.RoutePoints.Include(x => x.Order.Carrier.User).Where(x => x.Id == pointId).FirstOrDefault();

                if (point == null)
                    return false;

                if (point.Order.Carrier.User.IdentityId == user.Identity.GetUserId())
                    return true;

                return false;
            }
        }
    }
}