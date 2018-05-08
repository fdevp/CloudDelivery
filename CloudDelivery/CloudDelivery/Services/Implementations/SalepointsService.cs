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
    public class SalePointsService : ISalePointsService
    {
        private ICacheProvider cacheProvider;
        private ICDContextFactory ctxFactory;

        public SalePointsService(ICacheProvider cacheProvider, ICDContextFactory ctxFactory)
        {
            this.cacheProvider = cacheProvider;
            this.ctxFactory = ctxFactory;
        }

        public void SetAddress(int userId, string address)
        {
            using (ICDContext ctx = ctxFactory.GetContext())
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
            using (ICDContext ctx = ctxFactory.GetContext())
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
            using (ICDContext ctx = ctxFactory.GetContext())
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
            using (ICDContext ctx = ctxFactory.GetContext())
            {
                SalePoint sp = ctx.SalePoints.Where(x => x.UserId == userId).FirstOrDefault();

                if (sp == null)
                    throw new NullReferenceException("Nie znaleziono punktu sprzedaży");

                sp.LatLng = latlng;
                ctx.SaveChanges();
            }
        }

        public int SetSalePoint(int userId)
        {
            using (ICDContext ctx = ctxFactory.GetContext())
            {
                if (!ctx.AppUsers.Any(x => x.Id == userId))
                    throw new NullReferenceException("Użytkownik nie istnieje.");

                if (ctx.SalePoints.Any(x => x.UserId == userId))
                    throw new ArgumentException("Punkt sprzedaży już istnieje");

                SalePoint newSalePoint = new SalePoint() { UserId = userId };
                ctx.SalePoints.Add(newSalePoint);
                ctx.SaveChanges();

                return newSalePoint.Id;
            }
        }

        public void RemoveSalePoint(int userId)
        {
            using (ICDContext ctx = ctxFactory.GetContext())
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
            using (ICDContext ctx = ctxFactory.GetContext())
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
            using (ICDContext ctx = ctxFactory.GetContext())
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
            using(ICDContext ctx = ctxFactory.GetContext())
            {
                List<SalePoint> sps = ctx.SalePoints
                                        .Include(x => x.User)
                                        .ToList();

                return sps;
            }
        }

        public List<SalePoint> GetOrganisationSalePoints(int organisationId)
        {
            using(ICDContext ctx= ctxFactory.GetContext())
            {
                if (!ctx.Organisations.Any(x => x.Id == organisationId))
                    throw new NullReferenceException("Nie znaleziono organizacji.");


                List<SalePoint> sps = ctx.SalePoints
                                        .Include(x => x.User)
                                        .Where(x=> x.User!= null && x.User.OrganisationId == organisationId)
                                        .ToList();

                return sps;
            }
        }

        
    }
}