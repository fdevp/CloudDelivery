using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CloudDelivery.Data.Entities;
using FizzWare.NBuilder;
using FizzWare.NBuilder.PropertyNaming;
using CloudDelivery.Data;
using Moq;
using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace CloudDelivery.Tests.Initialize
{
    public class DatabaseMocksFactory
    {
        public static readonly int UsersCount = 40;
        public static readonly int RolesCount = 5;
        public static readonly int OrganisationsCount = 5;
        public static readonly int SalePointsCount = 20;
        public static readonly int CarriersCount = 5;
        public static readonly int PackagesCount = 5;
        public static readonly int OrdersCount = 100;


        public static Mock<ICDContextFactory> GetCtxFactoryMock()
        {
            var ctxFactoryMock = new Mock<ICDContextFactory>();
            Mock<ICDContext> ctxMock = GetContextMock();
            ctxFactoryMock.Setup(x => x.GetContext()).Returns(ctxMock.Object);
            return ctxFactoryMock;
        }

        public static Mock<ICDContext> GetContextMock()
        {
            var ctxMock = new Mock<ICDContext>();
            //organisations
            IList<Organisation> organisationsData = Builder<Organisation>.CreateListOfSize(OrganisationsCount).All().Build();
            ctxMock.Setup(x => x.Organisations).Returns(GetDbSetMock<Organisation>(organisationsData).Object);

            //users
            IList<ApplicationUser> identityUsersData = Builder<ApplicationUser>.CreateListOfSize(UsersCount).All().Build();
            ctxMock.Setup(x => x.Users).Returns(GetDbSetMock<ApplicationUser>(identityUsersData).Object);

            IList<User> usersData = Builder<User>.CreateListOfSize(UsersCount).All()
                                         .With(x => x.OrganisationId = x.Id % OrganisationsCount + 1)
                                         .Build();
            foreach (User user in usersData)
            {
                user.Organisation = organisationsData.Where(x => x.Id == user.OrganisationId).FirstOrDefault();
            }
            ctxMock.Setup(x => x.UserData).Returns(GetDbSetMock<User>(usersData).Object);

            //roles
            IList<IdentityRole> rolesData = Builder<IdentityRole>.CreateListOfSize(RolesCount).All().Build();
            ctxMock.Setup(x => x.Roles).Returns(GetDbSetMock<IdentityRole>(rolesData).Object);

            IList<IdentityUserRole> userRolesData = Builder<IdentityUserRole>.CreateListOfSize(RolesCount).All().Build();
            ctxMock.Setup(x => x.UserRoles).Returns(GetDbSetMock<IdentityUserRole>(userRolesData).Object);



            //salespoints
            IList<SalePoint> salePointsData = Builder<SalePoint>.CreateListOfSize(SalePointsCount).All().Build();
            foreach (SalePoint SalePoint in salePointsData)
            {
                SalePoint.User = usersData.Where(x => x.Id == SalePoint.UserId).FirstOrDefault();
            }
            ctxMock.Setup(x => x.SalePoints).Returns(GetDbSetMock<SalePoint>(salePointsData).Object);


            //carriers
            IList<Carrier> carriersData = Builder<Carrier>.CreateListOfSize(CarriersCount).All()
                                    .With(x => x.UserId = x.UserId + SalePointsCount)
                                    .Build();
            foreach (Carrier carrier in carriersData)
            {
                carrier.User = usersData.Where(x => x.Id == carrier.UserId).FirstOrDefault();
            }
            ctxMock.Setup(x => x.Carriers).Returns(GetDbSetMock<Carrier>(carriersData).Object);


            //packages
            IList<Package> packagesData = Builder<Package>.CreateListOfSize(PackagesCount).All().Build();
            ctxMock.Setup(x => x.Packages).Returns(GetDbSetMock<Package>(packagesData).Object);

            SetupOrders(ctxMock, salePointsData, carriersData, packagesData);

            return ctxMock;
        }

        private static void SetupOrders(Mock<ICDContext> mock, IList<SalePoint> salePointsData, IList<Carrier> carriersData, IList<Package> packagesData)
        {
            //orders
            IList<Order> ordersData = Builder<Order>.CreateListOfSize(OrdersCount).All()
                                   .With(x => x.SalePointId = x.SalePointId % SalePointsCount + 1)
                                   .With(x => x.CarrierId = x.CarrierId % CarriersCount + 1)
                                   .With(x => x.PackageId = x.PackageId % PackagesCount + 1)
                                   .With(x => x.Priority = x.Priority % 10)
                                   .With(x => x.DistanceMeters = 100 + (x.DistanceMeters % 30) * 100)
                                   .With(x => x.FinalMinutes = x.FinalMinutes % 30)
                                   .With(x => x.AddedTime = x.AddedTime.Value.AddHours(x.Id % 30))
                                   .With(x => x.DeliveredTime = x.AddedTime.Value.AddMinutes((x.Id % 30) + 5))
                                   .With(x => x.AcceptedTime = null)
                                   .With(x => x.CancellationTime = null)
                                   .With(x => x.PickUpTime = null)
                                   .With(x => x.RequiredPickUpTime = null)
                                   .Build();
            foreach (Order order in ordersData)
            {
                order.SalePoint = salePointsData.Where(x => x.Id == order.SalePointId).FirstOrDefault();
                order.Carrier = carriersData.Where(x => x.Id == order.CarrierId).FirstOrDefault();
                order.Package = packagesData.Where(x => x.Id == order.PackageId).FirstOrDefault();
            }

            //order trace tests

            ordersData[2].EndLatLng = @"{'lat':'51.766664','lng':'19.478922'}";
            ordersData[2].SalePoint.LatLng = @"{'lat':'52.227799','lng':'20.985093'}";

            //order distance time tests
            ordersData[1].EndLatLng = @"{'lat':'52.227799','lng':'20.985093'}";
            ordersData[1].SalePoint.LatLng = @"{'lat':'51.766664','lng':'19.478922'}";

            ordersData[0].Carrier = null;
            ordersData[0].CarrierId = null;

            mock.Setup(x => x.Orders).Returns(GetDbSetMock<Order>(ordersData).Object);
        }


        private static Mock<DbSet<T>> GetDbSetMock<T>(IList<T> items) where T : class
        {
            IQueryable<T> itemsQ = items.AsQueryable();
            var dbSetMock = new Mock<DbSet<T>>();
            Mock<IQueryable<T>> q = dbSetMock.As<IQueryable<T>>();

            q.Setup(m => m.Provider).Returns(itemsQ.Provider);
            q.Setup(m => m.Expression).Returns(itemsQ.Expression);
            q.Setup(m => m.ElementType).Returns(itemsQ.ElementType);
            q.Setup(m => m.GetEnumerator()).Returns(() => itemsQ.GetEnumerator());
            dbSetMock.Setup(m => m.Add(It.IsAny<T>())).Callback<T>(items.Add);
            dbSetMock.Setup(m => m.Remove(It.IsAny<T>())).Callback<T>(i => items.Remove(i));
            dbSetMock.Setup(m => m.Include(It.IsAny<string>())).Returns(() => dbSetMock.Object);
            return dbSetMock;
        }
    }
}
