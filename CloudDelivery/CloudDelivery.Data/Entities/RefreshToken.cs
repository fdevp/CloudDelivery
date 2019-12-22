using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CloudDelivery.Data.Entities
{
    [Table("RefreshTokens")]
    public class RefreshToken : BaseModel<int>
    {
        [ForeignKey("AspNetUser")]
        public string IdentityId { get; set; }

        public virtual ExtendedIdentityUser AspNetUser { get; set; }

        public virtual User User { get; set; }

        public string Token { get; set; }

        public bool Active { get; set; }

        public string Device { get; set; }

        public DateTime Issued { get; set; }
    }
}