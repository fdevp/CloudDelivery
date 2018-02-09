using Microsoft.VisualStudio.TestTools.UnitTesting;
using CloudDelivery.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CloudDelivery.Tests.Mocks;

namespace CloudDelivery.Providers.Tests
{
    [TestClass()]
    public class GMapsProviderTests
    {
        private IGMapsProvider gMapsProvider;

        public GMapsProviderTests()
        {
            IHttpProvider httpMock = HttpProviderMocks.GMapsHttpProviderMock().Object;
            this.gMapsProvider = new GMapsProvider(httpMock);
        }


        [TestMethod()]
        public void Geolocation_ShouldReturnPositionOfQuery()
        {
            var resp = gMapsProvider.Geolocation("Blanes+Spain").Result;
            Assert.AreEqual("41.6759954", resp.lat);
            Assert.AreEqual("2.7902289", resp.lng);
        }

        [TestMethod()]
        public void DistanceMatrix_ShouldReturnDistanceAndTimeBetweenPoints()
        {
            var resp = gMapsProvider.DistanceMatrix("Washington,DC", "New York City,NY").Result;
            Assert.AreEqual(361715, resp.Distance);
            Assert.AreEqual(13725, resp.Time);
        }

        [TestMethod()]
        public void DistanceMatrix_ShouldReturnDistanceAndTimeBetweenCarrierSalePointEndpoint()
        {
            var resp = gMapsProvider.DistanceMatrix("52.406563,16.925853", "51.766664,19.478922", "52.227799,20.985093").Result;

            Assert.AreEqual(216020, resp.CarrierToSalePoint.Distance);
            Assert.AreEqual(8296, resp.CarrierToSalePoint.Time);

            Assert.AreEqual(127627, resp.SalePointToEndpoint.Distance);
            Assert.AreEqual(5228, resp.SalePointToEndpoint.Time);
        }

        [TestMethod()]
        public void Directions_ShouldReturnDirectionBetweenTwoPoints()
        {
            var resp = gMapsProvider.Directions("Disneyland", "Universal Studios Hollywood4").Result;
            Assert.AreEqual(57964, resp.properties.Distance);
            Assert.AreEqual(2952, resp.properties.Time);
        }

        [TestMethod()]
        public void Directions_ShouldReturnDirectionBetweenTwoPointsWithWaypoints()
        {
            List<string> points = new List<string> { "52.227799,20.985093" };
            var resp = gMapsProvider.Directions("52.406563,16.925853", "51.766664,19.478922", points).Result;

            Assert.AreEqual(436248, resp.properties.Distance);
            Assert.AreEqual(16049, resp.properties.Time);
        }
    }
}