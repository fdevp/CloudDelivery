using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CloudDelivery.Data.Entities
{
    [Table("Logs")]
    public class Log : BaseModel<int>
    {
        public string Message { get; set; }
    }
}