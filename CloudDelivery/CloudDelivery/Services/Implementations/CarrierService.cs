using CloudDelivery.Data;
using CloudDelivery.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CloudDelivery.Data.Entities;

namespace CloudDelivery.Services.Implementations
{
    public class CarrierService : ICarrierService
    {

        public CarrierService(ICacheProvider cacheProvider, ICDContextFactory ctxFactory)
        {
            this.cacheProvider = cacheProvider;
            this.ctxFactory = ctxFactory;
        }

        public int SetCarrier(int userId)
        {

            throw new NotImplementedException();

            using (var ctx = ctxFactory.GetContext())
            {

            }
        }

        public void SetColor(int userId)
        {
            using (var ctx = ctxFactory.GetContext())
            {

            }
        }

        public int RemoveCarrier(int userId)
        {
            throw new NotImplementedException();
        }

        public Carrier GetCarrier(int userId)
        {
            throw new NotImplementedException();
        }

        public List<Carrier> GetCarriers()
        {
            throw new NotImplementedException();
        }

        private ICacheProvider cacheProvider;
        private ICDContextFactory ctxFactory;

    }
}