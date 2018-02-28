using CloudDelivery.Data;
using CloudDelivery.Data.Entities;
using CloudDelivery.Providers;
using CloudDelivery.Services;
using CloudDelivery.Tests.Initialize;
using CloudDelivery.Tests.Mocks;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
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
            ICDContextFactory ctxFactory = DatabaseMocksFactory.GetCtxFactoryMock().Object;
            var cache = new CacheProvider();
            ctx = ctxFactory.GetContext();

            authService = new AuthorizationService(cache, ctxFactory);
            usersService = new UsersService(cache, ctxFactory);
        }
        
        [TestMethod()]
        public void GetAppUserId_ShouldReturnAppUserId()
        {
            User user = ctx.AppUsers.FirstOrDefault();
            IPrincipal principal = PrincipalMocks.PrincipalWithRole(user, "").Object;

            Assert.AreEqual(user.Id,this.authService.GetAppUserId(principal));
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetAppUserId_ShouldThrowUserNullReferenceException()
        {
            var user = new User();
            IPrincipal principal = PrincipalMocks.PrincipalWithRole(user, "").Object;
            this.authService.GetAppUserId(principal);
        }

        [TestMethod()]
        public void GetCarrierId_ShouldReturnCarrierId()
        {
            Carrier carrier = ctx.Carriers.FirstOrDefault();
            IPrincipal principal = PrincipalMocks.PrincipalWithRole(carrier.User, "").Object;

            Assert.AreEqual(carrier.Id, this.authService.GetCarrierId(principal));
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetCarrierId_ShouldThrowCarrierNullReferenceException()
        {
            var user = new User();
            IPrincipal principal = PrincipalMocks.PrincipalWithRole(user, "").Object;
            this.authService.GetCarrierId(principal);
        }

        [TestMethod()]
        public void GetSalePointId_ShouldReturnSalePointId()
        {
            SalePoint salePoint = ctx.SalePoints.FirstOrDefault();
            IPrincipal principal = PrincipalMocks.PrincipalWithRole(salePoint.User, "").Object;

            Assert.AreEqual(salePoint.Id, this.authService.GetAppUserId(principal));
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetSalePointId_ShouldThrowSalePointNullReferenceException()
        {
            var user = new User();
            IPrincipal principal = PrincipalMocks.PrincipalWithRole(user, "").Object;
            this.authService.GetSalePointId(principal);
        }


        [TestMethod()]
        public void GetOrganisationId_ShouldReturnOrganisationId()
        {
            User user = ctx.AppUsers.FirstOrDefault();
            IPrincipal principal = PrincipalMocks.PrincipalWithRole(user, "").Object;

            Assert.AreEqual(user.OrganisationId, this.authService.GetOrganisationId(principal));
        }

        [TestMethod()]
        public void CanCheckOrderDetails_ShouldReturnTrueForAdmin()
        {
            User user = ctx.AppUsers.FirstOrDefault();
            IPrincipal principal = PrincipalMocks.PrincipalWithRole(user, "admin").Object;
            Order order = ctx.Orders.FirstOrDefault();

            Assert.IsTrue(this.authService.CanCheckOrderDetails(order.Id, principal));
        }

        [TestMethod()]
        public void CanCheckOrderDetails_ShouldReturnTrueForCarrier()
        {
            Order order = ctx.Orders.Where(x=>x.CarrierId != null).FirstOrDefault();
            Carrier carrier = ctx.Carriers.Where(x => x.Id == order.CarrierId).FirstOrDefault();
            IPrincipal principal = PrincipalMocks.PrincipalWithRole(carrier.User, "carrier").Object;

            Assert.IsTrue(this.authService.CanCheckOrderDetails(order.Id, principal));
        }

        [TestMethod()]
        public void CanCheckOrderDetails_ShouldReturnTrueForSalePoint()
        {
            Order order = ctx.Orders.FirstOrDefault();
            SalePoint sp = ctx.SalePoints.Where(x => x.Id == order.SalePointId).FirstOrDefault();
            IPrincipal principal = PrincipalMocks.PrincipalWithRole(sp.User, "salepoint").Object;

            Assert.IsTrue(this.authService.CanCheckOrderDetails(order.Id, principal));
        }


        [TestMethod()]
        public void CanCheckOrderDetails_ShouldReturnTrueForOrganisator()
        {
            Order order = ctx.Orders.FirstOrDefault();
            SalePoint sp = ctx.SalePoints.Where(x => x.Id == order.SalePointId).FirstOrDefault();
            User organisator = ctx.AppUsers.Where(x => x.Id != sp.UserId && x.OrganisationId == sp.User.OrganisationId).FirstOrDefault();
            IPrincipal principal = PrincipalMocks.PrincipalWithRole(sp.User, "organisator").Object;

            Assert.IsTrue(this.authService.CanCheckOrderDetails(order.Id, principal));
        }

        [TestMethod()]
        public void CanCheckOrderDetails_ShouldReturnFalse()
        {
            Order order = ctx.Orders.FirstOrDefault();
            Order orderSec = ctx.Orders.Where(x => x.CarrierId != order.CarrierId).FirstOrDefault();

            User user = ctx.AppUsers.Where(x => x.Id == orderSec.Carrier.UserId).FirstOrDefault();
            IPrincipal principal = PrincipalMocks.PrincipalWithRole(user, "carrier").Object;

            Assert.IsFalse(this.authService.CanCheckOrderDetails(order.Id, principal));
        }

        [TestMethod()]
        public void CanCheckRouteDetails_ShouldReturnTrueForAdmin()
        {
            Route route = ctx.Routes.FirstOrDefault();
            User user = ctx.AppUsers.FirstOrDefault();
            IPrincipal principal = PrincipalMocks.PrincipalWithRole(user, "admin").Object;

            Assert.IsTrue(this.authService.CanCheckOrderDetails(route.Id, principal));
        }


        [TestMethod()]
        public void CanCheckRouteDetails_ShouldReturnTrueForCarrier()
        {
            Route route = ctx.Routes.FirstOrDefault();
            User user = ctx.Carriers.Where(x => x.Id == route.CarrierId).FirstOrDefault().User;
            IPrincipal principal = PrincipalMocks.PrincipalWithRole(user, "carrier").Object;

            Assert.IsTrue(this.authService.CanCheckOrderDetails(route.Id, principal));
        }

        [TestMethod()]
        public void CanCheckRouteDetails_ShouldReturnFalse()
        {
            Route route = ctx.Routes.FirstOrDefault();
            Route routeSec = ctx.Routes.Where(x => x.CarrierId != route.CarrierId).FirstOrDefault();

            User user = ctx.AppUsers.Where(x => x.Id == routeSec.Carrier.UserId).FirstOrDefault();
            IPrincipal principal = PrincipalMocks.PrincipalWithRole(user, "carrier").Object;

            Assert.IsFalse(this.authService.CanCheckOrderDetails(route.Id, principal));
        }


        [TestMethod()]
        public void HasCarrierPerms_ShouldReturnFalse()
        {
            Order order = ctx.Orders.FirstOrDefault();
            Order orderSec = ctx.Orders.Where(x => x.CarrierId != order.CarrierId).FirstOrDefault();

            User user = ctx.AppUsers.Where(x => x.Id == orderSec.Carrier.UserId).FirstOrDefault();
            IPrincipal principal = PrincipalMocks.PrincipalWithRole(user, "carrier").Object;

            Assert.IsFalse(this.authService.HasCarrierPerms(order.Id, principal));
        }

        [TestMethod()]
        public void HasCarrierPerms_ShouldReturnTrueForAdmin()
        {
            User user = ctx.AppUsers.FirstOrDefault();
            Order order = ctx.Orders.FirstOrDefault();

            IPrincipal principal = PrincipalMocks.PrincipalWithRole(user, "admin").Object;

            Assert.IsTrue(this.authService.HasCarrierPerms(order.Id, principal));
        }

        [TestMethod()]
        public void HasCarrierPerms_ShouldReturnTrueForCarrier()
        {
            Order order = ctx.Orders.Where(x => x.CarrierId != null).FirstOrDefault();
            User user = order.Carrier.User;

            IPrincipal principal = PrincipalMocks.PrincipalWithRole(user, "carrier").Object;

            Assert.IsTrue(this.authService.HasCarrierPerms(order.Id, principal));
        }


        [TestMethod()]
        public void HasSalepointPerms_ShouldReturnFalse()
        {
            Order order = ctx.Orders.FirstOrDefault();
            Order orderSec = ctx.Orders.Where(x => x.SalePointId != order.SalePointId).FirstOrDefault();

            User user = ctx.AppUsers.Where(x => x.Id == orderSec.SalePoint.UserId).FirstOrDefault();
            IPrincipal principal = PrincipalMocks.PrincipalWithRole(user, "salepoint").Object;

            Assert.IsFalse(this.authService.HasSalepointPerms(order.Id, principal));
        }

        [TestMethod()]
        public void HasSalepointPerms_ShouldReturnTrueForAdmin()
        {
            User user = ctx.AppUsers.FirstOrDefault();
            Order order = ctx.Orders.FirstOrDefault();

            IPrincipal principal = PrincipalMocks.PrincipalWithRole(user, "admin").Object;

            Assert.IsTrue(this.authService.HasSalepointPerms(order.Id, principal));
        }

        [TestMethod()]
        public void HasSalepointPerms_ShouldReturnTrueForSalePoint()
        {
            Order order = ctx.Orders.FirstOrDefault();
            User user = order.SalePoint.User;

            IPrincipal principal = PrincipalMocks.PrincipalWithRole(user, "salepoint").Object;

            Assert.IsTrue(this.authService.HasSalepointPerms(order.Id, principal));
        }

        [TestMethod()]
        public void HasOrganisatorPerms_ShouldReturnFalse()
        {
            Organisation organisation = ctx.Organisations.FirstOrDefault();
            User user = ctx.AppUsers.Where(x => x.OrganisationId != organisation.Id).FirstOrDefault();

            IPrincipal principal = PrincipalMocks.PrincipalWithRole(user, "organisator").Object;

            Assert.IsFalse(this.authService.HasOrganisatorPerms(organisation.Id, principal));
        }

        [TestMethod()]
        public void HasOrganisatorPerms_ShouldReturnTrueForAdmin()
        {
            Organisation organisation = ctx.Organisations.FirstOrDefault();
            User user = ctx.AppUsers.FirstOrDefault();

            IPrincipal principal = PrincipalMocks.PrincipalWithRole(user, "admin").Object;

            Assert.IsTrue(this.authService.HasOrganisatorPerms(organisation.Id, principal));
        }

        [TestMethod()]
        public void HasOrganisatorPerms_ShouldReturnTrueForOrganisator()
        {
            Organisation organisation = ctx.Organisations.FirstOrDefault();
            User user = ctx.AppUsers.Where(x => x.OrganisationId == organisation.Id).FirstOrDefault();

            IPrincipal principal = PrincipalMocks.PrincipalWithRole(user, "organisator").Object;

            Assert.IsTrue(this.authService.HasOrganisatorPerms(organisation.Id, principal));
        }

    }
}
