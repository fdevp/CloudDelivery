using CloudDelivery.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudDelivery.Services
{
    public interface ICarriersService
    {
        /// <summary>
        /// create Carrier entity for user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>carrier entity id</returns>
        int SetCarrier(int userId);

        Carrier GetCarrier(int userId);

        Carrier GetCarrierById(int id);

        List<Carrier> GetCarriers();

        void RemoveCarrier(int userId);

        void SetColor(int userId, string color);   
    }
}
