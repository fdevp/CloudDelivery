using CloudDelivery.Data.Entities;
using Microsoft.AspNet.Identity;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace CloudDelivery.Tests.Mocks
{
    public class PrincipalMocks
    {
        public static Mock<IPrincipal> PrincipalWithRole(User user, string role)
        {
            var mock = new Mock<IPrincipal>();


            var identity = new GenericIdentity(user.AspNetUser.UserName, "");
            var claim = new Claim(ClaimTypes.NameIdentifier,user.IdentityId);
            identity.AddClaim(claim);


            mock.Setup(p => p.Identity).Returns(identity);
            mock.Setup(p => p.IsInRole(It.Is<string>(r => r == role))).Returns(true);
            mock.Setup(p => p.IsInRole(It.Is<string>(r => r != role))).Returns(false);

            return mock;
        }

    }
}
