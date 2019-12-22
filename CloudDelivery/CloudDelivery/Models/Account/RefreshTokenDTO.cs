using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models.Account
{
    public class RefreshTokenDTO
    {
        public int Id { get; set; }
        public string Device { get; set; }
        public DateTime Issued { get; set; }
    }
}