using CloudDelivery.Data.Entities;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudDelivery.Data
{
    public interface ICDContext : IDisposable
    {
        DbSet<User> UserData { get; set; }
        DbSet<Organisation> Organisations { get; set; }
        DbSet<SalePoint> SalePoints { get; set; }
        DbSet<Carrier> Carriers { get; set; }
        DbSet<Log> Logs { get; set; }
        DbSet<Order> Orders { get; set; }
        DbSet<Package> Packages { get; set; }
        DbSet<IdentityUserRole> UserRoles { get; set; }
        IDbSet<IdentityRole> Roles { get; set; }
        IDbSet<ApplicationUser> Users { get; set; }

        int SaveChanges();
    }
}
