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
using CloudDelivery.Data.Enums.Routes;
using CloudDelivery.Data.Enums;

namespace CloudDelivery.Tests.Initialize
{
    public class DatabaseMocksFactory
    {
        public static readonly int usersCount = 40;
        public static readonly int rolesCount = 5;
        public static readonly int organisationsCount = 5;
        public static readonly int salePointsCount = 20;
        public static readonly int carriersCount = 5;
        public static readonly int packagesCount = 5;
        public static readonly int ordersCount = 100;
        public static readonly int routesCount = 10;

        public static readonly int routesOrdersStartId = 1000;


        private static IList<Organisation> organisationsData;

        private static IList<ExtendedIdentityUser> identityUsersData;
        private static IList<User> usersData;
        private static IList<IdentityRole> rolesData;
        private static IList<IdentityUserRole> userRolesData;

        private static IList<SalePoint> salePointsData;

        private static IList<Carrier> carriersData;

        private static IList<Package> packagesData;

        private static IList<Order> ordersData;

        private static IList<Route> routesData;
        private static IList<RoutePoint> routePointsData;


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

            SetupOrganisation();

            SetupUsers();

            SetupSalePoints();

            SetupCarriers();

            SetupPackages();

            SetupOrders();

            SetupRoutes();

            ctxMock.Setup(x => x.Organisations).Returns(DbSetMockBehaviour<Organisation>(organisationsData).Object);

            ctxMock.Setup(x => x.Users).Returns(DbSetMockBehaviour<ExtendedIdentityUser>(identityUsersData).Object);
            ctxMock.Setup(x => x.AppUsers).Returns(DbSetMockBehaviour<User>(usersData).Object);
            ctxMock.Setup(x => x.Roles).Returns(DbSetMockBehaviour<IdentityRole>(rolesData).Object);
            ctxMock.Setup(x => x.UserRoles).Returns(DbSetMockBehaviour<IdentityUserRole>(userRolesData).Object);

            ctxMock.Setup(x => x.SalePoints).Returns(DbSetMockBehaviour<SalePoint>(salePointsData).Object);

            ctxMock.Setup(x => x.Carriers).Returns(DbSetMockBehaviour<Carrier>(carriersData).Object);

            ctxMock.Setup(x => x.Packages).Returns(DbSetMockBehaviour<Package>(packagesData).Object);

            ctxMock.Setup(x => x.Orders).Returns(DbSetMockBehaviour<Order>(ordersData).Object);


            ctxMock.Setup(x => x.Routes).Returns(DbSetMockBehaviour<Route>(routesData).Object);
            ctxMock.Setup(x => x.RoutePoints).Returns(DbSetMockBehaviour<RoutePoint>(routePointsData).Object);

            return ctxMock;
        }

        private static void SetupOrganisation()
        {
            //organisations
            organisationsData = Builder<Organisation>.CreateListOfSize(organisationsCount).All().Build();

        }

        private static void SetupUsers()
        {
            //usersIdentity
            identityUsersData = Builder<ExtendedIdentityUser>.CreateListOfSize(usersCount).All().Build();

            //usersApp
            usersData = Builder<User>.CreateListOfSize(usersCount).All()
                                         .With(x => x.OrganisationId = x.Id % organisationsCount + 1)
                                         .With(x => x.IdentityId = identityUsersData[x.Id - 1].Id)
                                         .Build();
            foreach (User user in usersData)
            {
                user.Organisation = organisationsData.Where(x => x.Id == user.OrganisationId).FirstOrDefault();
                user.AspNetUser = identityUsersData.Where(x => x.Id == user.IdentityId).FirstOrDefault();
            }



            //roles
            rolesData = Builder<IdentityRole>.CreateListOfSize(rolesCount).All().Build();
            userRolesData = Builder<IdentityUserRole>.CreateListOfSize(rolesCount).All().Build();



        }

        private static void SetupSalePoints()
        {
            //salespoints
            salePointsData = Builder<SalePoint>.CreateListOfSize(salePointsCount).All().Build();
            foreach (SalePoint SalePoint in salePointsData)
            {
                SalePoint.User = usersData.Where(x => x.Id == SalePoint.UserId).FirstOrDefault();
            }

        }

        private static void SetupCarriers()
        {
            carriersData = Builder<Carrier>.CreateListOfSize(carriersCount).All()
                                    .With(x => x.UserId = x.UserId + salePointsCount)
                                    .Build();
            foreach (Carrier carrier in carriersData)
            {
                carrier.User = usersData.Where(x => x.Id == carrier.UserId).FirstOrDefault();
            }


        }

        private static void SetupPackages()
        {
            //packages
            packagesData = Builder<Package>.CreateListOfSize(packagesCount).All().Build();

        }

        private static void SetupOrders()
        {
            //orders
            ordersData = Builder<Order>.CreateListOfSize(ordersCount).All()
                                   .With(x => x.SalePointId = x.SalePointId % salePointsCount + 1)
                                   .With(x => x.CarrierId = x.CarrierId % carriersCount + 1)
                                   .With(x => x.PackageId = x.PackageId % packagesCount + 1)
                                   .With(x => x.Priority = x.Priority % 10)
                                   .With(x => x.Duration = x.Duration % 30)
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


        }

        private static void SetupRoutes()
        {
            //routes for all carriers except one
            routesData = Builder<Route>.CreateListOfSize(routesCount).All()
                                   .With(x => x.AddedTime = x.AddedTime.AddDays(x.Id % 30))
                                   .With(x => x.CarrierId = x.CarrierId % (carriersCount - 1) + 1)
                                   .With(x => x.Distance = x.Distance * 100)
                                   .With(x => x.FinishTime = x.Status == RouteStatus.Finished ? x.AddedTime.AddMinutes(x.Id % 120 + 30) : (DateTime?)null)
                                   .Build();

            routePointsData = new List<RoutePoint>();

            //routes points
            foreach (Route route in routesData)
            {
                int pointsCount = route.Id % 3 + 2;

                //set carrier
                route.Carrier = carriersData.Where(x => x.Id == route.CarrierId).FirstOrDefault();

                //create orders
                IList<Order> orders = Builder<Order>.CreateListOfSize(pointsCount).All()
                                           .With(x => x.Id += routesOrdersStartId)
                                           .With(x => x.CarrierId = route.CarrierId)
                                           .With(x => x.Status = OrderStatus.Accepted)
                                           .With(x => x.SalePointId = x.SalePointId % salePointsCount + 1)
                                           .Build();

                //set order objects
                foreach (Order order in orders)
                {
                    order.Carrier = route.Carrier;
                    order.SalePoint = salePointsData.Where(x => x.Id == order.SalePointId).FirstOrDefault();
                }



                IList<RoutePoint> points = Builder<RoutePoint>.CreateListOfSize(pointsCount).All()
                                           .With(x => x.OrderId += routesOrdersStartId)
                                           .With(x => x.RouteId = route.Id)
                                           .Build();

                //set points objects
                foreach (RoutePoint point in points)
                {
                    point.Order = orders.Where(x => x.Id == point.OrderId).FirstOrDefault();
                    point.Route = route;
                }

                route.Points = points;

                //add new objects to collections
                routePointsData = routePointsData.Concat(points).ToList();
                ordersData = ordersData.Concat(orders).ToList();
            }


            //carrier without active routes

            int carrierId = carriersData.Where(x => !routesData.Any(y => y.CarrierId == x.Id && y.Status == RouteStatus.Active)).FirstOrDefault().Id;
            int latestId = ordersData.Max(x => x.Id);
            IList<Order> newRouteOrders = Builder<Order>.CreateListOfSize(5).All()
                                                        .With(x => x.CarrierId = carrierId)
                                                        .With(x => x.Status = OrderStatus.Accepted)
                                                        .With(x => x.Id += latestId)
                                                        .With(x => x.SalePointId = x.SalePointId % salePointsCount + 1)
                                                        .With(x => x.SalePoint = salePointsData.Where(y => y.Id == x.SalePointId).FirstOrDefault())
                                                        .Build();

            ordersData = ordersData.Concat(newRouteOrders).ToList();


        }

        private static Mock<DbSet<T>> DbSetMockBehaviour<T>(IList<T> items) where T : class
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
