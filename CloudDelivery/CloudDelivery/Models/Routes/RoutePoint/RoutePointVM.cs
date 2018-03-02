using CloudDelivery.Data.Enums.Routes;
using CloudDelivery.Models.Orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models.Routes
{
    public class RoutePointViewModel
    {
        public int Id { get; set; }

        public int Index { get; set; }

        public DateTime? PassedTime { get; set; }

        public RoutePointType Type { get; set; }

        public int OrderId { get; set; }

        public OrderMapVM Order { get; set; }

        public int LatLng { get; set; }
    }
}