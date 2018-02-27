using Microsoft.VisualStudio.TestTools.UnitTesting;
using CloudDelivery.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CloudDelivery.Tests.Mocks;
using CloudDelivery.Models;

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
            Assert.AreEqual(13725, resp.Duration);
        }


        [TestMethod()]
        public void Directions_ShouldReturnDirectionBetweenTwoPoints()
        {
            GeoPosition originPosition = new GeoPosition { lat= "54.410392", lng= "18.565325" };
            GeoPosition destinationPosition = new GeoPosition { lat = "54.421006", lng = "18.572821" };
            var resp = gMapsProvider.Directions(originPosition, destinationPosition).Result;
            Assert.AreEqual(1937, resp.Distance);
            Assert.AreEqual(353, resp.Duration);
        }

        [TestMethod()]
        public void Directions_ShouldReturnDirectionBetweenTwoPointsWithWaypoints()
        {
            GeoPosition originPosition = new GeoPosition { lat = "52.406563", lng = "16.925853" };
            GeoPosition destinationPosition = new GeoPosition { lat = "51.766664", lng = "19.478922" };

            List<GeoPosition> waypoints = new List<GeoPosition>();
            waypoints.Add(new GeoPosition { lat="52.227799", lng= "20.985093" });

            var resp = gMapsProvider.Directions(originPosition, destinationPosition, waypoints).Result;

            Assert.AreEqual(436248, resp.Distance);
            Assert.AreEqual(16049, resp.Duration);
        }
    }
}