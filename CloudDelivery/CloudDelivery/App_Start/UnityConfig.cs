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

            //controllers
            container.RegisterType<AccountController>(new InjectionConstructor(typeof(IUsersService)));
            container.RegisterType<UsersController>();
            container.RegisterType<OrganisationsController>();

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}