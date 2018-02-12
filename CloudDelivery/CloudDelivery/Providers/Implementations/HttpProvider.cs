using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;

namespace CloudDelivery.Providers
{
    public class HttpProvider : IHttpProvider
    {
        private HttpClient httpClient;

        public HttpProvider(HttpClient httpClient)
        {
            this.httpClient = httpClient;
        }

        public async Task<string> GetAsync(string resource, Dictionary<string, string> data = null)
        {
            //data
            var content = new FormUrlEncodedContent(data);
            string query = String.Concat(resource, "?", content.ReadAsStringAsync().Result);

            using (var httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, query))
            {
                var response = await httpClient.SendAsync(httpRequestMessage);

                //error response handling
                if (!response.IsSuccessStatusCode)
                {
                    throw new HttpRequestException(response.StatusCode.ToString());
                }
                return await response.Content.ReadAsStringAsync();
            }
        }


        public async Task<string> PostAsync(string resource, object data = null)
        {
            using (var httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, resource))
            {
                //data
                if (data != null)
                {
                    httpRequestMessage.Content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                }

                var response = await httpClient.SendAsync(httpRequestMessage);

                //error response handling
                if (!response.IsSuccessStatusCode)
                {
                    throw new HttpRequestException(response.StatusCode.ToString());
                }

                return await response.Content.ReadAsStringAsync();
            }
        }
    }
}