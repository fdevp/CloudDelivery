using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models.Orders
{
    public class OrderTrace
    {
        public TraceProperties properties { get; set; } = new TraceProperties();

        public string TraceJSON { get; set; }
    }
}