using CloudDelivery.Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models.Orders
{
    public class OrderVM
    {
        public int Id { get; set; }

        public string SalepointName { get; set; }

        public int SalepointId { get; set; }

        public string CarrierName { get; set; }

        public int? CarrierId { get; set; }

        public string SalepointLatLng { get; set; }

        public DateTime? AddedTime { get; set; }

        public DateTime? AcceptedTime { get; set; }

        public DateTime? CancellationTime { get; set; }

        public DateTime? RequiredPickUpTime { get; set; }

        public DateTime? PickUpTime { get; set; }

        public DateTime? DeliveredTime { get; set; }

        public string StartLatLng { get; set; }

        public string DestinationCity { get; set; }

        public string DestinationAddress { get; set; }

        public int Priority { get; set; }

        public OrderStatus Status { get; set; }

        public string EndLatLng { get; set; }

        public int? Duration { get; set; }

        public string CustomerPhone { get; set; }

        public decimal? Price { get; set; }
    }
}