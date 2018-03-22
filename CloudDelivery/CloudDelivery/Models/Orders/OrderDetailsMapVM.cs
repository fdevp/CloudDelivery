using CloudDelivery.Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models.Orders
{
    public class OrderDetailsMapVM : OrderMapVM
    {
        public DateTime? AcceptedTime { get; set; }

        public DateTime? PickUpTime { get; set; }

        public DateTime? DeliveredTime { get; set; }

        public string CustomerPhone { get; set; }

        public string SalepointPhone { get; set; }

        public decimal? Price { get; set; }
    }
}