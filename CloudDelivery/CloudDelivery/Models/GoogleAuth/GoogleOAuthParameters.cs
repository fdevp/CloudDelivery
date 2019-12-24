using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.Models.GoogleAuth
{
    public class GoogleOAuthParameters
    {
        public string ClientId { get; }
        public string ClientSecret { get; }
        public string AuthUrl { get; }

        public GoogleOAuthParameters(string clientId, string clientSecret, string authUrl)
        {
            ClientId = clientId;
            ClientSecret = clientSecret;
            AuthUrl = authUrl;
        }
    }
}