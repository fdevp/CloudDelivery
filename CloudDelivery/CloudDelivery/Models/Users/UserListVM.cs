﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models
{
    public class UserListVM
    {
        public int Id { get; set; }
        public string Login { get; set; }

        public string Name { get; set; }

        public string Organisation { get; set; }

        public string Roles { get; set; }

        public int OrganisationId { get; set; }
    }
}