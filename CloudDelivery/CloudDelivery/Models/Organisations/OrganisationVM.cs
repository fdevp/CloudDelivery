using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models
{
    public class OrganisationVM
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int MembersNumber { get; set; }
    }
}