using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudDelivery.Providers
{
    public interface ICacheProvider
    {
        /// <summary>
        /// set cache
        /// </summary>
        /// <param name="cacheKey">name of key</param>
        /// <param name="value">value</param>
        /// <param name="cacheTime">optional cache store time</param>
        void SetCache(string cacheKey, object value, TimeSpan? cacheTime = null);

        /// <summary>
        /// remove object from cache
        /// </summary>
        /// <param name="cacheKey">name of key</param>
        void RemoveCache(string cacheKey);

        /// <summary>
        /// remove objects from cache
        /// </summary>
        /// <param name="prefix">prefix of keys</param>
        void RemoveItemsFromCache(string prefix);


        /// <summary>
        /// return object from cache
        /// </summary>
        /// <param name="cacheKey">name of key</param>
        /// <returns></returns>
        object GetCache(string cacheKey);

        /// <summary>
        /// all keys exists in cache
        /// </summary>
        /// <returns></returns>
        HashSet<string> GetKeys();

        /// <summary>
        /// clears all keys
        /// </summary>
        void ClearCache();


        /// <summary>
        /// if data exists get, if not set data that function returns
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="cacheKey">name of key</param>
        /// <param name="func">function that returns value</param>
        /// <param name="cacheTime">optional cache store time</param>
        /// <returns></returns>
        T GetSet<T>(string cacheKey, Func<T> func, TimeSpan? cacheTime = null);
    }
}
