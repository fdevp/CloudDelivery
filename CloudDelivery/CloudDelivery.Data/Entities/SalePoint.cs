using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CloudDelivery.Data.Entities
{
    [Table("SalePoints")]
    public class SalePoint : BaseModel<int>
    {
        [ForeignKey("User")]
        public int? UserId { get; set; }

        public virtual User User { get; set; }

        public string City { get; set; }

        public string Address { get; set; }

        public string LatLng { get; set; }

        public string Marker { get; set; }
    }
}