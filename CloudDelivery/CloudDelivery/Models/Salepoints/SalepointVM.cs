﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models
{
    public class SalePointVM
    {
        public int UserId { get; set; }

        public string City { get; set; }

        public string Address { get; set; }

        public string LatLng { get; set; }

        public string Marker { get; set; }
    }
}