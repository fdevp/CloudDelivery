using CloudDelivery.Data.Enums.Routes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models.Routes
{
    public class RoutePointEditModel
    {
        public int OrderId { get; set; }

        public int Index { get; set; }

        public RoutePointType Type { get; set; }
    }
}