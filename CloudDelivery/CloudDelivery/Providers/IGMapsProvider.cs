using CloudDelivery.Models;
using CloudDelivery.Models.Orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudDelivery.Providers
{
    public interface IGMapsProvider
    {

        /// <summary>
        /// search lat lng of query
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        Task<GeoPosition> Geolocation(string query);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="origin"></param>
        /// <param name="destination"></param>
        /// <returns></returns>
        Task<TraceProperties> DistanceMatrix(string origin, string destination);


       /// <summary>
       /// distance time with waypoint
       /// </summary>
       /// <param name="carrierPos"></param>
       /// <param name="SalePointPos"></param>
       /// <param name="destPos"></param>
       /// <returns></returns>
        Task<ApproximateTrace> DistanceMatrix(string carrierPos, string SalePointPos, string destPos);

        /// <summary>
        /// Get trace
        /// </summary>
        /// <param name="origin"></param>
        /// <param name="destination"></param>
        /// <returns></returns>
        Task<OrderTrace> Directions(string origin, string destination);



        /// <summary>
        /// Get trace with waypoints
        /// </summary>
        /// <param name="points">First element is origin and last element is destination</param>
        /// <returns></returns>
        Task<OrderTrace> Directions(string origin, string destination, List<string> waypoints);
    }
}
