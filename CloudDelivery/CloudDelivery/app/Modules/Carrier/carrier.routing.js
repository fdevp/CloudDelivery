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
var carrier_component_1 = require("./carrier.component");
var carrier_dashboard_component_1 = require("./dashboard/carrier.dashboard.component");
var carrier_users_component_1 = require("./users/carrier.users.component");
var CarrierGuard_1 = require("../../Services/Guards/CarrierGuard");
var layoutRoutes = [
    {
        path: '',
        component: carrier_component_1.CarrierComponent,
        canActivate: [CarrierGuard_1.CarrierGuard],
        canActivateChild: [CarrierGuard_1.CarrierGuard],
        children: [
            {
                component: carrier_dashboard_component_1.CarrierDashboardComponent,
                path: '',
            },
            {
                component: carrier_users_component_1.CarrierUsersComponent,
                path: 'users',
            }
        ],
    },
];
var CarrierRouting = (function () {
    function CarrierRouting() {
    }
    return CarrierRouting;
}());
CarrierRouting = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild(layoutRoutes)
        ],
        exports: [
            router_1.RouterModule
        ]
    })
], CarrierRouting);
exports.CarrierRouting = CarrierRouting;
//# sourceMappingURL=carrier.routing.js.map