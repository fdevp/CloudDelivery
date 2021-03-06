﻿using Microsoft.VisualStudio.TestTools.UnitTesting;
using CloudDelivery.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CloudDelivery.Data;
using CloudDelivery.Tests.Initialize;
using CloudDelivery.Providers;
using CloudDelivery.Data.Entities;
using Moq;

namespace CloudDelivery.Services.Tests
{
    [TestClass()]
    public class CarrierServiceTests
    {
        private CarriersService carriersService;
        private UsersService usersService;
        private Mock<ICDContext> ctxMock;
        private ICDContext ctx;

        public CarrierServiceTests()
        {
            ctxMock = DatabaseMocksFactory.GetContextMock();
            ICDContextFactory ctxFactory = DatabaseMocksFactory.GetCtxFactoryMock(ctxMock).Object;
            var cache = new CacheProvider();
            ctx = ctxFactory.GetContext();
            carriersService = new CarriersService(cache, ctxFactory);
            usersService = new UsersService(cache, ctxFactory);
        }


        [TestMethod()]
        public void SetCarrier_ShouldSetCarrierForUser()
        {
            int userId = this.usersService.AddUser("test1", "test1", null);

            this.carriersService.SetCarrier(userId);
            Carrier carrier = ctx.Carriers.Where(x => x.UserId == userId).FirstOrDefault();

            Assert.IsNotNull(carrier);
            ctxMock.Verify(x => x.SaveChanges(), Times.Exactly(2));
        }

        [TestMethod()]
        [ExpectedException(typeof(ArgumentException))]
        public void SetCarrier_ShouldThrowArgumentException()
        {
            Carrier carrier = this.ctx.Carriers.FirstOrDefault();
            this.carriersService.SetCarrier(carrier.UserId.Value);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void SetCarrier_ShouldThrowUserNullException()
        {
            this.carriersService.SetCarrier(int.MinValue);
        }

        [TestMethod()]
        public void SetColor_ShouldSetColor()
        {
            Carrier carrier = ctx.Carriers.FirstOrDefault();

            this.carriersService.SetColor(carrier.UserId.Value, "red");

            Assert.AreEqual("red", carrier.Marker);
            ctxMock.Verify(x => x.SaveChanges(), Times.Once);
        }

        [TestMethod()]
        public void RemoveCarrier_ShouldRemoveCarrier()
        {
            Carrier carrier = this.ctx.Carriers.FirstOrDefault();

            this.carriersService.RemoveCarrier(carrier.UserId.Value);

            Assert.IsFalse(ctx.Carriers.Any(x => x.Id == carrier.Id));
            ctxMock.Verify(x => x.SaveChanges(), Times.Once);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void RemoveCarrier_ShouldThrowCarrierNullException()
        {
            this.carriersService.RemoveCarrier(int.MinValue);
        }

        [TestMethod()]
        public void GetCarrierById_ShouldReturnCarrier()
        {
            Carrier carrier = ctx.Carriers.FirstOrDefault();
            Carrier getCarrier = this.carriersService.GetCarrierById(carrier.Id);
            Assert.AreEqual(carrier, getCarrier);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetCarrierById_ShouldThrowCarrierNullException()
        {
            this.carriersService.GetCarrierById(int.MinValue);
        }

        [TestMethod()]
        public void GetCarriers_ShouldReturnAllCarriers()
        {
            Assert.AreEqual(ctx.Carriers.Count(), this.carriersService.GetCarriers().Count);
        }


        [TestMethod()]
        public void GetCarrier_ShouldReturnCarrier()
        {
            Carrier carrier = ctx.Carriers.FirstOrDefault();
            Carrier getCarrier = this.carriersService.GetCarrier(carrier.UserId.Value);
            Assert.AreEqual(carrier, getCarrier);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetCarrier_ShouldThrowUserNullException()
        {
            this.carriersService.GetCarrier(int.MinValue);
        }


        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetCarrier_ShouldThrowCarrierNullException()
        {
            Carrier carrier = ctx.Carriers.FirstOrDefault();
            this.carriersService.RemoveCarrier(carrier.Id);
            this.carriersService.GetCarrier(carrier.UserId.Value);
        }
    }
}