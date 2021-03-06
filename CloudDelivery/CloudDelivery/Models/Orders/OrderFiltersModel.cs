﻿using CloudDelivery.Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace CloudDelivery.Models.Orders
{
    public class OrdersListFiltersModel
    {
        public int? PageIndex { get; set; }
        
        public int? PageSize { get; set; }

        public string Query { get; set; }

        public int? CarrierUserId { get; set; }

        public int? SalePointUserId { get; set; }

        public int? OrganisationId { get; set; }

        public int? PackageId { get; set; }

        public DateTime? AddedTimeStart { get; set; }

        public DateTime? AddedTimeEnd { get; set; }

        public DateTime? DeliveredTimeStart { get; set; }

        public DateTime? DeliveredTimeEnd { get; set; }

        public OrderStatus[] Status { get; set; }

        public int? DurationMin { get; set; }

        public int? DurationMax { get; set; }

        public int? PriorityMin { get; set; }

        public int? PriorityMax { get; set; }

        public decimal? PriceMin { get; set; }

        public decimal? PriceMax { get; set; }
    }
}