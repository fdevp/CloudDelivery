using CloudDelivery.Data;
using CloudDelivery.Data.Entities;
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
    public class OrganisationsServiceTests
    {
        OrganisationsService organisationsService;
        UsersService usersService;
        ICDContext ctx;

        public OrganisationsServiceTests()
        {
            ICDContextFactory ctxFactory = DatabaseMocksFactory.GetCtxFactoryMock().Object;
            var cache = new CacheProvider();
            ctx = ctxFactory.GetContext();
            organisationsService = new OrganisationsService(cache, ctxFactory);
            usersService = new UsersService(cache, ctxFactory);
        }

        [TestMethod()]
        public void AddOrganisation_ShouldAddNewOrganisation()
        {
            string name = "new organisation";
            Assert.IsTrue(!organisationsService.GetOrganisationsList().Any(x => x.Name == name));
            organisationsService.AddOrganisation(name);
            Assert.IsTrue(organisationsService.GetOrganisationsList().Any(x => x.Name == name));
        }




        [TestMethod()]
        public void GetUserOrganisation_ShouldReturnUserOrganisation()
        {
            User user = ctx.UserData.FirstOrDefault();
            Organisation organisation = organisationsService.GetOrganisationsList().FirstOrDefault();
            usersService.SetOrganisation(user.Id, organisation.Id);
            Assert.AreEqual(organisation.Id, organisationsService.GetUserOrganisation(user.Id).Id);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetUserOrganisation_ShouldThrowUserNullException()
        {
            organisationsService.GetUserOrganisation(int.MinValue);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void GetUserOrganisation_ShouldThrowUserOrganisationNullException()
        {
            User user = ctx.UserData.FirstOrDefault();
            organisationsService.RemoveMember(user.Id);
            organisationsService.GetUserOrganisation(user.Id);
        }

        [TestMethod()]
        public void MembersList_ShouldReturnOrganisationMembers()
        {
            User user1 = ctx.UserData.FirstOrDefault();
            User user2 = ctx.UserData.Where(x => x.Id != user1.Id).FirstOrDefault();
            Organisation organisation = organisationsService.GetOrganisationsList().FirstOrDefault();
            usersService.SetOrganisation(user1.Id, organisation.Id);
            usersService.SetOrganisation(user2.Id, organisation.Id);
            List<User> membersList = organisationsService.GetMembersList(organisation.Id);
            Assert.IsTrue(membersList.Any(x => x.Id == user1.Id));
            Assert.IsTrue(membersList.Any(x => x.Id == user2.Id));
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void MembersList_ShouldThrowOrganisationNullException()
        {
            organisationsService.GetMembersList(int.MinValue);
        }

        [TestMethod()]
        public void RemoveMember_ShouldRemoveMemberFromOrganisation()
        {
            User user1 = ctx.UserData.FirstOrDefault();
            User user2 = ctx.UserData.Where(x => x.Id != user1.Id).FirstOrDefault();
            Organisation organisation = organisationsService.GetOrganisationsList().FirstOrDefault();
            usersService.SetOrganisation(user1.Id, organisation.Id);
            usersService.SetOrganisation(user2.Id, organisation.Id);
            organisationsService.RemoveMember(user1.Id);
            Assert.IsFalse(organisationsService.GetMembersList(organisation.Id).Any(x => x.Id == user1.Id));
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void RemoveMember_ShouldThrowUserNullException()
        {
            organisationsService.RemoveMember(int.MinValue);
        }

        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void RemoveMember_ShouldThrowUserOrganisationNullException()
        {
            User user = ctx.UserData.FirstOrDefault();
            user.OrganisationId = null;
            organisationsService.RemoveMember(user.Id);
        }

        [TestMethod()]
        public void RemoveOrganisation_ShouldRemoveOrganisation()
        {
            Organisation organisation = organisationsService.GetOrganisationsList().FirstOrDefault();
            organisationsService.RemoveOrganisation(organisation.Id);
            Assert.IsFalse(organisationsService.GetOrganisationsList().Any(x => x.Id == organisation.Id));
        }

        [TestMethod()]
        public void RemoveOrganisation_ShouldRemoveOrganisationMembers()
        {
            User user1 = ctx.UserData.FirstOrDefault();
            User user2 = ctx.UserData.Where(x => x.Id != user1.Id).FirstOrDefault();
            Organisation organisation = organisationsService.GetOrganisationsList().FirstOrDefault();
            usersService.SetOrganisation(user1.Id, organisation.Id);
            usersService.SetOrganisation(user2.Id, organisation.Id);
            organisationsService.RemoveOrganisation(organisation.Id);
            Assert.AreEqual(null, user1.OrganisationId);
            Assert.AreEqual(null, user2.OrganisationId);
        }


        [TestMethod()]
        [ExpectedException(typeof(NullReferenceException))]
        public void RemoveOrganisation_ShouldThrowOrganisationNullException()
        {
            organisationsService.RemoveOrganisation(int.MinValue);
        }


        [TestMethod()]
        public void GetMembersNumber_ShouldReturnMembersNumber()
        {
            Organisation organisation = ctx.Organisations.FirstOrDefault();

            List<User> usersNotInOrg = ctx.UserData.Where(x => x.OrganisationId != organisation.Id).ToList();
            int usersInOrgCount = ctx.UserData.Where(x => x.OrganisationId == organisation.Id).Count();

            Assert.AreEqual(usersInOrgCount, organisationsService.GetMembersNumber(organisation.Id));

            //after add new members
            foreach (User user in usersNotInOrg.Take(2))
            {
                usersService.SetOrganisation(user.Id, organisation.Id);
            }

            Assert.AreEqual(usersInOrgCount + 2, organisationsService.GetMembersNumber(organisation.Id));
        }
    }
}
