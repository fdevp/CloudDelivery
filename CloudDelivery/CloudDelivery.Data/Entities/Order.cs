﻿using CloudDelivery.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CloudDelivery.Data.Entities
{
    [Table("Orders")]
    public class Order : BaseModel<int>
    {
        [ForeignKey("Carrier")]
        public int? CarrierId { get; set; }

        public virtual Carrier Carrier { get; set; }

        [ForeignKey("SalePoint")]
        public int SalePointId { get; set; }

        public virtual SalePoint SalePoint { get; set; }

        [ForeignKey("Package")]
        public int PackageId { get; set; }

        public virtual Package Package { get; set; }

        public DateTime? AddedTime { get; set; }

        public DateTime? AcceptedTime { get; set; }

        public DateTime? CancellationTime { get; set; }

        public DateTime? RequiredPickUpTime { get; set; }

        public DateTime? PickUpTime { get; set; }

        public DateTime? DeliveredTime { get; set; }

        public string DestinationCity { get; set; }

        public string DestinationAddress { get; set; }

        public string CustomerPhone { get; set; }

        public decimal? Price { get; set; }

        public int Priority { get; set; }

        public OrderStatus Status { get; set; }

        public string EndLatLng { get; set; }

        public int? Duration { get; set; }
    }
}