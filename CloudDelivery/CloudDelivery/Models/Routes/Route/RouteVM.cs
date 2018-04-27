﻿using CloudDelivery.Data.Enums.Routes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models.Routes
{
    public class RouteVM
    {
        public int Id { get; set; }

        public int CarrierId { get; set; }

        public string CarrierName { get; set; }

        public int RoutePointsCount { get; set; }

        public RouteStatus Status { get; set; }

        public DateTime AddedTime { get; set; }

        public DateTime? FinishTime { get; set; }

        public int? Duration { get; set; }

        public List<RoutePointViewModel> Points { get; set; }
    }
}