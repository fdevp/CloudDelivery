using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace CloudDelivery.Services
{
    public interface IAuthorizationService
    {
        int GetAppUserId(IPrincipal user);

        int GetCarrierId(IPrincipal user);

        int GetSalePointId(IPrincipal user);

        int? GetOrganisationId(IPrincipal user);

        bool CanCheckOrderDetails(int orderId, IPrincipal user);

        bool HasCarrierPerms(int orderId, IPrincipal user);

        bool HasSalepointPerms(int orderId, IPrincipal user);

        bool HasOrganisatorPerms(int organisationId, IPrincipal user);
    }
}
