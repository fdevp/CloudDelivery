using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models.GoogleApis
{
    public class DirectionsResponse
    {
        public int Duration { get; set; }
        public int Distance { get; set; }
        public string RouteJSON { get; set; }
    }
}