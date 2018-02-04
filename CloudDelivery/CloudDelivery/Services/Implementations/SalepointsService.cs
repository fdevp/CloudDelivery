using CloudDelivery.Data;
using CloudDelivery.Data.Entities;
using CloudDelivery.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Web;

namespace CloudDelivery.Services
{
    public class SalepointsService : ISalepointsService
    {
        public SalepointsService(ICacheProvider cacheProvider, ICDContextFactory ctxFactory)
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

                sp.Marker = color;

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
                if (!ctx.UserData.Any(x => x.Id == userId))
                    throw new NullReferenceException("Użytkownik nie istnieje.");

                if (ctx.SalePoints.Any(x => x.UserId == userId))
                    throw new ArgumentException("Punkt sprzedaży już istnieje");

                SalePoint newSalepoint = new SalePoint() { UserId = userId };
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

        public SalePoint GetSalePoint(int userId)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                SalePoint sp = ctx.SalePoints
                                  .Include(x=>x.User)
                                  .Where(x => x.UserId == userId).FirstOrDefault();

                if (sp == null)
                    throw new NullReferenceException("Użytkownik nie ma przypisanego punktu sprzedaży.");


                return sp;
            }
        }

        public SalePoint GetSalePointById(int id)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                SalePoint sp = ctx.SalePoints
                                  .Include(x => x.User)
                                  .Where(x => x.Id == id).FirstOrDefault();

                if (sp == null)
                    throw new NullReferenceException("Nie znaleziono punktu sprzedaży.");

                return sp;
            }
        }


        public List<SalePoint> GetSalePoints()
        {
            using(var ctx = ctxFactory.GetContext())
            {
                var sps = ctx.SalePoints
                             .Include(x => x.User)
                             .ToList();

                return sps;
            }
        }

        public List<SalePoint> GetOrganisationSalePoints(int organisationId)
        {
            using(var ctx= ctxFactory.GetContext())
            {
                if (!ctx.Organisations.Any(x => x.Id == organisationId))
                    throw new NullReferenceException("Nie znaleziono organizacji.");


                var sps = ctx.SalePoints
                             .Include(x => x.User)
                             .Where(x=> x.User!= null && x.User.OrganisationId == organisationId)
                             .ToList();

                return sps;
            }
        }

        private ICacheProvider cacheProvider;
        private ICDContextFactory ctxFactory;
    }
}