using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CloudDelivery.Data.Entities
{
    [Table("Orders")]
    public class Order : BaseModel<int>
    {
        [ForeignKey("Carrier")]
        public int CarrierId { get; set; }

        public virtual Carrier Carrier { get; set; }

        [ForeignKey("SalePoint")]
        public int SalePointId { get; set; }

        public virtual SalePoint SalePoint { get; set; }

        [ForeignKey("Package")]
        public int PackageId { get; set; }

        public virtual Package Package { get; set; }

        public DateTime? RequiredPickUpTime { get; set; }

        public DateTime? FinalPickUpTime { get; set; }

        public DateTime? FinalDeliveryTime { get; set; }
        
        public string StartLatLng { get; set; }

        public string DestinationCity { get; set; }
        
        public string DestinationAddress { get; set; }

        public int Priority { get; set; }

        public string TraceJSON { get; set; }

        public string EndLatLng { get; set; }

        public int? DistanceMeters { get; set; }

        public int? ExpectedMinutes { get; set; }

        public int? FinalMinutes { get; set; }
    }
}