using CloudDelivery.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudDelivery.Services
{
    public interface IOrganisationsService
    {
        int AddOrganisation(string name);

        void RemoveOrganisation(int id);

        List<Organisation> GetOrganisationsList();

        List<User> GetMembersList(int organisationId);

        void RemoveMember(int userId);

        /// <summary>
        /// get organisation where user belongs
        /// </summary>
        /// <param name="userId">user id</param>
        /// <returns></returns>
        Organisation GetUserOrganisation(int userId);
        
    }
}
