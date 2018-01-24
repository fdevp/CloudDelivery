using CloudDelivery.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudDelivery.Services
{
    public interface ISalepointsService
    {
        /// <summary>
        /// set Salepoint entity for user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>salepoint entity id</returns>
        int SetSalepoint(int userId);

        SalePoint GetSalePoint(int userId);

        SalePoint GetSalePointById(int id);

        List<SalePoint> GetSalePoints();

        List<SalePoint> GetOrganisationSalePoints(int organisationId);

        void RemoveSalepoint(int userId);

        void SetCity(int userId, string city);

        void SetAddress(int userId, string address);

        void SetLatLng(int userId, string latlng);

        void SetColor(int userId, string color);
    }
}
