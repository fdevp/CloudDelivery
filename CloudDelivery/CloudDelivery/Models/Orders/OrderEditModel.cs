using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models.Orders
{
    public class OrderEditModel
    {
        public DateTime? RequiredPickUpTime { get; set; }

        [Required, StringLength(100,MinimumLength =3, ErrorMessage ="Nazwa miasta powinna mieć przynajmniej 3 litery.")]
        public string DestinationCity { get; set; }

        [Required, StringLength(100, MinimumLength = 3, ErrorMessage = "Adres powinien mieć przynajmniej 3 litery.")]
        public string DestinationAddress { get; set; }

        public GeoPosition EndLatLng { get; set; }

        public int Priority { get; set; }

        public int PackageId { get; set; }

        public string CustomerPhone { get; set; }

        public decimal? Price { get; set; }
    }
}