using CloudDelivery.Controllers;
using CloudDelivery.Data;
using CloudDelivery.Hubs;
using CloudDelivery.Providers;
using CloudDelivery.Services;
using CloudDelivery.Services.Implementations;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.Practices.Unity;
using System;
using System.Net.Http;
using System.Web.Http;
using Unity.WebApi;

namespace CloudDelivery
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = new UnityContainer();

            //dbcontext
            container.RegisterType<ICDContext, CDContext>();
            container.RegisterType<ICDContextFactory, CDContextFactory>();


            //httpclient
            TimeSpan.FromSeconds(20);
            HttpClient httpClient = new HttpClient() { Timeout = TimeSpan.FromSeconds(20) };
            InjectionFactory httpClientInjectionFactory = new InjectionFactory(x => httpClient);
            container.RegisterType<HttpClient>(httpClientInjectionFactory);



            IHubContext<INotificationsHub> notificationsHub = GlobalHost.ConnectionManager.GetHubContext<NotificationsHub, INotificationsHub>();
            InjectionFactory notificationHubInjectionFactory = new InjectionFactory(x => notificationsHub);
            container.RegisterType<IHubContext<INotificationsHub>>(notificationHubInjectionFactory);

            //providers
            container.RegisterType<ICacheProvider, CacheProvider>();
            container.RegisterType<IHttpProvider, HttpProvider>();
            container.RegisterType<IGMapsProvider, GMapsProvider>();

            //services
            container.RegisterType<IUsersService, UsersService>();
            container.RegisterType<IOrganisationsService, OrganisationsService>();
            container.RegisterType<ICarriersService, CarriersService>();
            container.RegisterType<ISalePointsService, SalePointsService>();
            container.RegisterType<IAuthenticationService, AuthenticationService>();
            container.RegisterType<IAuthorizationService, AuthorizationService>();
            container.RegisterType<IOrdersService, OrdersService>();
            container.RegisterType<IRoutesService, RoutesService>();

            //controllers
            container.RegisterType<AccountController>(new InjectionConstructor(typeof(IUsersService), typeof(IAuthenticationService), typeof(IAuthorizationService)));
            container.RegisterType<UsersController>();
            container.RegisterType<OrganisationsController>();
            container.RegisterType<SalePointsController>();
            container.RegisterType<CarriersController>();
            container.RegisterType<OrdersController>();
            container.RegisterType<RoutesController>();



            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}