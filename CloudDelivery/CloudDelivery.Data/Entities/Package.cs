using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CloudDelivery.Data.Entities
{
    [Table("Packages")]
    public class Package : BaseModel<int>
    {
        public string Sizes { get; set; }

        public string Weight { get; set; }
    }
}