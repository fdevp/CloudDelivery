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
        Route Add(int carrierId, List<RoutePointEditModel> points);

        Route ActiveRouteDetails(int carrierId);

        void Finish(int routeId);

        void PassPoint(int pointId);

        RoutePoint PointDetails(int pointId);

        Route Details(int routeId);

        List<Route> List(RouteFiltersModel filters);
    }
}
