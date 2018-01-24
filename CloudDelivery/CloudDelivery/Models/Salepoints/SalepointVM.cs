using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models
{
    public class SalepointVM
    {
        public int UserId { get; set; }

        public string City { get; set; }

        public string Address { get; set; }

        public string LatLng { get; set; }

        public string Color { get; set; }
    }
}