﻿using CloudDelivery.Data.Entities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Common;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace CloudDelivery.Data
{

    public class ApplicationUser : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class CDContext : IdentityDbContext<ApplicationUser>, ICDContext
    {
        #region init
        public CDContext()
            : base("name=DefaultConnection")
        {
        }

        public CDContext(string connectionName) : base(connectionName)
        {

        }

        public CDContext(DbConnection conn)
            : base(conn, true)
        {

        }

        public static CDContext Create()
        {
            return new CDContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ApplicationUser>().ToTable("AspNetUsers").Property(p => p.Id);
            modelBuilder.Entity<IdentityUserLogin>().ToTable("AspNetUserLogins");
            modelBuilder.Entity<IdentityUserRole>().ToTable("AspNetUserRoles");
            modelBuilder.Entity<IdentityUserClaim>().ToTable("AspNetUserClaims").Property(p => p.Id);
        }

        #endregion

        public virtual DbSet<User> UserData { get; set; }
        public virtual DbSet<Organisation> Organisations { get; set; }
        public virtual DbSet<SalePoint> SalePoints { get; set; }
        public virtual DbSet<Carrier> Carriers { get; set; }
        public virtual DbSet<Log> Logs { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<Package> Packages { get; set; }
        public virtual DbSet<IdentityUserRole> UserRoles { get; set; }
    }
}