using CloudDelivery.Data.Entities;
using CloudDelivery.Models;
using CloudDelivery.Models.GoogleApis;
using CloudDelivery.Models.Routes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudDelivery.Services
{
    public interface IRoutesService
    {
        int Add(int carrierId, List<RoutePointEditModel> points, GeoPosition startPosition);

        Route ActiveRouteDetails(int carrierId);

        void Finish(int routeId);

        Route Details(int routeId);

        List<Route> List(RouteFiltersModel filters);
    }
}
