using CloudDelivery.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace CloudDelivery.Services
{
    public interface IAuthenticationService
    {
        IEnumerable<RefreshToken> GetActiveRefreshTokens(IPrincipal user);

        void CancelRefreshToken(int tokenId, IPrincipal user);

        void CancelRefreshToken(string token, IPrincipal user);

        bool ValidateRefreshToken(string token);
    }
}
