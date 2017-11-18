﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Web;
using CloudDelivery.Data.Entities;
using CloudDelivery.Providers;
using CloudDelivery.Data;

namespace CloudDelivery.Services
{
    public class OrganisationsService : IOrganisationsService
    {
        public OrganisationsService(ICacheProvider cacheProvider, ICDContextFactory ctxFactory)
        {
            this.cacheProvider = cacheProvider;
            this.ctxFactory = ctxFactory;
        }

        public int AddOrganisation(string name)
        {
            Organisation newOrganisation = new Organisation { Name = name };

            using (var ctx = this.ctxFactory.GetContext())
            {
                ctx.Organisations.Add(newOrganisation);
                ctx.SaveChanges();
            }
            return newOrganisation.Id;
        }

        public Organisation GetUserOrganisation(int userId)
        {
            using (var ctx = this.ctxFactory.GetContext())
            {
                var user = ctx.UserData.Where(x => x.Id == userId).FirstOrDefault();

                if (user == null)
                    throw new NullReferenceException("Nie znaleziono użytkownika.");

                if (user.OrganisationId == null)
                    throw new NullReferenceException("Użytkownik nie jest przypisany do organizacji.");

                return ctx.Organisations.Where(x=>x.Id == user.OrganisationId).FirstOrDefault();
            }
        }

        public List<Organisation> GetOrganisationsList()
        {
            using (var ctx = this.ctxFactory.GetContext())
            {
                return ctx.Organisations.ToList();
            }
        }

        public List<User> GetMembersList(int organisationId)
        {
            using (var ctx = this.ctxFactory.GetContext())
            {
                var organisation = ctx.Organisations.Where(x => x.Id == organisationId).FirstOrDefault();

                if (organisation == null)
                    throw new NullReferenceException("Nie znaleziono organizacji");

                return ctx.UserData
                          .Include(x => x.AspNetUser)
                          .Include(x => x.AspNetUser.Roles)
                          .Include(x => x.Organisation)
                          .Where(x=>x.OrganisationId == organisationId)
                          .ToList();
            }
        }

        public void RemoveMember(int userId)
        {
            using (var ctx = this.ctxFactory.GetContext())
            {
                var user = ctx.UserData.Where(x => x.Id == userId).FirstOrDefault();

                if (user == null)
                    throw new NullReferenceException("Nie znaleziono użytkownika.");

                if (user.OrganisationId == null)
                    throw new NullReferenceException("Użytkownik nie jest przypisany do organizacji.");

                user.OrganisationId = null;

                ctx.SaveChanges();
            }
        }

        public void RemoveOrganisation(int id)
        {

            using (var ctx = this.ctxFactory.GetContext())
            {
                var organisation = ctx.Organisations.Where(x => x.Id == id).FirstOrDefault();

                if (organisation == null)
                    throw new NullReferenceException("Nie znaleziono organizacji");

                //remove organisationId from users belongs to organisation
                ctx.UserData.Where(x=>x.OrganisationId == id).ToList().ForEach(x =>
                {
                    RemoveMember(x.Id);
                });

                ctx.Organisations.Remove(organisation);

                ctx.SaveChanges();
            }
        }


        private ICacheProvider cacheProvider;

        private ICDContextFactory ctxFactory;
    }
}