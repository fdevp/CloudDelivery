using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Caching;

namespace CloudDelivery.Providers
{
    public class CacheProvider : ICacheProvider
    {
        private Cache _cache;

        public CacheProvider()
        {
            this._cache = System.Web.HttpRuntime.Cache;
        }


        public void ClearCache()
        {
            foreach (var item in this._cache)
            {
                this._cache.Remove((((DictionaryEntry)item).Key.ToString()));
            }
        }

        public object GetCache(string cacheKey)
        {
            return this._cache.Get(cacheKey);
        }

        public HashSet<string> GetKeys()
        {
            var keys = new HashSet<string>();
            foreach (var item in this._cache)
            {
                keys.Add(((DictionaryEntry)item).Key.ToString());
            }
            return keys;
        }

        public T GetSet<T>(string cacheKey, Func<T> func, TimeSpan? cacheTime = null)
        {
            var obj = GetCache(cacheKey);
            if (obj != null)
            {
                try
                {

                    return (T)obj;
                }
                catch
                {
                    this.RemoveCache(cacheKey);
                }
            }
            var result = func();

            SetCache(cacheKey, result, cacheTime);
            return result;
        }

        public void RemoveCache(string cacheKey)
        {
            this._cache.Remove(cacheKey);
        }

        public void RemoveItemsFromCache(string prefix)
        {
            foreach (var cachedItem in HttpRuntime.Cache)
            {
                var key = ((DictionaryEntry)cachedItem).Key.ToString();
                if (key.StartsWith(prefix))
                    HttpRuntime.Cache.Remove(key);
            }
        }

        public void SetCache(string cacheKey, object value, TimeSpan? cacheTime = null)
        {
            if (cacheTime.HasValue)
                this._cache.Insert(cacheKey, value, null, Cache.NoAbsoluteExpiration, cacheTime.Value);
            else
                this._cache.Insert(cacheKey, value);
        }
    }
}