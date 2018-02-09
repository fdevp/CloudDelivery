using CloudDelivery.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudDelivery.Services
{
    public interface ISalePointsService
    {
        /// <summary>
        /// set SalePoint entity for user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>SalePoint entity id</returns>
        int SetSalePoint(int userId);

        SalePoint GetSalePoint(int userId);

        SalePoint GetSalePointById(int id);

        List<SalePoint> GetSalePoints();

        List<SalePoint> GetOrganisationSalePoints(int organisationId);

        void RemoveSalePoint(int userId);

        void SetCity(int userId, string city);

        void SetAddress(int userId, string address);

        void SetLatLng(int userId, string latlng);

        void SetColor(int userId, string color);
    }
}
