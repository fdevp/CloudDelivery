using CloudDelivery.Providers;
using Moq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using CloudDelivery.Extensions;
using System.Web.Http;

namespace CloudDelivery.Tests.Mocks
{
    public class HttpClientMocks
    {
        public static HttpClient HttpProviderCustomClient()
        {
            return new HttpClient(new CustomHttpMessageHandler());
        }


        private class CustomHttpMessageHandler : HttpMessageHandler
        {
            protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
            {
                if (request.Method == HttpMethod.Get)
                    return Task.FromResult<HttpResponseMessage>(HandleGetMethod(request));
                if (request.Method == HttpMethod.Post)
                    return Task.FromResult<HttpResponseMessage>(HandlePostMethod(request));

                throw new ArgumentException("Unsupported http method");
            }


            private HttpResponseMessage HandleGetMethod(HttpRequestMessage request)
            {
                if (request.RequestUri.AbsoluteUri == "http://error404.com/resource")
                {
                    return request.CreateErrorResponse(HttpStatusCode.NotFound, new Exception("Requested URL not found on this server."));
                }
                if (request.RequestUri.AbsoluteUri == "http://test.com/action?key=apikey&getparam1=getparam1&getparam2=getparam2")
                {
                    return request.CreateResponse(HttpStatusCode.OK, "response", new HttpConfiguration());
                }

                throw new Exception("");
            }

            private HttpResponseMessage HandlePostMethod(HttpRequestMessage request)
            {
                if (request.RequestUri.AbsoluteUri == "http://error404.com/resource")
                {
                    return request.CreateErrorResponse(HttpStatusCode.NotFound, new Exception("Requested URL not found on this server."));
                }
                if (request.RequestUri.AbsoluteUri == "http://test.com/action")
                {
                    //data to check
                    var data = new Dictionary<string, string>();
                    data.Add("key", "apikey");
                    data.Add("postparam1", "postparam1");
                    data.Add("postparam2", "postparam2");

                    //check data
                    string content = request.Content.ReadAsStringAsync().Result;
                    Dictionary<string, string> dictContent = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);

                    if (dictContent.CompareTo<string, string>(data))
                    {
                        return request.CreateResponse(HttpStatusCode.OK, "response", new HttpConfiguration());
                    }

                }

                throw new Exception("");
            }

        }

    }
}
