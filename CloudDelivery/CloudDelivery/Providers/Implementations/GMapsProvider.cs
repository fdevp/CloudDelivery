using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
using System.Text;
using Newtonsoft.Json;
using CloudDelivery.Models;
using CloudDelivery.Models.Orders;
using CloudDelivery.Models.GoogleApis;
using System.Globalization;

namespace CloudDelivery.Providers
{
    public class GMapsProvider : IGMapsProvider
    {
        private IHttpProvider httpProvider;
        private string gmapsKey;

        private string distanceMatrixUri;
        private string directionsUri;
        private string geocodeUri;

        public GMapsProvider(IHttpProvider httpProvider)
        {
            this.httpProvider = httpProvider;

            this.gmapsKey = System.Configuration.ConfigurationManager.AppSettings["GoogleMapsApiKey"];
            this.distanceMatrixUri = System.Configuration.ConfigurationManager.AppSettings["DistanceMatrixUri"];
            this.directionsUri = System.Configuration.ConfigurationManager.AppSettings["DirectionsUri"];
            this.geocodeUri = System.Configuration.ConfigurationManager.AppSettings["GeocodeUri"];
        }

        public async Task<GeoPosition> Geolocation(string query)
        {
            var data = this.ParamsDictWithKey();
            data.Add("address", query);


            string response = await this.httpProvider.GetAsync(this.geocodeUri, data);
            GeocodeRoot geocodeObject = JsonConvert.DeserializeObject<GeocodeRoot>(response);

            if (geocodeObject.status != "OK")
                throw new Exception(geocodeObject.status);


            var geoPos = new GeoPosition();

            geoPos.lat = geocodeObject.results[0].geometry.location.lat;
            geoPos.lng = geocodeObject.results[0].geometry.location.lng;

            return geoPos;
        }

        public async Task<DistanceDuration> DistanceMatrix(string origin, string destination)
        {
            origin = origin.Replace(" ", "+");
            destination = destination.Replace(" ", "+");

            var data = this.ParamsDictWithKey();
            data.Add("origins", origin);
            data.Add("destinations", destination);

            string response = await this.httpProvider.GetAsync(this.distanceMatrixUri, data);
            DistanceMatrixRoot matrixObject = JsonConvert.DeserializeObject<DistanceMatrixRoot>(response);

            if (matrixObject.status != "OK")
                throw new Exception(matrixObject.status);

            return new DistanceDuration { Duration = matrixObject.rows[0].elements[0].duration.value,
                                         Distance = matrixObject.rows[0].elements[0].distance.value };
        }
 
        public async Task<DirectionsResponse> Directions(GeoPosition origin, GeoPosition destination)
        {
            var data = this.ParamsDictWithKey();
            data.Add("origin", origin.ToGoogleString());
            data.Add("destination", destination.ToGoogleString());

            DirectionsResponse response = new DirectionsResponse();
            response.RouteJSON = await this.httpProvider.GetAsync(this.directionsUri, data);

            DirectionsRoot traceObject = JsonConvert.DeserializeObject<DirectionsRoot>(response.RouteJSON);

            //string response = responseJson["status"].Value<string>();
            if (traceObject.status != "OK")
                throw new Exception(traceObject.status);

            //distance and time
            foreach (var leg in traceObject.routes[0].legs)
            {
                response.Distance += leg.distance.value;
                response.Duration += leg.duration.value;
            }

            return response;
        }

        public async Task<DirectionsResponse> Directions(GeoPosition origin, GeoPosition destination, List<GeoPosition> waypoints)
        {
            if (waypoints == null || waypoints.Count < 1 )
                throw new ArgumentException("Not enought points");


            StringBuilder waypointsParam = new StringBuilder();

            for (int i = 1; i < waypoints.Count - 1; i++)
            {
                waypointsParam.Append(waypoints[i].ToGoogleString());
                waypointsParam.Append("|");
            }

            //last element without separator
            waypointsParam.Append(waypoints[waypoints.Count - 1].ToGoogleString());

            //parameters
            var data = this.ParamsDictWithKey();
            data.Add("origin", origin.ToGoogleString());
            data.Add("destination", destination.ToGoogleString());
            data.Add("waypoints", waypointsParam.ToString());


            DirectionsResponse response = new DirectionsResponse();
            response.RouteJSON = await this.httpProvider.GetAsync(this.directionsUri, data);

            DirectionsRoot traceObject = JsonConvert.DeserializeObject<DirectionsRoot>(response.RouteJSON);

            if (traceObject.status != "OK")
                throw new Exception(traceObject.status);

            //distance and time
            foreach (var leg in traceObject.routes[0].legs)
            {
                response.Distance += leg.distance.value;
                response.Duration += leg.duration.value;
            }

            return response;
        }

        private Dictionary<string, string> ParamsDictWithKey()
        {
            return new Dictionary<string, string> { { "key", this.gmapsKey } };
        }
    }
}