using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Data.Enums
{
    public enum OrderStatus : int
    {
        Cancelled=0,
        Added,
        Accepted,
        InDelivery,
        Delivered
    }
}