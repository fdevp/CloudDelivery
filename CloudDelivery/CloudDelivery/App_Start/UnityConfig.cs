using CloudDelivery.Controllers;
using CloudDelivery.Data;
using CloudDelivery.Providers;
using CloudDelivery.Services;
using Microsoft.Practices.Unity;
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

            //providers
            container.RegisterType<ICacheProvider, CacheProvider>();

            //services
            container.RegisterType<IUsersService, UsersService>(); 
            container.RegisterType<IOrganisationsService, OrganisationsService>();
            container.RegisterType<ICarriersService, CarriersService>();
            container.RegisterType<ISalepointsService, SalepointsService>();
            container.RegisterType<IAuthorizationService, AuthorizationService>();

            //controllers
            container.RegisterType<AccountController>(new InjectionConstructor(typeof(IUsersService), typeof(IAuthorizationService)));
            container.RegisterType<UsersController>();
            container.RegisterType<OrganisationsController>();
            container.RegisterType<SalepointsController>();
            container.RegisterType<CarriersController>();

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}