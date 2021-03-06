﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace CloudDelivery.Providers
{
    public interface IHttpProvider
    {
        /// <summary>
        /// get
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="resource">url</param>
        /// <returns></returns>
        Task<string> GetAsync(string resource, Dictionary<string, string> data = null);

        /// <summary>
        /// post
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="resource">url</param>
        /// <param name="data">data</param>
        /// <returns></returns>
        Task<string> PostAsync(string resource, object data = null);
    }
}
