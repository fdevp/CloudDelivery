using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models.Orders
{
    public class ApproximateTrace
    {
        public TraceProperties CarrierToSalePoint { get; set; } = new TraceProperties();

        public TraceProperties SalePointToEndpoint { get; set; } = new TraceProperties();
    }
}