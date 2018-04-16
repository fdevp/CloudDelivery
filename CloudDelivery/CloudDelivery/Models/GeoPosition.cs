using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models
{
    public class GeoPosition
    {
        public string lat { get; set; }

        public string lng { get; set; }

        public string ToGoogleString()
        {
            return string.Concat(this.lat, ",", this.lng);
        }

        public string ToJsonString()
        {
            return string.Concat("{", "\"lat\":", this.lat, ",\"lng\":", this.lng, "}");
        }
    }
}