using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Data
{
    public class CDContextFactory : ICDContextFactory
    {
        public ICDContext GetContext()
        {
            return new CDContext();
        }
    }
}