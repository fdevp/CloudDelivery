using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudDelivery.Services
{
    public interface IAuthorizationService
    {
        /// <summary>
        /// check if user is organisation member
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="orgId"></param>
        /// <returns></returns>
        bool IsUserInOrg(int userId, int orgId);

        /// <summary>
        /// check if user is organisation member
        /// </summary>
        /// <param name="identityId"></param>
        /// <param name="orgId"></param>
        /// <returns></returns>
        bool IsUserInOrg(string identityId, int orgId);

        bool UserIsSalePoint(int userId, int spId);

        bool UserIsSalePoint(string identityId, int spId);

        bool UserIsCarrier(int userId, int carrierId);

        bool UserIsCarrier(string identityId, int carrierId);

        int GetUserId(string identityId);

        int? GetUserOrganisationId(int userId);

        int? GetUserOrganisationId(string identityId);
    }
}
