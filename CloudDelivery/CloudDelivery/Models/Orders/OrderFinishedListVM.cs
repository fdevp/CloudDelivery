using CloudDelivery.Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models.Orders
{
    public class OrderFinishedListVM
    {
        public int Id { get; set; }

        public string CarrierName { get; set; }

        public DateTime? AddedTime { get; set; }

        public string DestinationCity { get; set; }

        public string DestinationAddress { get; set; }

        public DateTime? DeliveredTime { get; set; }

        public DateTime? CancellationTime { get; set; }

        public OrderStatus Status { get; set; }
    }
}