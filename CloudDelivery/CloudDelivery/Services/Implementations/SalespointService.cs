using CloudDelivery.Data;
using CloudDelivery.Data.Entities;
using CloudDelivery.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Services.Implementations
{
    public class SalespointService : ISalepointsService
    {
        public SalespointService(ICacheProvider cacheProvider, ICDContextFactory ctxFactory)
        {
            this.cacheProvider = cacheProvider;
            this.ctxFactory = ctxFactory;
        }

        public void SetAddress(int userId, string address)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                SalePoint sp = ctx.SalePoints.Where(x => x.UserId == userId).FirstOrDefault();

                if (sp == null)
                    throw new NullReferenceException("Nie znaleziono punktu sprzedaży");

                sp.Address = address;

                ctx.SaveChanges();
            }
        }

        public void SetCity(int userId, string city)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                SalePoint sp = ctx.SalePoints.Where(x => x.UserId == userId).FirstOrDefault();

                if (sp == null)
                    throw new NullReferenceException("Nie znaleziono punktu sprzedaży");

                sp.City = city;

                ctx.SaveChanges();
            }
        }

        public void SetColor(int userId, string color)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                SalePoint sp = ctx.SalePoints.Where(x => x.UserId == userId).FirstOrDefault();

                if (sp == null)
                    throw new NullReferenceException("Nie znaleziono punktu sprzedaży");

                sp.Color = color;

                ctx.SaveChanges();
            }
        }

        public void SetLatLng(int userId, string latlng)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                SalePoint sp = ctx.SalePoints.Where(x => x.UserId == userId).FirstOrDefault();

                if (sp == null)
                    throw new NullReferenceException("Nie znaleziono punktu sprzedaży");

                sp.LatLng = latlng;
                ctx.SaveChanges();
            }
        }

        public int SetSalepoint(int userId)
        {
            using (var ctx = ctxFactory.GetContext())
            {

                SalePoint sp = ctx.SalePoints.Where(x => x.UserId == userId).FirstOrDefault();
                if (sp != null)
                    throw new NullReferenceException("Punkt sprzedaży już istnieje");


                Carrier carrier = ctx.Carriers.Where(x => x.UserId == userId).FirstOrDefault();
                if (carrier != null)
                    ctx.Carriers.Remove(carrier);


                SalePoint newSalepoint = new SalePoint() { UserId = userId};
                ctx.SalePoints.Add(newSalepoint);
                ctx.SaveChanges();

                return newSalepoint.Id;
            }
        }

        public void RemoveSalepoint(int userId)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                SalePoint sp = ctx.SalePoints.Where(x => x.UserId == userId).FirstOrDefault();

                if (sp == null)
                    throw new NullReferenceException("Nie znaleziono punktu sprzedaży");

                ctx.SalePoints.Remove(sp);
                ctx.SaveChanges();
            }
        }

        public SalePoint GetSalePoint(int id)
        {
            throw new NotImplementedException();
        }

        public List<SalePoint> GetSalePoints()
        {
            throw new NotImplementedException();
        }

        public List<SalePoint> GetOrganisationSalePoints(int organisationId)
        {
            throw new NotImplementedException();
        }

        private ICacheProvider cacheProvider;
        private ICDContextFactory ctxFactory;
    }
}