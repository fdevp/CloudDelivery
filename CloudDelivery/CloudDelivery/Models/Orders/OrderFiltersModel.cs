using CloudDelivery.Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace CloudDelivery.Models.Orders
{
    public class OrderFiltersModel
    {
        public string Query { get; set; }

        public int? CarrierUserId { get; set; }

        public int? SalePointUserId { get; set; }

        public int? OrganisationId { get; set; }

        public int? PackageId { get; set; }

        public DateTime? AddedTimeStart { get; set; }

        public DateTime? AddedTimeEnd { get; set; }

        public DateTime? DeliveredTimeStart { get; set; }

        public DateTime? DeliveredTimeEnd { get; set; }

        public OrderStatus? Status { get; set; }

        public int? DistanceMin { get; set; }

        public int? DistanceMax { get; set; }

        public int? DeliveryMinutesMin { get; set; }

        public int? DeliveryMinutesMax { get; set; }

        public int? PriorityMin { get; set; }

        public int? PriorityMax { get; set; }
    }
}