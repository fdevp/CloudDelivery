using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CloudDelivery.Data;
using CloudDelivery.Tests.Initialize;
using CloudDelivery.Providers;

namespace CloudDelivery.Services.Tests
{
    [TestClass()]
    public class SalespointServiceTests
    {
        SalepointsService salespointsService;
        UsersService usersService;
        ICDContext ctx;

        public SalespointServiceTests()
        {
            var ctxFactory = DatabaseMocksFactory.GetCtxFactoryMock().Object;
            var cache = new CacheProvider();
            ctx = ctxFactory.GetContext();
            salespointsService = new SalepointsService(cache, ctxFactory);
            usersService = new UsersService(cache, ctxFactory);
        }

        [TestMethod()]
        public void SetAddress_ShouldSetAddress()
        {
            var salepoint = ctx.SalePoints.FirstOrDefault();
            this.salespointsService.SetAddress(salepoint.UserId.Value, "str33t");
            Assert.AreEqual("str33t", salepoint.Address);
        }

        [TestMethod()]
        public void SetCity_ShouldSetCity()
        {
            var salepoint = ctx.SalePoints.FirstOrDefault();
            this.salespointsService.SetCity(salepoint.UserId.Value, "warsaw");
            Assert.AreEqual("warsaw", salepoint.City);
        }

        [TestMethod()]
        public void SetColor_ShouldSetColor()
        {
            var salepoint = ctx.SalePoints.FirstOrDefault();
            this.salespointsService.SetColor(salepoint.UserId.Value, "red");
            Assert.AreEqual("red", salepoint.Color);
        }

        [TestMethod()]
        public void SetLatLng_ShouldSetLatLng()
        {
            var salepoint = ctx.SalePoints.FirstOrDefault();
            this.salespointsService.SetLatLng(salepoint.UserId.Value, "{'lat':'54.46405','lng':'17.02872'}");
            Assert.AreEqual("{'lat':'54.46405','lng':'17.02872'}", salepoint.LatLng);
        }

        [TestMethod()]
        public void SetSalepoint_ShouldSetSalepointForUser()
        {
            int userId = this.usersService.AddUser("test1", "test1", null);
            this.salespointsService.SetSalepoint(userId);
            var newSp = ctx.SalePoints.Where(x => x.UserId == userId).FirstOrDefault();
            Assert.IsNotNull(newSp);
        }

        [TestMethod()]
        [ExpectedException(typeof(ArgumentException))]
        public void SetSalepoint_ShouldThrowArgumentException()
        {
            var user = this.ctx.UserData.FirstOrDefault();
            this.salespointsService.SetSalepoint(user.Id);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void SetSalepoint_ShouldThrowUserNullException()
        {
            this.salespointsService.SetSalepoint(int.MinValue);
        }

        [TestMethod()]
        public void RemoveSalepoint_ShouldRemoveSalepoint()
        {
            var salepoint = this.ctx.SalePoints.FirstOrDefault();
            this.salespointsService.RemoveSalepoint(salepoint.UserId.Value);
            Assert.IsFalse(ctx.SalePoints.Any(x => x.Id == salepoint.Id));
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void RemoveSalepoint_ShouldThrowSalepointNullException()
        {
            this.salespointsService.RemoveSalepoint(int.MinValue);
        }

        [TestMethod()]
        public void GetSalePoint_ShouldReturnSalepoint()
        {
            var salepoint = ctx.SalePoints.FirstOrDefault();
            var sp = this.salespointsService.GetSalePoint(salepoint.UserId.Value);
            Assert.AreEqual(salepoint, sp);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetSalePoint_ShouldThrowSalepointNullException()
        {
            this.salespointsService.GetSalePoint(int.MinValue);
        }

        [TestMethod()]
        public void GetSalePointById_ShouldReturnSalePoint()
        {
            var salepoint = ctx.SalePoints.FirstOrDefault();
            var sp = this.salespointsService.GetSalePointById(salepoint.Id);
            Assert.AreEqual(salepoint.Id, sp.Id);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetSalePointById_ShouldThrowUserNullException()
        {
            this.salespointsService.GetSalePointById(int.MinValue);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetSalePointById_ShouldThrowSalepointNullException()
        {
            var salepoint = ctx.SalePoints.FirstOrDefault();
            this.salespointsService.RemoveSalepoint(salepoint.UserId.Value);
            this.salespointsService.GetSalePointById(salepoint.UserId.Value);
        }

        [TestMethod()]
        public void GetSalePoints_ShouldReturnAllSalepoints()
        {
            Assert.AreEqual(ctx.SalePoints.Count(),this.salespointsService.GetSalePoints().Count);
        }

        [TestMethod()]
        public void GetOrganisationSalePoints_ShouldReturnOrganisationSalepoints()
        {
            var users = ctx.UserData.Take(3).ToList();
            foreach (var user in users)
            {
                this.usersService.SetOrganisation(user.Id, 1);
                var sp = this.salespointsService.GetSalePoint(user.Id);
                sp.User = user;
            }
            Assert.AreEqual(3, this.salespointsService.GetOrganisationSalePoints(1).Count);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetOrganisationSalePoints_ShouldThrowOrganisationNullException()
        {
            this.salespointsService.GetOrganisationSalePoints(int.MinValue);
        }
    }
}