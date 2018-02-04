using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CloudDelivery.Data.Entities
{
    [Table("Carriers")]
    public class Carrier : BaseModel<int>
    {
        [ForeignKey("User")]
        public int? UserId { get; set; }

        public virtual User User { get; set; }
    
        public string Marker { get; set; }
    }
}