using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CloudDelivery.Data.Entities;
using FizzWare.NBuilder;
using CloudDelivery.Data;
using Moq;
using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace CloudDelivery.Tests.Initialize
{
    public class DatabaseMocksFactory
    {
        public static Mock<ICDContextFactory> GetCtxFactoryMock()
        {
            var ctxFactoryMock = new Mock<ICDContextFactory>();
            var ctxMock = GetContextMock();
            ctxFactoryMock.Setup(x => x.GetContext()).Returns(ctxMock.Object);
            return ctxFactoryMock;
        }

        public static Mock<ICDContext> GetContextMock()
        {
            var ctxMock = new Mock<ICDContext>();

            //users
            ctxMock.Setup(x => x.Users).Returns(GetDbSetMock<ApplicationUser>(10).Object);
            ctxMock.Setup(x => x.UserData).Returns(GetDbSetMock<User>(10).Object);

            //roles
            ctxMock.Setup(x => x.Roles).Returns(GetDbSetMock<IdentityRole>(10).Object);
            ctxMock.Setup(x => x.UserRoles).Returns(GetDbSetMock<IdentityUserRole>(10).Object);

            //organisations
            var organisations = Builder<Organisation>.CreateListOfSize(10).All().With(x => x.Members = new List<User>()).Build();
            ctxMock.Setup(x => x.Organisations).Returns(GetDbSetMock<Organisation>(10, organisations).Object);

            return ctxMock;
        }

        private static Mock<DbSet<T>> GetDbSetMock<T>(int size, IList<T> items = null) where T : class
        {
            if (items == null)
                items = Builder<T>.CreateListOfSize(size).Build();

            var itemsQ = items.AsQueryable();

            var dbSetMock = new Mock<DbSet<T>>();
            var q = dbSetMock.As<IQueryable<T>>();

            q.Setup(m => m.Provider).Returns(itemsQ.Provider);
            q.Setup(m => m.Expression).Returns(itemsQ.Expression);
            q.Setup(m => m.ElementType).Returns(itemsQ.ElementType);
            q.Setup(m => m.GetEnumerator()).Returns(() => itemsQ.GetEnumerator());
            dbSetMock.Setup(m => m.Add(It.IsAny<T>())).Callback<T>(items.Add);
            dbSetMock.Setup(m => m.Remove(It.IsAny<T>())).Callback<T>(i => items.Remove(i));
            dbSetMock.Setup(m=> m.Include(It.IsAny<string>())).Returns(()=> dbSetMock.Object);
            return dbSetMock;
        }



    }
}
