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

            GeocodeRoot geocodeObject = await this.httpProvider.GetAsync<GeocodeRoot>(this.geocodeUri, data);

            if (geocodeObject.status != "OK")
                throw new Exception(geocodeObject.status);


            var geoPos = new GeoPosition();

            geoPos.lat = geocodeObject.results[0].geometry.location.lat;
            geoPos.lng = geocodeObject.results[0].geometry.location.lng;

            return geoPos;
        }

        public async Task<TraceProperties> DistanceMatrix(string origin, string destination)
        {
            origin = origin.Replace(" ", "+");
            destination = destination.Replace(" ", "+");

            var data = this.ParamsDictWithKey();
            data.Add("origins", origin);
            data.Add("destinations", destination);

            var matrixObject = await this.httpProvider.GetAsync<DistanceMatrixRoot>(this.distanceMatrixUri, data);

            if (matrixObject.status != "OK")
                throw new Exception(matrixObject.status);

            return new TraceProperties { Time = matrixObject.rows[0].elements[0].duration.value,
                                         Distance = matrixObject.rows[0].elements[0].distance.value };
        }
 
        public async Task<ApproximateTrace> DistanceMatrix(string carrierPos, string SalePointPos, string destPos)
        {
            string origins = String.Concat(carrierPos, "|", SalePointPos);
            string destinations = String.Concat(SalePointPos, "|", destPos);


            var data = this.ParamsDictWithKey();
            data.Add("origins", origins);
            data.Add("destinations", destinations.ToString());

            var matrixObject = await this.httpProvider.GetAsync<DistanceMatrixRoot>(this.distanceMatrixUri, data);

            if (matrixObject.status != "OK")
                throw new Exception(matrixObject.status);

            ApproximateTrace distances = new ApproximateTrace();


            //origin to waypoint
            distances.CarrierToSalePoint.Time = matrixObject.rows[0].elements[0].duration.value;
            distances.CarrierToSalePoint.Distance = matrixObject.rows[0].elements[0].distance.value;

            //waypoint to destination
            distances.SalePointToEndpoint.Time = matrixObject.rows[1].elements[1].duration.value;
            distances.SalePointToEndpoint.Distance = matrixObject.rows[1].elements[1].distance.value;

            return distances;
        }

        public async Task<OrderTrace> Directions(string origin, string destination)
        {
            origin = origin.Replace(" ", "+");
            destination = destination.Replace(" ", "+");

            var data = this.ParamsDictWithKey();
            data.Add("origin", origin);
            data.Add("destination", destination);


            OrderTrace trace = new OrderTrace();
            trace.TraceJSON = await this.httpProvider.GetAsync<string>(this.directionsUri, data);

            DirectionsRoot traceObject = JsonConvert.DeserializeObject<DirectionsRoot>(trace.TraceJSON);

            //string response = responseJson["status"].Value<string>();
            if (traceObject.status != "OK")
                throw new Exception(traceObject.status);

            //distance and time
            foreach (var leg in traceObject.routes[0].legs)
            {
                trace.properties.Distance += leg.distance.value;
                trace.properties.Time += leg.duration.value;
            }

            return trace;
        }

        public async Task<OrderTrace> Directions(string origin, string destination, List<string> waypoints)
        {
            if (waypoints == null || waypoints.Count < 1 )
                throw new ArgumentException("Not enought points");


            //set correct string parameter
            origin = origin.Replace(" ", "+");
            destination = destination.Replace(" ", "+");

            for (int i = 0; i < waypoints.Count; i++)
            {
                waypoints[i] = waypoints[i].Replace(" ", "+");
            }

            StringBuilder waypointsParam = new StringBuilder();

            for (int i = 1; i < waypoints.Count - 1; i++)
            {
                waypointsParam.Append(waypoints[i]);
                waypointsParam.Append("|");
            }

            //last element without separator
            waypointsParam.Append(waypoints[waypoints.Count - 1]);

            //parameters
            var data = this.ParamsDictWithKey();
            data.Add("origin", origin);
            data.Add("destination", destination);
            data.Add("waypoints", waypointsParam.ToString());

            
            OrderTrace trace = new OrderTrace();
            trace.TraceJSON = await this.httpProvider.GetAsync<string>(this.directionsUri, data);

            DirectionsRoot traceObject = JsonConvert.DeserializeObject<DirectionsRoot>(trace.TraceJSON);

            if (traceObject.status != "OK")
                throw new Exception(traceObject.status);

            //distance and time
            foreach(var leg in traceObject.routes[0].legs)
            {
                trace.properties.Distance += leg.distance.value;
                trace.properties.Time += leg.duration.value;
            }
            
            return trace;
        }

        private Dictionary<string, string> ParamsDictWithKey()
        {
            return new Dictionary<string, string> { { "key", this.gmapsKey } };
        }
    }
}