using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CloudDelivery.Data.Entities
{
    [Table("dbo.Users")]
    public class User : BaseModel<int>
    {
        [ForeignKey("AspNetUser")]
        public string IdentityId { get; set; }

        public virtual ApplicationUser AspNetUser { get; set; }

        [ForeignKey("Organisation")]
        public int? OrganisationId { get; set; }

        public virtual Organisation Organisation { get; set; }

        public string Description { get; set; }

    }
}