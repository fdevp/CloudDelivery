using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace CloudDelivery.Data.Entities
{
    public class BaseModel<T>
    {
        [Key]
        public T Id { get; set; }
    }

}