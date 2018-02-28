using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models.Routes
{
    public class RouteEditModel
    {
        public List<RoutePointEditModel> EditPoints { get; set; }

        public GeoPosition StartPosition { get; set; }
    }
}