using CloudDelivery.Data.Entities;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudDelivery.Services
{
    public interface IUsersService
    {
        /// <summary>
        /// add user to db
        /// </summary>
        /// <param name="identityId">ApplicationUser id</param>
        /// <param name="organisationId">add user to organisation</param>
        /// <returns>new user id</returns>
        int AddUser(string identityId, string name,int? organisationId);

        /// <summary>
        /// add new salepoint signed by google auth
        /// </summary>
        /// <param name="identityId"></param>
        /// <param name="name"></param>
        /// <param name="organisationId"></param>
        /// <returns></returns>
        int AddGoogleSalepointUser(string identityId, string name, int? organisationId);

        /// <summary>
        /// remove user and clear Identity data
        /// </summary>
        /// <param name="id">user id</param>
        void RemoveUser(int id);

        /// <summary>
        /// get all users list
        /// </summary>
        /// <returns></returns>
        List<User> GetUsersList();


        /// <summary>
        /// get roles list
        /// </summary>
        /// <returns></returns>
        List<IdentityRole> GetRolesList();
        

        /// <summary>
        /// get user roles list
        /// </summary>
        /// <param name="id">user id</param>
        /// <returns></returns>
        List<IdentityUserRole> GetUserRoles(int id);


        /// <summary>
        /// get users roles as string
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        string GetUserRolesString(int id);


        /// <summary>
        /// get user by id
        /// </summary>
        /// <param name="id">user id</param>
        /// <returns></returns>
        User GetUser(int id);

        /// <summary>
        /// get user by identity Id
        /// </summary>
        /// <param name="identityId"></param>
        /// <returns></returns>
        User GetUser(string identityId);

        /// <summary>
        /// change user role
        /// </summary>
        /// <param name="id"></param>
        /// <param name="roleId"></param>
        void SetSingleRole(int id, string roleId);


        /// <summary>
        /// add user to organisation
        /// </summary>
        /// <param name="id"></param>
        /// <param name="organisationId"></param>
        void SetOrganisation(int id, int? organisationId);


        /// <summary>
        /// set user name
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        void SetName(int id, string name);


        /// <summary>
        /// set user phone
        /// </summary>
        /// <param name="id"></param>
        /// <param name="phone"></param>
        void SetPhone(int id, string phone);


        /// <summary>
        /// set user description
        /// </summary>
        /// <param name="id"></param>
        /// <param name="description"></param>
        void SetDescription(int id, string description);
    }
}
