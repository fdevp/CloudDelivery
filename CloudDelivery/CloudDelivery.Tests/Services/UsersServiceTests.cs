using CloudDelivery.Data;
using CloudDelivery.Data.Entities;
using CloudDelivery.Providers;
using CloudDelivery.Services;
using CloudDelivery.Tests.Initialize;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudDelivery.Tests.Services
{
    [TestClass()]
    public class UsersServiceTests
    {
        private UsersService service;
        private Mock<ICDContext> ctxMock;
        private ICDContext ctx;
        

        public UsersServiceTests()
        {
            ctxMock = DatabaseMocksFactory.GetContextMock();
            ICDContextFactory ctxFactory = DatabaseMocksFactory.GetCtxFactoryMock(ctxMock).Object;

            var cache = new CacheProvider();
            ctx = ctxFactory.GetContext();
            service = new UsersService(cache, ctxFactory);
        }

        [TestMethod()]
        public void AddUser_ShouldAddNewUser()
        {
            string identity = "identityId";
            int organisationId = 1;
            string name = "username1";

            int id = service.AddUser(identity, name ,organisationId);
            User user = service.GetUser(id);

            Assert.AreEqual(identity, user.IdentityId);
            Assert.AreEqual(name, user.Name);
            Assert.AreEqual(organisationId, user.OrganisationId);

            ctxMock.Verify(x => x.SaveChanges(), Times.Once);
        }


        [TestMethod()]
        public void RemoveUser_ShouldRemoveUser()
        {
            User user = service.GetUsersList().FirstOrDefault();

            service.RemoveUser(user.Id);

            Assert.IsFalse(service.GetUsersList().Any(x => x.Id == user.Id));
            ctxMock.Verify(x => x.SaveChanges(), Times.Once);
        }

        [TestMethod()]
        public void RemoveUser_ShouldRemoveIdentityUser()
        {
            User user = service.GetUsersList().FirstOrDefault();
            ExtendedIdentityUser identityUser = ctx.Users.FirstOrDefault();
            user.IdentityId = identityUser.Id;

            service.RemoveUser(user.Id);

            Assert.IsFalse(ctx.Users.Any(x => x.Id == identityUser.Id));
            ctxMock.Verify(x => x.SaveChanges(), Times.Once);
        }

        [TestMethod()]
        public void RemoveUser_ShouldRemoveUserRoles()
        {
            User user = service.GetUsersList().FirstOrDefault();
            IdentityRole role = service.GetRolesList().FirstOrDefault();

            service.SetSingleRole(user.Id, role.Id);
            service.RemoveUser(user.Id);

            Assert.IsFalse(ctx.UserRoles.Any(x => x.UserId == user.IdentityId));
            ctxMock.Verify(x => x.SaveChanges(), Times.Exactly(2));
        }


        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void RemoveUser_ShouldThrowNullException()
        {
            service.RemoveUser(int.MinValue);
        }

        [TestMethod()]
        public void SetSingleRole_ShouldSetUserRole()
        {
            User user = service.GetUsersList().FirstOrDefault();
            IdentityRole role = service.GetRolesList().FirstOrDefault();

            service.SetSingleRole(user.Id, role.Id);
            List<IdentityUserRole> userRoles = service.GetUserRoles(user.Id);

            Assert.IsTrue(userRoles.Any(x => x.RoleId == role.Id));
            ctxMock.Verify(x => x.SaveChanges(), Times.Once);
        }

        [TestMethod()]
        public void SetSingleRole_ShouldClearUserCurrentRole()
        {
            User user = service.GetUsersList().FirstOrDefault();
            IdentityRole role = service.GetRolesList().FirstOrDefault();
            service.SetSingleRole(user.Id, role.Id);

            IdentityRole newRole = service.GetRolesList().Where(x => x.Id != role.Id).FirstOrDefault();
            service.SetSingleRole(user.Id, newRole.Id);

            Assert.IsFalse(service.GetUserRoles(user.Id).Any(x => x.RoleId == role.Id));
            ctxMock.Verify(x => x.SaveChanges(), Times.Exactly(2));
        }


        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void SetSingleRole_ShouldThrowRoleNullException()
        {
            User user = service.GetUsersList().FirstOrDefault();
            service.SetSingleRole(user.Id, "");
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void SetSingleRole_ShouldThrowUserNullException()
        {
            IdentityRole role = service.GetRolesList().FirstOrDefault();
            service.SetSingleRole(int.MinValue, role.Id);
        }

        [TestMethod()]
        public void GetUserRoles_ShouldReturnUserRoles()
        {
            User user = service.GetUsersList().FirstOrDefault();
            IdentityRole role = service.GetRolesList().FirstOrDefault();

            service.SetSingleRole(user.Id, role.Id);

            IdentityRole secondRole = service.GetRolesList().Where(x => x.Id != role.Id).FirstOrDefault();
            ctx.UserRoles.Add(new IdentityUserRole { RoleId = secondRole.Id, UserId = user.IdentityId });


            Assert.IsTrue(service.GetUserRoles(user.Id).Any(x => x.RoleId == role.Id));
            Assert.IsTrue(service.GetUserRoles(user.Id).Any(x => x.RoleId == secondRole.Id));
            ctxMock.Verify(x => x.SaveChanges(), Times.Once);
        }


        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetUserRoles_ShouldThrowNullException()
        {
            service.GetUserRoles(int.MinValue);
        }


        [TestMethod()]
        public void SetOrganisation_ShouldSetOrganisation()
        {
            User user = ctx.AppUsers.FirstOrDefault();
            Organisation organisation = ctx.Organisations.FirstOrDefault();

            service.SetOrganisation(organisation.Id, user.Id);

            Assert.AreEqual(organisation.Id, user.OrganisationId);
            ctxMock.Verify(x => x.SaveChanges(), Times.Once);
        }

        [TestMethod()]
        public void SetOrganisation_ShouldClearOrganisation()
        {
            User user = ctx.AppUsers.FirstOrDefault();
            Organisation organisation = ctx.Organisations.FirstOrDefault();

            user.OrganisationId = 1;
            service.SetOrganisation(user.Id, null);

            Assert.AreEqual(null, user.OrganisationId);
            ctxMock.Verify(x => x.SaveChanges(), Times.Once);
        }


        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void AddMember_ShouldThrowUserNullException()
        {
            Organisation organisation = ctx.Organisations.FirstOrDefault();
            service.SetOrganisation(organisation.Id, int.MinValue);
        }


        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void AddMember_ShouldThrowOrganisationNullException()
        {
            User user = ctx.AppUsers.FirstOrDefault();
            service.SetOrganisation(int.MinValue, user.Id);
        }

        [TestMethod()]
        public void SetPhone_ShouldSetPhone()
        {
            User user = service.GetUsersList().FirstOrDefault();
            ExtendedIdentityUser identityUser = ctx.Users.FirstOrDefault();
            user.IdentityId = identityUser.Id;
            user.AspNetUser = identityUser;
            string phone = "111111111";

            service.SetPhone(user.Id, phone);

            Assert.AreEqual(identityUser.PhoneNumber, phone);
            ctxMock.Verify(x => x.SaveChanges(), Times.Once);
        }


        [TestMethod()]
        public void SetName_ShouldSetName()
        {
            User user = service.GetUsersList().FirstOrDefault();
            string name = "username";

            service.SetName(user.Id, name);

            Assert.AreEqual(user.Name, name);
            ctxMock.Verify(x => x.SaveChanges(), Times.Once);
        }



        [TestMethod()]
        public void SetDescription_ShouldSetDescription()
        {
            User user = service.GetUsersList().FirstOrDefault();
            string desc = "new description";

            service.SetDescription(user.Id, desc);

            Assert.AreEqual(user.Description, desc);
            ctxMock.Verify(x => x.SaveChanges(), Times.Once);
        }


        [TestMethod()]
        public void GetUser_ById_ShoudReturnUser()
        {
            User userFromCtx = ctx.AppUsers.FirstOrDefault();
            User userFromDetails = service.GetUser(userFromCtx.Id);

            Assert.AreEqual(userFromCtx.Id, userFromDetails.Id);
            Assert.AreEqual(userFromCtx.IdentityId, userFromDetails.IdentityId);
            Assert.AreEqual(userFromCtx.Description, userFromDetails.Description);
            Assert.AreEqual(userFromCtx.Name, userFromDetails.Name);
            Assert.AreEqual(userFromCtx.OrganisationId, userFromDetails.OrganisationId);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetUser_ById_ShoudThrowUserNullException()
        {
            service.GetUser(int.MinValue);
        }

        [TestMethod()]
        public void GetUser_ByIdentityId_ShoudReturnUser()
        {
            User userFromCtx = ctx.AppUsers.FirstOrDefault();
            User userFromDetails = service.GetUser(userFromCtx.IdentityId);

            Assert.AreEqual(userFromCtx.Id, userFromDetails.Id);
            Assert.AreEqual(userFromCtx.IdentityId, userFromDetails.IdentityId);
            Assert.AreEqual(userFromCtx.Description, userFromDetails.Description);
            Assert.AreEqual(userFromCtx.Name, userFromDetails.Name);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetUser_ByIdentityId_ShoudThrowNullException()
        {
            service.GetUser("");
        }


        [TestMethod()]
        public void GetUserRolesString_ShouldReturnSingleRole()
        {
            User user = service.GetUsersList().FirstOrDefault();
            IdentityRole role = service.GetRolesList().FirstOrDefault();

            service.SetSingleRole(user.Id, role.Id);

            Assert.AreEqual(role.Name, service.GetUserRolesString(user.Id));
            ctxMock.Verify(x => x.SaveChanges(), Times.Once);
        }

        [TestMethod()]
        public void GetUserRolesString_ShouldReturnMultipleRoles()
        {
            User user = service.GetUsersList().FirstOrDefault();
            IdentityRole role = service.GetRolesList().FirstOrDefault();

            service.SetSingleRole(user.Id, role.Id);
            IdentityRole secondRole = service.GetRolesList().Where(x => x.Id != role.Id).FirstOrDefault();
            ctx.UserRoles.Add(new IdentityUserRole { RoleId = secondRole.Id, UserId = user.IdentityId });

            Assert.AreEqual(string.Join(", ", role.Name, secondRole.Name), service.GetUserRolesString(user.Id));
            ctxMock.Verify(x => x.SaveChanges(), Times.Once);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetUserRolesString_ShouldThrowUserNullException()
        {
            service.GetUserRolesString(int.MinValue);
        }


        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetUserRolesString_ShouldThrowUserRolesNullException()
        {
            User user = service.GetUsersList().FirstOrDefault();
            //remove user roles
            ctx.UserRoles.Where(x => x.UserId == user.IdentityId).ToList().ForEach(x => ctx.UserRoles.Remove(x));
            service.GetUserRolesString(user.Id);
        }
    }
}
