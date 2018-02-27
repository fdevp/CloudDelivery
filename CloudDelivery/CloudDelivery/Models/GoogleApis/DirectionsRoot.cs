using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models.GoogleApis
{
    public class GeocodedWaypoint
    {
        public string geocoder_status { get; set; }
        public string place_id { get; set; }
        public List<string> types { get; set; }
        public bool? partial_match { get; set; }
    }
    
    public class EndLocation
    {
        public string lat { get; set; }
        public string lng { get; set; }
    }

    public class StartLocation
    {
        public string lat { get; set; }
        public string lng { get; set; }
    }


    public class Polyline
    {
        public string points { get; set; }
    }


    public class Step
    {
        public Distance distance { get; set; }
        public Duration duration { get; set; }
        public EndLocation end_location { get; set; }
        public string html_instructions { get; set; }
        public Polyline polyline { get; set; }
        public StartLocation start_location { get; set; }
        public string travel_mode { get; set; }
        public string maneuver { get; set; }
    }

    public class Leg
    {
        public Distance distance { get; set; }
        public Duration duration { get; set; }
        public string end_address { get; set; }
        public EndLocation end_location { get; set; }
        public string start_address { get; set; }
        public StartLocation start_location { get; set; }
        public List<Step> steps { get; set; }
        public List<object> traffic_speed_entry { get; set; }
        public List<object> via_waypoint { get; set; }
    }

    public class OverviewPolyline
    {
        public string points { get; set; }
    }

    public class GoogleRoute
    {
        public Bounds bounds { get; set; }
        public string copyrights { get; set; }
        public List<Leg> legs { get; set; }
        public OverviewPolyline overview_polyline { get; set; }
        public string summary { get; set; }
        public List<object> warnings { get; set; }
        public List<object> waypoint_order { get; set; }
    }

    public class DirectionsRoot
    {
        public List<GeocodedWaypoint> geocoded_waypoints { get; set; }
        public List<GoogleRoute> routes { get; set; }
        public string status { get; set; }
    }
}