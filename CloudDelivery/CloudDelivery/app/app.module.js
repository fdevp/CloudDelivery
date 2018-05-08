"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var AuthGuard_1 = require("./Services/Guards/AuthGuard");
var SessionService_1 = require("./Services/SessionService");
var UsersService_1 = require("./Services/Admin/UsersService");
var OrganisationsService_1 = require("./Services/Admin/OrganisationsService");
var animations_1 = require("@angular/platform-browser/animations");
var ngx_toastr_1 = require("ngx-toastr");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var ngx_bootstrap_2 = require("ngx-bootstrap");
var core_2 = require("@agm/core");
var ProgressToast_1 = require("./Modules/Shared/Toasts/ProgressToast");
//import { AddUserModal } from './Entries/Modals/AddUserModal/add.user.modal';
var ModalFactoryService_1 = require("./Services/UI/ModalFactoryService");
var admin_modals_module_1 = require("./Modules/Admin/Modals/admin.modals.module");
var ToastFactoryService_1 = require("./Services/UI/ToastFactoryService");
var CarriersService_1 = require("./Services/Admin/CarriersService");
var SalePointsService_1 = require("./Services/Admin/SalePointsService");
var OrdersService_1 = require("./Services/Orders/OrdersService");
var GMapsService_1 = require("./Services/GMapsService");
var SignalrService_1 = require("./Services/SignalrService");
var SalepointOrdersService_1 = require("./Services/Orders/SalepointOrdersService");
var CarrierOrdersService_1 = require("./Services/Orders/CarrierOrdersService");
var RoutesService_1 = require("./Services/RoutesService");
var ngx_scrollspy_1 = require("ngx-scrollspy");
var login_component_1 = require("./Modules/Shared/Components/Login/login.component");
var loading_component_1 = require("./Modules/Shared/Components/Loading/loading.component");
var lottie_component_1 = require("./Modules/Shared/Components/lottie.component");
var pages = [
    app_component_1.AppComponent,
    login_component_1.LoginComponent,
    loading_component_1.LoadingComponent,
    lottie_component_1.LottieComponent
];
var modals = [];
var toasts = [
    ProgressToast_1.ProgressToast
];
var modules = [
    platform_browser_1.BrowserModule,
    forms_1.FormsModule,
    http_1.HttpModule,
    app_routing_1.AppRouting,
    animations_1.BrowserAnimationsModule,
    ngx_toastr_1.ToastrModule.forRoot(),
    ngx_bootstrap_1.ModalModule.forRoot(),
    ngx_bootstrap_2.TabsModule.forRoot(),
    //LottieAnimationViewModule.forRoot(),
    core_2.AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCHX0R_iy25XKld2oyehvuVi26teOlXYWE'
    }),
    ngx_scrollspy_1.ScrollSpyModule.forRoot(),
    admin_modals_module_1.AdminModalsModule
];
var providers = [
    { provide: common_1.APP_BASE_HREF, useValue: '/' },
    SignalrService_1.SignalrService,
    SessionService_1.SessionService,
    GMapsService_1.GMapsService,
    core_2.GoogleMapsAPIWrapper,
    AuthGuard_1.AuthGuard,
    ModalFactoryService_1.ModalFactoryService,
    ToastFactoryService_1.ToastFactoryService,
    OrdersService_1.OrdersService,
    SalepointOrdersService_1.SalepointOrdersService,
    CarrierOrdersService_1.CarrierOrdersService,
    RoutesService_1.RoutesService,
    //admin
    UsersService_1.UsersService,
    OrganisationsService_1.OrganisationsService,
    SalePointsService_1.SalePointsService,
    CarriersService_1.CarriersService
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            providers: providers.slice(),
            declarations: pages.concat(modals, toasts),
            bootstrap: [app_component_1.AppComponent],
            imports: modules.slice(),
            entryComponents: modals.concat(toasts)
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map