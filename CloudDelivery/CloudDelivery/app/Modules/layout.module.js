"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var layout_component_1 = require("./layout.component");
var layout_routing_1 = require("./layout.routing");
var shared_module_1 = require("./Shared/shared.module");
var MenuFactoryService_1 = require("../Services/UI/MenuFactoryService");
var AdminGuard_1 = require("../Services/Guards/AdminGuard");
var CarrierGuard_1 = require("../Services/Guards/CarrierGuard");
var SalepointGuard_1 = require("../Services/Guards/SalepointGuard");
var pages = [
    layout_component_1.LayoutComponent,
];
var modules = [
    common_1.CommonModule,
    router_1.RouterModule,
    forms_1.FormsModule,
    shared_module_1.SharedModule,
];
var providers = [
    MenuFactoryService_1.MenuFactoryService,
    AdminGuard_1.AdminGuard,
    CarrierGuard_1.CarrierGuard,
    SalepointGuard_1.SalepointGuard
];
var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule = __decorate([
        core_1.NgModule({
            providers: providers.slice(),
            declarations: pages.slice(),
            bootstrap: [layout_component_1.LayoutComponent],
            imports: modules.concat([layout_routing_1.LayoutRouting]),
        })
    ], LayoutModule);
    return LayoutModule;
}());
exports.LayoutModule = LayoutModule;
//# sourceMappingURL=layout.module.js.map