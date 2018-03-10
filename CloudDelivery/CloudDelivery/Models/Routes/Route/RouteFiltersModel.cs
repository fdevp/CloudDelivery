using CloudDelivery.Data.Enums.Routes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models.Routes
{
    public class RouteFiltersModel
    {
        public RouteStatus? Status { get; set; }

        public int? CarrierId { get; set; }

        public DateTime? AddedTimeStart { get; set; }

        public DateTime? AddedTimeEnd { get; set; }

        public DateTime? FinishTimeStart { get; set; }

        public DateTime? FinishTimeEnd { get; set; }

        public int? DurationMin { get; set; }

        public int? DurationMax { get; set; }
    }
}