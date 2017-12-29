using CloudDelivery.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudDelivery.Services
{
    interface ICarrierService
    {
        /// <summary>
        /// create Carrier entity for user and remove other entities
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>carrier entity id</returns>
        int SetCarrier(int userId);

        Carrier GetCarrier(int userId);

        List<Carrier> GetCarriers();

        int RemoveCarrier(int userId);

        void SetColor(int userId);
    }
}
