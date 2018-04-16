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
var salepoint_dashboard_component_1 = require("./dashboard/salepoint.dashboard.component");
var salepoint_orders_component_1 = require("./orders/salepoint.orders.component");
var SalepointGuard_1 = require("../../Services/Guards/SalepointGuard");
var salepointRoutes = [
    {
        path: '',
        canActivateChild: [SalepointGuard_1.SalepointGuard],
        children: [
            {
                path: 'orders',
                component: salepoint_orders_component_1.SalepointOrdersComponent
            },
            {
                path: '',
                component: salepoint_dashboard_component_1.SalepointDashboardComponent
            }
        ],
    },
];
var SalepointRouting = /** @class */ (function () {
    function SalepointRouting() {
    }
    SalepointRouting = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(salepointRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], SalepointRouting);
    return SalepointRouting;
}());
exports.SalepointRouting = SalepointRouting;
//# sourceMappingURL=salepoint.routing.js.map