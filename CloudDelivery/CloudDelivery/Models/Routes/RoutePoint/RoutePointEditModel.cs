using CloudDelivery.Data.Enums.Routes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models.Routes
{
    public class RoutePointEditModel
    {
        [RegularExpression("([1-9][0-9]*)")]
        public int OrderId { get; set; }

        [RegularExpression("([0-9]+)")]
        public int Index { get; set; }

        [Required]
        public RoutePointType Type { get; set; }
    }
}