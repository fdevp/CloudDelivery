
# CloudDelivery
A system for supporting a food delivery for the points of sale and carriers. A real-time communication between a carrier and the poitns of sale will be ensured. It provides a route's creation and the interactive maps for controlling of a delivery. It uses the Google Maps Directions Api to obtain the best route via the route's points.

## Backend
### Framework
##### ASP.NET WebApi2
REST backend application. The main framework is ASP.NET WebApi 2. Its authorization is controlled by ASP.NET Identity that uses the custom database context. The system returns authorization token used by users during further communication. The backend authorization will be handled by the authorization attributes.
 
##### Unity IoC Containers
For a clean and easy to understand objects lifetime managing, I decided to use the IoC pattern. The good framework for it are Unity Containers. The injectable objects are defined in App_Start/UnityConfig.cs.
 
##### Websockets
Signalr was used because of a huge support at every level of application. E.g., Identity authorization, Portable Class Library that are used by Xamarin, Javascript support.
 
##### Providers
Classes that provide additional functionality, e.g. caching, Google Maps Api usage. Providers are handle and inject by Unity Containers.
 
##### Cache
The custom cache engages implementation based on HttpRuntime.Cache. It was created as 
a provider.
 
##### Mapping
AutoMapper applied. Mappings defined in App_Start/AutoMapperConfig.cs
 
##### Swagger
For api documentation,  Swashbuckle used. Configuration is in App_Start/SwaggerConfig.cs

### Business logic
based on the interfaces and Inversion of control, the pattern provided by the Unity Containers framework. Most of the services’ methods are the CRUD operations.
 
 
### ORM
Applied Entity Framework ORM, the code first approach. Entites as classes with data adnotations. A custom database context inherited from Identity database context. The context factory was created for support of the IoC pattern and to handle a context dispose. The database was placed in the Azure SQL Database cloud service. The connection string is in the azureConnection.config that is not included in the git repository.
 
### Tests
Applied Microsoft unit test framework. Mocks handled by MoQ framework, test data generated with usage of NBuilder.

## Front end
based on the Angular 4. SystemJS module loader (it was not the best solution). The main assumption was to work on lazy modules, but unfortunately, there are problems with lazy modules and the dynamic (entry) components in the Angular 4. Each role has its own module. The server communication was implemented in the services. The services’ objects are injected into the views, where they are used. The custom directives and pipes were implemented in the shared module app/Modules/Shared.
 
Some additional libraries that were used:
- AdminLTE 2 for basic theme
- Ngx-Bootstrap mainly for modals
- Ngx-Datatables for interactive tables
- Ngx-Toastr for toasts
- AGM for the angular 4 google maps support
- Lottie animations
- Ngx-ScrollSpy - for affix effect
 
 
### Major ToDos:
- backend model validation
- frontend form validation
- business logic exceptions handling
- resolve problems between the Angular 4 lazy modules and the entry components
- correct test methods
