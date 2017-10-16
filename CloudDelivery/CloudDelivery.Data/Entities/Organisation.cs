using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CloudDelivery.Data.Entities
{
    [Table("Organisations")]
    public class Organisation : BaseModel<int>
    {
        public string Name { get; set; }

        public virtual ICollection<User> Members { get; set; }
    }
}