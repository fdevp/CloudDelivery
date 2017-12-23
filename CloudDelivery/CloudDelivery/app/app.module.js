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
var UsersService_1 = require("./Services/UsersService");
var OrganisationsService_1 = require("./Services/OrganisationsService");
var animations_1 = require("@angular/platform-browser/animations");
var ngx_toastr_1 = require("ngx-toastr");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var ngx_bootstrap_2 = require("ngx-bootstrap");
var login_component_1 = require("./Modules/Shared/Login/login.component");
var ProgressToast_1 = require("./Modules/Shared/Toasts/ProgressToast");
//import { AddUserModal } from './Entries/Modals/AddUserModal/add.user.modal';
var ModalFactoryService_1 = require("./Services/Layout/ModalFactoryService");
var admin_modals_module_1 = require("./Modules/Admin/Modals/admin.modals.module");
var pages = [
    app_component_1.AppComponent,
    login_component_1.LoginComponent
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
    admin_modals_module_1.AdminModalsModule
];
var providers = [
    { provide: common_1.APP_BASE_HREF, useValue: '/' },
    SessionService_1.SessionService,
    UsersService_1.UsersService,
    OrganisationsService_1.OrganisationsService,
    AuthGuard_1.AuthGuard,
    ModalFactoryService_1.ModalFactoryService
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