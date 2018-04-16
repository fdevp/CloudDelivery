using CloudDelivery.Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models.Orders
{
    public class OrderCountFiltersModel
    {
        public int? CarrierUserId { get; set; }

        public int? SalePointUserId { get; set; }

        public int? OrganisationId { get; set; }

        public OrderStatus[] Status { get; set; }

        public DateTime? AddedTimeStart { get; set; }

        public DateTime? AddedTimeEnd { get; set; }

        public DateTime? AcceptedTimeStart { get; set; }

        public DateTime? AcceptedTimeEnd { get; set; }
    }
}