using CloudDelivery.Providers;
using CloudDelivery.Tests.Mocks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace CloudDelivery.Tests.Providers
{
    [TestClass()]
    public class HttpProviderTests
    {
        IHttpProvider httpProvider;
        public HttpProviderTests()
        {
            httpProvider = new HttpProvider(HttpClientMocks.HttpProviderCustomClient());
        }

        [TestMethod()]
        public void GetAsync_ShouldGetResponse()
        {
            var data = new Dictionary<string, string>();
            data.Add("key", "apikey");
            data.Add("getparam1","getparam1");
            data.Add("getparam2","getparam2");

            string response = this.httpProvider.GetAsync<string>("http://test.com", data).Result;

            Assert.AreEqual("response", response);
        }


        [TestMethod()]
        public void GetAsync_ShouldThrowHttpRequestException()
        {
            Assert.ThrowsExceptionAsync<HttpRequestException>(async () => await this.httpProvider.GetAsync<string>("http://error404.com/resource"));
        }

        [TestMethod()]
        public void PostAsync_ShouldGetResponse()
        {
            var data = new Dictionary<string, string>();
            data.Add("key", "apikey");
            data.Add("postparam1", "postparam1");
            data.Add("postparam2", "postparam2");

            string response = this.httpProvider.PostAsync<string>("http://test.com", data).Result;

            Assert.AreEqual("response", response);
        }


        [TestMethod()]
        public void PostAsync_ShouldThrowHttpRequestException()
        {
            Assert.ThrowsExceptionAsync<HttpRequestException>(async () => await this.httpProvider.PostAsync<string>("http://error404.com/resource"));
        }

    }
}
