using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CloudDelivery.Data;
using CloudDelivery.Tests.Initialize;
using CloudDelivery.Providers;
using CloudDelivery.Data.Entities;

namespace CloudDelivery.Services.Tests
{
    [TestClass()]
    public class SalespointServiceTests
    {
        SalePointsService salespointsService;
        UsersService usersService;
        ICDContext ctx;

        public SalespointServiceTests()
        {
            ICDContextFactory ctxFactory = DatabaseMocksFactory.GetCtxFactoryMock().Object;
            var cache = new CacheProvider();
            ctx = ctxFactory.GetContext();
            salespointsService = new SalePointsService(cache, ctxFactory);
            usersService = new UsersService(cache, ctxFactory);
        }

        [TestMethod()]
        public void SetAddress_ShouldSetAddress()
        {
            SalePoint salepoint = ctx.SalePoints.FirstOrDefault();
            this.salespointsService.SetAddress(salepoint.UserId.Value, "str33t");
            Assert.AreEqual("str33t", salepoint.Address);
        }

        [TestMethod()]
        public void SetCity_ShouldSetCity()
        {
            SalePoint salepoint = ctx.SalePoints.FirstOrDefault();
            this.salespointsService.SetCity(salepoint.UserId.Value, "warsaw");
            Assert.AreEqual("warsaw", salepoint.City);
        }

        [TestMethod()]
        public void SetColor_ShouldSetColor()
        {
            SalePoint SalePoint = ctx.SalePoints.FirstOrDefault();
            this.salespointsService.SetColor(SalePoint.UserId.Value, "red");
            Assert.AreEqual("red", SalePoint.Marker);
        }

        [TestMethod()]
        public void SetLatLng_ShouldSetLatLng()
        {
            SalePoint SalePoint = ctx.SalePoints.FirstOrDefault();
            this.salespointsService.SetLatLng(SalePoint.UserId.Value, "{'lat':'54.46405','lng':'17.02872'}");
            Assert.AreEqual("{'lat':'54.46405','lng':'17.02872'}", SalePoint.LatLng);
        }

        [TestMethod()]
        public void SetSalePoint_ShouldSetSalePointForUser()
        {
            int userId = this.usersService.AddUser("test1", "test1", null);
            this.salespointsService.SetSalePoint(userId);
            SalePoint newSp = ctx.SalePoints.Where(x => x.UserId == userId).FirstOrDefault();
            Assert.IsNotNull(newSp);
        }

        [TestMethod()]
        [ExpectedException(typeof(ArgumentException))]
        public void SetSalePoint_ShouldThrowArgumentException()
        {
            User user = this.ctx.UserData.FirstOrDefault();
            this.salespointsService.SetSalePoint(user.Id);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void SetSalePoint_ShouldThrowUserNullException()
        {
            this.salespointsService.SetSalePoint(int.MinValue);
        }

        [TestMethod()]
        public void RemoveSalePoint_ShouldRemoveSalePoint()
        {
            SalePoint SalePoint = this.ctx.SalePoints.FirstOrDefault();
            this.salespointsService.RemoveSalePoint(SalePoint.UserId.Value);
            Assert.IsFalse(ctx.SalePoints.Any(x => x.Id == SalePoint.Id));
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void RemoveSalePoint_ShouldThrowSalePointNullException()
        {
            this.salespointsService.RemoveSalePoint(int.MinValue);
        }

        [TestMethod()]
        public void GetSalePoint_ShouldReturnSalePoint()
        {
            SalePoint SalePoint = ctx.SalePoints.FirstOrDefault();
            SalePoint sp = this.salespointsService.GetSalePoint(SalePoint.UserId.Value);
            Assert.AreEqual(SalePoint, sp);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetSalePoint_ShouldThrowSalePointNullException()
        {
            this.salespointsService.GetSalePoint(int.MinValue);
        }

        [TestMethod()]
        public void GetSalePointById_ShouldReturnSalePoint()
        {
            SalePoint SalePoint = ctx.SalePoints.FirstOrDefault();
            SalePoint sp = this.salespointsService.GetSalePointById(SalePoint.Id);
            Assert.AreEqual(SalePoint.Id, sp.Id);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetSalePointById_ShouldThrowUserNullException()
        {
            this.salespointsService.GetSalePointById(int.MinValue);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetSalePointById_ShouldThrowSalePointNullException()
        {
            SalePoint SalePoint = ctx.SalePoints.FirstOrDefault();
            this.salespointsService.RemoveSalePoint(SalePoint.UserId.Value);
            this.salespointsService.GetSalePointById(SalePoint.UserId.Value);
        }

        [TestMethod()]
        public void GetSalePoints_ShouldReturnAllSalePoints()
        {
            Assert.AreEqual(ctx.SalePoints.Count(),this.salespointsService.GetSalePoints().Count);
        }

        [TestMethod()]
        public void GetOrganisationSalePoints_ShouldReturnOrganisationSalePoints()
        {
            Organisation organisation = ctx.Organisations.FirstOrDefault();
            int salepointsCount = ctx.SalePoints.Where(x => x.User.OrganisationId == organisation.Id).Count();

            List<SalePoint> spNotInOrganisation = ctx.SalePoints.Where(x=>x.User.OrganisationId != organisation.Id).Take(3).ToList();

            foreach (SalePoint sp in spNotInOrganisation)
            {
                this.usersService.SetOrganisation(sp.UserId.Value, organisation.Id);
            }

            Assert.AreEqual(salepointsCount + 3, this.salespointsService.GetOrganisationSalePoints(organisation.Id).Count);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetOrganisationSalePoints_ShouldThrowOrganisationNullException()
        {
            this.salespointsService.GetOrganisationSalePoints(int.MinValue);
        }
    }
}