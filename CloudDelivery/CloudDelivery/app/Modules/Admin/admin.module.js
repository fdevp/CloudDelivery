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
var admin_routing_1 = require("./admin.routing");
var shared_module_1 = require("../Shared/shared.module");
var admin_dashboard_component_1 = require("./dashboard/admin.dashboard.component");
var admin_users_component_1 = require("./users/admin.users.component");
var admin_organisations_component_1 = require("./organisations/admin.organisations.component");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var admin_component_1 = require("./admin.component");
var pages = [
    admin_dashboard_component_1.AdminDashboardComponent,
    admin_users_component_1.AdminUsersComponent,
    admin_organisations_component_1.AdminOrganisationsComponent,
    admin_component_1.AdminComponent
];
var modules = [
    common_1.CommonModule,
    router_1.RouterModule,
    forms_1.FormsModule,
    ngx_datatable_1.NgxDatatableModule,
    shared_module_1.SharedModule
];
var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        core_1.NgModule({
            declarations: pages.slice(),
            imports: modules.concat([admin_routing_1.AdminRouting]),
        })
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map