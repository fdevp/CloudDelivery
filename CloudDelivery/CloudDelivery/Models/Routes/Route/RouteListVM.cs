using CloudDelivery.Data.Enums.Routes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models.Routes.Route
{
    public class RouteListVM
    {
        public int Id { get; set; }

        public int CarrierId { get; set; }

        public RouteStatus Status { get; set; }

        public DateTime AddedTime { get; set; }

        public DateTime FinishTime { get; set; }

        public string StartLatLng { get; set; }

        public int? Distance { get; set; }

        public int? Duration { get; set; }
    }
}