using CloudDelivery.Data.Enums.Routes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CloudDelivery.Data.Entities
{
    [Table("RoutePoints")]
    public class RoutePoint : BaseModel<int>
    {
        [ForeignKey("Route")]
        public int RouteId { get; set; }

        public virtual Route Route { get; set; }

        public RoutePointType Type { get; set; }

        public int Index { get; set; }

        public DateTime? PassedTime { get; set; }

        [ForeignKey("Order")]
        public int? OrderId { get; set; }

        public virtual Order Order { get; set; }
    }
}