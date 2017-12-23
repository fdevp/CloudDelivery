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
var layout_component_1 = require("./layout.component");
var AdminGuard_1 = require("../Services/Guards/AdminGuard");
var CarrierGuard_1 = require("../Services/Guards/CarrierGuard");
var layoutRoutes = [
    {
        path: '',
        component: layout_component_1.LayoutComponent,
        children: [
            {
                path: 'admin',
                canActivate: [AdminGuard_1.AdminGuard],
                loadChildren: "app/modules/admin/admin.module#AdminModule",
            },
            {
                path: 'carrier',
                canLoad: [CarrierGuard_1.CarrierGuard],
                loadChildren: "app/modules/carrier/carrier.module#CarrierModule",
            },
        ],
    },
];
var LayoutRouting = /** @class */ (function () {
    function LayoutRouting() {
    }
    LayoutRouting = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(layoutRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], LayoutRouting);
    return LayoutRouting;
}());
exports.LayoutRouting = LayoutRouting;
//# sourceMappingURL=layout.routing.js.map