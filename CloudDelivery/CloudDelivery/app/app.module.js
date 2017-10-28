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
var AdminGuard_1 = require("./Services/Guards/AdminGuard");
var CarrierGuard_1 = require("./Services/Guards/CarrierGuard");
var SessionService_1 = require("./Services/SessionService");
var admin_module_1 = require("./Modules/Admin/admin.module");
var carrier_module_1 = require("./Modules/Carrier/carrier.module");
var shared_module_1 = require("./Shared/shared.module");
var pages = [
    app_component_1.AppComponent,
];
var modules = [
    platform_browser_1.BrowserModule,
    forms_1.FormsModule,
    http_1.HttpModule,
    app_routing_1.AppRouting
];
var myModules = [
    admin_module_1.AdminModule,
    carrier_module_1.CarrierModule,
    shared_module_1.SharedModule
];
var providers = [
    { provide: common_1.APP_BASE_HREF, useValue: '/' },
    SessionService_1.SessionService,
    AuthGuard_1.AuthGuard,
    AdminGuard_1.AdminGuard,
    CarrierGuard_1.CarrierGuard
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: modules.concat(myModules),
        providers: providers.slice(),
        declarations: pages.slice(),
        bootstrap: [app_component_1.AppComponent],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map