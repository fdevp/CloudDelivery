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
var salepoint_routing_1 = require("./salepoint.routing");
var salepoint_dashboard_component_1 = require("./dashboard/salepoint.dashboard.component");
var salepoint_orders_component_1 = require("./orders/salepoint.orders.component");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var salepoint_component_1 = require("./salepoint.component");
var shared_module_1 = require("../Shared/shared.module");
var core_2 = require("@agm/core");
var salepoint_createorder_component_1 = require("./Orders/CreateOrder/salepoint.createorder.component");
var pages = [
    salepoint_dashboard_component_1.SalepointDashboardComponent,
    salepoint_orders_component_1.SalepointOrdersComponent,
    salepoint_component_1.SalepointComponent,
    salepoint_createorder_component_1.SalepointCreateOrderComponent
];
var modules = [
    common_1.CommonModule,
    router_1.RouterModule,
    forms_1.FormsModule,
    ngx_datatable_1.NgxDatatableModule,
    shared_module_1.SharedModule,
    core_2.AgmCoreModule
];
var SalepointModule = /** @class */ (function () {
    function SalepointModule() {
    }
    SalepointModule = __decorate([
        core_1.NgModule({
            imports: modules.concat([salepoint_routing_1.SalepointRouting]),
            declarations: pages.slice(),
        })
    ], SalepointModule);
    return SalepointModule;
}());
exports.SalepointModule = SalepointModule;
//# sourceMappingURL=salepoint.module.js.map