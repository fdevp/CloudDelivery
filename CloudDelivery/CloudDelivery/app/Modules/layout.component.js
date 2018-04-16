"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var SessionService_1 = require("../Services/SessionService");
var Roles_1 = require("../Models/Enums/Roles");
var LayoutComponent = /** @class */ (function () {
    function LayoutComponent(sessionService, route, router) {
        this.sessionService = sessionService;
        this.route = route;
        this.router = router;
        this.skin = 'skin-yellow-light';
    }
    LayoutComponent.prototype.ngOnInit = function () {
        document.body.className = 'hold-transition ' + this.skin + ' layout-boxed';
        var page = null;
        if (this.sessionService.isAdmin())
            page = 'admin';
        else if (this.sessionService.hasRole(Roles_1.Roles.Carrier))
            page = 'carrier';
        else if (this.sessionService.hasRole(Roles_1.Roles.SalePoint))
            page = 'salepoint';
        this.router.navigate([page]);
    };
    LayoutComponent.prototype.ngOnDestroy = function () {
        document.body.className = '';
    };
    LayoutComponent.prototype.Logout = function () {
        this.sessionService.logout();
    };
    LayoutComponent = __decorate([
        core_1.Component({
            selector: 'app-layout',
            templateUrl: './layout.component.html'
        }),
        __metadata("design:paramtypes", [SessionService_1.SessionService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], LayoutComponent);
    return LayoutComponent;
}());
exports.LayoutComponent = LayoutComponent;
//# sourceMappingURL=layout.component.js.map