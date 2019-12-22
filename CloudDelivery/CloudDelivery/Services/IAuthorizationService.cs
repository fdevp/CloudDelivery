using CloudDelivery.Data.Entities;
using System.Collections.Generic;
using System.Security.Principal;

namespace CloudDelivery.Services
{
    public interface IAuthorizationService
    {
        int GetAppUserId(IPrincipal user);

        IEnumerable<RefreshToken> GetActiveTokens(IPrincipal user);

        int GetCarrierId(IPrincipal user);

        int GetSalePointId(IPrincipal user);

        int? GetOrganisationId(IPrincipal user);

        bool CanCheckOrderDetails(int orderId, IPrincipal user);

        bool CanCheckRouteDetails(int routeId, IPrincipal user);

        bool CanPassPoint(int pointId, IPrincipal user);

        bool HasCarrierPerms(int orderId, IPrincipal user);

        bool HasSalepointPerms(int orderId, IPrincipal user);

        bool HasOrganisatorPerms(int organisationId, IPrincipal user);
    }
}
