using CloudDelivery.Data;
using CloudDelivery.Providers;
using CloudDelivery.Services;
using CloudDelivery.Tests.Initialize;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.VisualStudio.TestTools.UnitTesting;
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
        UsersService service;
        ICDContext ctx;

        public UsersServiceTests()
        {
            var ctxFactory = DatabaseMocksFactory.GetCtxFactoryMock().Object;
            var cache = new CacheProvider();
            ctx = ctxFactory.GetContext();
            service = new UsersService(cache, ctxFactory);
        }

        [TestMethod()]
        public void AddUser_ShouldAddNewUser()
        {
            string identity = "identityId";
            int organisationId = 1;
            int id = service.AddUser(identity, organisationId);
            var user = service.GetUser(id);
            Assert.AreEqual(identity, user.IdentityId);
            Assert.AreEqual(organisationId, user.OrganisationId);
        }


        [TestMethod()]
        public void RemoveUser_ShouldRemoveUser()
        {
            var user = service.GetUsersList().FirstOrDefault();
            service.RemoveUser(user.Id);
            Assert.IsFalse(service.GetUsersList().Any(x => x.Id == user.Id));
        }

        [TestMethod()]
        public void RemoveUser_ShouldRemoveIdentityUser()
        {
            var user = service.GetUsersList().FirstOrDefault();
            var identityUser = ctx.Users.FirstOrDefault();
            user.IdentityId = identityUser.Id;
            service.RemoveUser(user.Id);
            Assert.IsFalse(ctx.Users.Any(x => x.Id == identityUser.Id));
        }

        [TestMethod()]
        public void RemoveUser_ShouldRemoveUserRoles()
        {
            var user = service.GetUsersList().FirstOrDefault();
            var role = service.GetRolesList().FirstOrDefault();
            service.SetSingleRole(user.Id, role.Id);
            service.RemoveUser(user.Id);
            Assert.IsFalse(ctx.UserRoles.Any(x => x.UserId == user.IdentityId));
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
            var user = service.GetUsersList().FirstOrDefault();
            var role = service.GetRolesList().FirstOrDefault();
            service.SetSingleRole(user.Id, role.Id);
            var userRole = service.GetUserRoles(user.Id);
            Assert.IsTrue(userRole.Any(x => x.RoleId == role.Id));

        }

        [TestMethod()]
        public void SetSingleRole_ShouldClearUserCurrentRole()
        {
            var user = service.GetUsersList().FirstOrDefault();
            var role = service.GetRolesList().FirstOrDefault();
            service.SetSingleRole(user.Id, role.Id);

            var newRole = service.GetRolesList().Where(x => x.Id != role.Id).FirstOrDefault();
            service.SetSingleRole(user.Id, newRole.Id);

            Assert.IsFalse(service.GetUserRoles(user.Id).Any(x => x.RoleId == role.Id));
        }


        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void SetSingleRole_ShouldThrowRoleNullException()
        {
            var user = service.GetUsersList().FirstOrDefault();
            service.SetSingleRole(user.Id, "");
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void SetSingleRole_ShouldThrowUserNullException()
        {
            var role = service.GetRolesList().FirstOrDefault();
            service.SetSingleRole(int.MinValue, role.Id);
        }

        [TestMethod()]
        public void GetUserRoles_ShouldReturnUserRoles()
        {
            var user = service.GetUsersList().FirstOrDefault();
            var role = service.GetRolesList().FirstOrDefault();

            service.SetSingleRole(user.Id, role.Id);

            var secondRole = service.GetRolesList().Where(x => x.Id != role.Id).FirstOrDefault();
            ctx.UserRoles.Add(new IdentityUserRole { RoleId = secondRole.Id, UserId = user.IdentityId });


            Assert.IsTrue(service.GetUserRoles(user.Id).Any(x => x.RoleId == role.Id));
            Assert.IsTrue(service.GetUserRoles(user.Id).Any(x => x.RoleId == secondRole.Id));
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
            var user = ctx.UserData.FirstOrDefault();
            var organisation = ctx.Organisations.FirstOrDefault();
            service.SetOrganisation(organisation.Id, user.Id);
            Assert.AreEqual(organisation.Id, user.OrganisationId);
        }


        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void AddMember_ShouldThrowUserNullException()
        {
            var organisation = ctx.Organisations.FirstOrDefault();
            service.SetOrganisation(organisation.Id, int.MinValue);
        }


        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void AddMember_ShouldThrowOrganisationNullException()
        {
            var user = ctx.UserData.FirstOrDefault();
            service.SetOrganisation(int.MinValue, user.Id);
        }

        [TestMethod()]
        public void SetPhone_ShouldSetPhoneNumber()
        {
            var user = service.GetUsersList().FirstOrDefault();
            var identityUser = ctx.Users.FirstOrDefault();
            user.IdentityId = identityUser.Id;
            user.AspNetUser = identityUser;
            string phone = "111111111";
            service.SetPhone(user.Id, phone);
            Assert.AreEqual(identityUser.PhoneNumber, phone);
        }


        [TestMethod()]
        public void SetDescription_ShouldSetDescription()
        {
            var user = service.GetUsersList().FirstOrDefault();
            string desc = "new description";
            service.SetDescription(user.Id, desc);
            Assert.AreEqual(user.Description, desc);
        }


        [TestMethod()]
        public void GetUserRolesString_ShouldReturnSingleRole()
        {
            var user = service.GetUsersList().FirstOrDefault();
            var role = service.GetRolesList().FirstOrDefault();
            service.SetSingleRole(user.Id, role.Id);
            Assert.AreEqual(role.Name, service.GetUserRolesString(user.Id));
        }

        [TestMethod()]
        public void GetUserRolesString_ShouldReturnMultipleRoles()
        {
            var user = service.GetUsersList().FirstOrDefault();
            var role = service.GetRolesList().FirstOrDefault();
            service.SetSingleRole(user.Id, role.Id);

            var secondRole = service.GetRolesList().Where(x => x.Id != role.Id).FirstOrDefault();
            ctx.UserRoles.Add(new IdentityUserRole { RoleId = secondRole.Id, UserId = user.IdentityId });

            Assert.AreEqual(string.Join(", ", role.Name, secondRole.Name), service.GetUserRolesString(user.Id));
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
            var user = service.GetUsersList().FirstOrDefault();
            //remove user roles
            ctx.UserRoles.Where(x => x.UserId == user.IdentityId).ToList().ForEach(x => ctx.UserRoles.Remove(x));
            service.GetUserRolesString(user.Id);
        }
    }
}
