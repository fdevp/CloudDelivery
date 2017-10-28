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
var admin_component_1 = require("./admin.component");
var admin_dashboard_component_1 = require("./dashboard/admin.dashboard.component");
var admin_users_component_1 = require("./users/admin.users.component");
var AdminGuard_1 = require("../../Services/Guards/AdminGuard");
var layoutRoutes = [
    {
        path: '',
        component: admin_component_1.AdminComponent,
        canActivate: [AdminGuard_1.AdminGuard],
        canActivateChild: [AdminGuard_1.AdminGuard],
        children: [
            {
                path: '',
                component: admin_dashboard_component_1.AdminDashboardComponent,
            },
            {
                path: 'users',
                component: admin_users_component_1.AdminUsersComponent,
            }
        ],
    },
];
var AdminRouting = (function () {
    function AdminRouting() {
    }
    return AdminRouting;
}());
AdminRouting = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild(layoutRoutes)
        ],
        exports: [
            router_1.RouterModule
        ]
    })
], AdminRouting);
exports.AdminRouting = AdminRouting;
//# sourceMappingURL=admin.routing.js.map