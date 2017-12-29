"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var admin_dashboard_component_1 = require("./dashboard/admin.dashboard.component");
var admin_users_component_1 = require("./users/admin.users.component");
var admin_organisations_component_1 = require("./organisations/admin.organisations.component");
var AdminGuard_1 = require("../../Services/Guards/AdminGuard");
var admin_component_1 = require("./admin.component");
var adminRoutes = [
    {
        path: '',
        canActivateChild: [AdminGuard_1.AdminGuard],
        component: admin_component_1.AdminComponent,
        children: [
            {
                path: 'users',
                component: admin_users_component_1.AdminUsersComponent,
            },
            {
                path: 'organisations',
                component: admin_organisations_component_1.AdminOrganisationsComponent,
            },
            {
                path: '',
                component: admin_dashboard_component_1.AdminDashboardComponent,
            }
        ],
    },
];
var AdminRouting = /** @class */ (function () {
    function AdminRouting() {
    }
    AdminRouting = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(adminRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], AdminRouting);
    return AdminRouting;
}());
exports.AdminRouting = AdminRouting;
//# sourceMappingURL=admin.routing.js.map