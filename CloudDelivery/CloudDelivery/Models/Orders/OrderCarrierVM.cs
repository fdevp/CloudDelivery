using CloudDelivery.Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models.Orders
{
    public class OrderCarrierVM
    {
        public int Id { get; set; }
        
        public string SalepointName { get; set; }

        public string SalepointCity { get; set; }

        public string SalepointAddress { get; set; }

        public int SalepointId { get; set; }

        public string SalepointLatLng { get; set; }

        public DateTime? AddedTime { get; set; }

        public DateTime? RequiredPickUpTime { get; set; }

        public string DestinationCity { get; set; }

        public string DestinationAddress { get; set; }

        public int Priority { get; set; }

        public OrderStatus Status { get; set; }

        public string EndLatLng { get; set; }
    }
}