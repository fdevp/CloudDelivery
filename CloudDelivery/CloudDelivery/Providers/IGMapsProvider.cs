using CloudDelivery.Models;
using CloudDelivery.Models.GoogleApis;
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
        Task<DistanceDuration> DistanceMatrix(string origin, string destination);


        /// <summary>
        /// Get trace
        /// </summary>
        /// <param name="origin"></param>
        /// <param name="destination"></param>
        /// <returns></returns>
        Task<DirectionsResponse> Directions(GeoPosition origin, GeoPosition destination);



        /// <summary>
        /// Get trace with waypoints
        /// </summary>
        /// <param name="points">First element is origin and last element is destination</param>
        /// <returns></returns>
        Task<DirectionsResponse> Directions(GeoPosition origin, GeoPosition destination, List<GeoPosition> waypoints);
    }
}
