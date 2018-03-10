using CloudDelivery.Data.Enums.Routes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CloudDelivery.Data.Entities
{
    [Table("Routes")]
    public class Route : BaseModel<int>
    {
        public virtual ICollection<RoutePoint> Points { get; set; }

        [ForeignKey("Carrier")]
        public int CarrierId { get; set; }

        public virtual Carrier Carrier { get; set; }

        public RouteStatus Status { get; set; }

        public DateTime AddedTime { get; set; }

        public DateTime? FinishTime { get; set; }

        public int? Duration { get; set; }
    }
}