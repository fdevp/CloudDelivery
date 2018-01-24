using CloudDelivery.Data;
using CloudDelivery.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;
using CloudDelivery.Data.Entities;

namespace CloudDelivery.Services
{
    public class UsersService : IUsersService
    {
        public UsersService(ICacheProvider cacheProvider, ICDContextFactory ctxFactory)
        {
            this.cacheProvider = cacheProvider;
            this.ctxFactory = ctxFactory;
        }

        public int AddUser(string identityId, string name, int? organisationId)
        {
            User newUser = new User { IdentityId = identityId, Name = name, OrganisationId = organisationId };

            using (var ctx = ctxFactory.GetContext())
            {
                ctx.UserData.Add(newUser);
                ctx.SaveChanges();
            }

            return newUser.Id;
        }

        public void RemoveUser(int id)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                User userToRemove = ctx.UserData.Where(x => x.Id == id).FirstOrDefault();

                if (userToRemove == null)
                    throw new NullReferenceException("Nie znaleziono użytkownika");


                //remove user roles
                ctx.UserRoles.Where(x => x.UserId == userToRemove.IdentityId)
                             .ToList()
                             .ForEach(x => ctx.UserRoles.Remove(x));

                //remove identity data
                var ApplicationUser = ctx.Users
                                         .Where(x => x.Id == userToRemove.IdentityId)
                                         .FirstOrDefault();

                ctx.Users.Remove(ApplicationUser);

                //remove user
                ctx.UserData.Remove(userToRemove);

                ctx.SaveChanges();

            }
        }

        public List<User> GetUsersList()
        {

            using (var ctx = ctxFactory.GetContext())
            {
                var usrs = ctx.UserData
                             .Include(x => x.AspNetUser)
                             .Include(x => x.AspNetUser.Roles)
                             .Include(x => x.Organisation)
                             .ToList();
                return usrs;
            }

        }

        public List<IdentityRole> GetRolesList()
        {

            using (var ctx = ctxFactory.GetContext())
            {
                return ctx.Roles.ToList();
            }
        }

        public List<IdentityUserRole> GetUserRoles(int id)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                string identityId = ctx.UserData
                                       .Where(x => x.Id == id)
                                       .FirstOrDefault()?
                                       .IdentityId;

                if (string.IsNullOrEmpty(identityId))
                    throw new NullReferenceException("Nie znaleziono użytkownika");

                return ctx.UserRoles
                          .Where(x => x.UserId == identityId)
                          .ToList();
            }
        }

        public string GetUserRolesString(int id)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                var user = ctx.UserData.Where(x => x.Id == id).FirstOrDefault();

                if (user == null)
                    throw new NullReferenceException("Nie znaleziono użytkownika");

                var userRoles = ctx.UserRoles.Where(x => x.UserId == user.IdentityId).ToList();

                if (userRoles.Count == 0)
                    throw new NullReferenceException("Użytkownik nie ma przypisanych ról");

                var roles = GetRolesList();

                List<string> userRolesString = roles.Where(x => userRoles.Any(y => y.RoleId == x.Id)).Select(x => x.Name).ToList();
                if (userRolesString.Count == 1)
                    return userRolesString.FirstOrDefault();

                return string.Join(", ", userRolesString);
            }
        }

        public User GetUser(int id)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                var user = ctx.UserData
                              .Include(x => x.AspNetUser)
                              .Include(x => x.AspNetUser.Roles)
                              .Include(x => x.Organisation)
                              .Where(x => x.Id == id)
                              .FirstOrDefault();
                if (user == null)
                    throw new NullReferenceException("Nie znaleziono użytkownika");

                return user;
            }
        }

        public User GetUser(string identityId)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                var user = ctx.UserData
                              .Include(x => x.AspNetUser)
                              .Include(x => x.AspNetUser.Roles)
                              .Include(x => x.Organisation)
                              .Where(x => x.IdentityId == identityId)
                              .FirstOrDefault();
                if (user == null)
                    throw new NullReferenceException("Nie znaleziono użytkownika");

                return user;
            }
        }

        public void SetSingleRole(int id, string roleId)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                var user = ctx.UserData.Where(x => x.Id == id).FirstOrDefault();

                if (user == null)
                    throw new NullReferenceException("Nie znaleziono użytkownika");

                if (!ctx.Roles.Any(x => x.Id == roleId))
                    throw new NullReferenceException("Nie znaleziono roli");

                //clear current roles
                ctx.UserRoles.Where(x => x.UserId == user.IdentityId).ToList().ForEach(x => ctx.UserRoles.Remove(x));

                //add new role
                ctx.UserRoles.Add(new IdentityUserRole { RoleId = roleId, UserId = user.IdentityId });

                ctx.SaveChanges();
            }
        }


        public void SetOrganisation(int id, int? organisationId)
        {
            using (var ctx = this.ctxFactory.GetContext())
            {
                var user = ctx.UserData.Where(x => x.Id == id).FirstOrDefault();

                if (user == null)
                    throw new NullReferenceException("Nie znaleziono użytkownika");

                if (organisationId != null && !ctx.Organisations.Any(x => x.Id == organisationId))
                    throw new NullReferenceException("Nie znaleziono organizacji");

                user.OrganisationId = organisationId;
                ctx.SaveChanges();
            }
        }


        public void SetName(int id, string name)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                var user = ctx.UserData.Where(x => x.Id == id).FirstOrDefault();

                if (user == null)
                    throw new NullReferenceException("Nie znaleziono użytkownika");

                user.Name = name;

                ctx.SaveChanges();
            }
        }

        public void SetPhone(int id, string phone)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                var user = ctx.UserData.Include(x => x.AspNetUser).Where(x => x.Id == id).FirstOrDefault();

                if (user == null)
                    throw new NullReferenceException("Nie znaleziono użytkownika");

                user.AspNetUser.PhoneNumber = phone;

                ctx.SaveChanges();
            }
        }


        public void SetDescription(int id, string description)
        {
            using (var ctx = ctxFactory.GetContext())
            {
                var user = ctx.UserData.Include(x => x.AspNetUser).Where(x => x.Id == id).FirstOrDefault();

                if (user == null)
                    throw new NullReferenceException("Nie znaleziono użytkownika");

                user.Description = description;

                ctx.SaveChanges();
            }
        }


        private ICacheProvider cacheProvider;
        private ICDContextFactory ctxFactory;
    }
}