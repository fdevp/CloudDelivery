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
var AuthGuard_1 = require("./Services/Guards/AuthGuard");
var login_component_1 = require("./Modules/Shared/Components/Login/login.component");
var appRoutes = [
    {
        path: '',
        canActivate: [AuthGuard_1.AuthGuard],
        loadChildren: "app/modules/layout.module#LayoutModule",
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    { path: '**', redirectTo: '' }
];
var AppRouting = /** @class */ (function () {
    function AppRouting() {
    }
    AppRouting = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(appRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], AppRouting);
    return AppRouting;
}());
exports.AppRouting = AppRouting;
//# sourceMappingURL=app.routing.js.map