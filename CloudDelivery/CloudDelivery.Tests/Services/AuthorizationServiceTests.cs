using CloudDelivery.Data;
using CloudDelivery.Providers;
using CloudDelivery.Services;
using CloudDelivery.Tests.Initialize;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudDelivery.Tests.Services
{
    [TestClass()]
    public class AuthorizationServiceTests
    {
        AuthorizationService authService;
        UsersService usersService;
        ICDContext ctx;

        public AuthorizationServiceTests()
        {
            var ctxFactory = DatabaseMocksFactory.GetCtxFactoryMock().Object;
            var cache = new CacheProvider();
            ctx = ctxFactory.GetContext();
            authService = new AuthorizationService(cache, ctxFactory);
            usersService = new UsersService(cache, ctxFactory);
        }

        [TestMethod()]
        public void IsUserInOrg_ShouldCheckIsUserInOrgByUserId()
        {
            var user = usersService.GetUsersList().FirstOrDefault();
            usersService.SetOrganisation(user.Id, 1);
            Assert.IsTrue(authService.IsUserInOrg(user.Id, 1));
        }

        [TestMethod()]
        public void IsUserInOrg_ShouldCheckIsUserInOrgByIdentityId()
        {
            var user = usersService.GetUsersList().FirstOrDefault();
            usersService.SetOrganisation(user.Id, 1);
            Assert.IsTrue(authService.IsUserInOrg(user.IdentityId, 1));
        }

        [TestMethod()]
        public void UserIsSalePoint_ShouldCheckUserIsSalePointById()
        {
            var sp = ctx.SalePoints.FirstOrDefault();
            Assert.IsTrue(authService.UserIsSalePoint(sp.UserId.Value, sp.Id));
        }

        [TestMethod()]
        public void UserIsSalePoint_ShouldCheckUserIsSalePointByIdentity()
        {
            var sp = ctx.SalePoints.FirstOrDefault();
            var user = ctx.UserData.FirstOrDefault();
            user.AspNetUser = ctx.Users.Where(x => x.Id == user.IdentityId).FirstOrDefault();
            sp.User = user;

            Assert.IsTrue(authService.UserIsSalePoint(sp.User.IdentityId, sp.Id));
        }

        [TestMethod()]
        public void UserIsCarrier_ShouldCheckUserIsCarrierById()
        {
            var carrier = ctx.Carriers.FirstOrDefault();
            Assert.IsTrue(authService.UserIsCarrier(carrier.UserId.Value, carrier.Id));
        }

        [TestMethod()]
        public void UserIsCarrier_ShouldCheckUserIsCarrierByIdentity()
        {
            var carrier = ctx.Carriers.FirstOrDefault();
            var user = ctx.UserData.FirstOrDefault();
            user.AspNetUser = ctx.Users.Where(x => x.Id == user.IdentityId).FirstOrDefault();
            carrier.User = user;

            Assert.IsTrue(authService.UserIsCarrier(carrier.User.IdentityId, carrier.Id));
        }


        [TestMethod()]
        public void GetUserId_ShouldReturnUserId()
        {
            var user = ctx.UserData.FirstOrDefault();
            Assert.AreEqual(user.Id, authService.GetUserId(user.IdentityId));
        }


        [TestMethod()]
        public void GetUserOrganisationId_ShouldReturnUserOrganisationIdById()
        {
            var user = ctx.UserData.FirstOrDefault();
            usersService.SetOrganisation(user.Id, 1);
            Assert.AreEqual(1, authService.GetUserOrganisationId(user.IdentityId));
        }



        [TestMethod()]
        public void GetUserOrganisationId_ShouldReturnUserOrganisationIdByIdentity()
        {
            var user = ctx.UserData.FirstOrDefault();
            usersService.SetOrganisation(user.Id, 1);
            Assert.AreEqual(1, authService.GetUserOrganisationId(user.Id));
        }
    }
}
