using CloudDelivery.Data;
using CloudDelivery.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CloudDelivery.Data.Entities;
using System.Data.Entity;

namespace CloudDelivery.Services
{
    public class CarriersService : ICarriersService
    {

        public CarriersService(ICacheProvider cacheProvider, ICDContextFactory ctxFactory)
        {
            this.cacheProvider = cacheProvider;
            this.ctxFactory = ctxFactory;
        }

        public int SetCarrier(int userId)
        {

            using (ICDContext ctx = ctxFactory.GetContext())
            {
                if (!ctx.AppUsers.Any(x => x.Id == userId))
                    throw new NullReferenceException("Użytkownik nie istnieje.");

                if (ctx.Carriers.Any(x => x.UserId == userId))
                    throw new ArgumentException("Dostawca już istnieje");

                Carrier newCarrier = new Carrier() { UserId = userId };
                ctx.Carriers.Add(newCarrier);
                ctx.SaveChanges();

                return newCarrier.Id;
            }
        }

        public void SetColor(int userId, string color)
        {
            using (ICDContext ctx = ctxFactory.GetContext())
            {
                Carrier carrier = ctx.Carriers.Where(x => x.UserId == userId).FirstOrDefault();

                if (carrier == null)
                    throw new NullReferenceException("Nie znaleziono dostawcy");

                carrier.Marker = color;
                ctx.SaveChanges();
            }
        }

        public void RemoveCarrier(int userId)
        {
            using (ICDContext ctx = ctxFactory.GetContext())
            {
                Carrier carrier = ctx.Carriers.Where(x => x.UserId == userId).FirstOrDefault();

                if (carrier == null)
                    throw new NullReferenceException("Nie znaleziono dostawcy");

                ctx.Carriers.Remove(carrier);
                ctx.SaveChanges();
            }
        }

        public Carrier GetCarrier(int userId)
        {
            using (ICDContext ctx = ctxFactory.GetContext())
            {
                Carrier carrier = ctx.Carriers
                     .Include(x => x.User)
                     .Where(x => x.UserId == userId).FirstOrDefault();

                if (carrier == null)
                    throw new NullReferenceException("Nie znaleziono dostawcy.");

                return carrier;
            }
        }

        public List<Carrier> GetCarriers()
        {
            using (ICDContext ctx = ctxFactory.GetContext())
            {
                List<Carrier> carriers = ctx.Carriers
                             .Include(x => x.User)
                             .ToList();

                return carriers;
            }
        }

        public Carrier GetCarrierById(int id)
        {
            using (ICDContext ctx = ctxFactory.GetContext())
            {
                Carrier carrier = ctx.Carriers
                     .Include(x => x.User)
                     .Where(x => x.Id == id).FirstOrDefault();

                if (carrier == null)
                    throw new NullReferenceException("Nie znaleziono dostawcy.");

                return carrier;
            }
        }

    

        private ICacheProvider cacheProvider;
        private ICDContextFactory ctxFactory;

    }
}