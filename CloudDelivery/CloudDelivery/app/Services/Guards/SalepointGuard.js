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
var Observable_1 = require("rxjs/Observable");
var router_1 = require("@angular/router");
var SessionService_1 = require("../SessionService");
var Roles_1 = require("../../Models/Enums/Roles");
var SalepointGuard = /** @class */ (function () {
    function SalepointGuard(sessionService, router) {
        this.sessionService = sessionService;
        this.router = router;
    }
    SalepointGuard.prototype.canLoad = function (route) {
        var url = route.path;
        return this.authorize(url);
    };
    SalepointGuard.prototype.canActivateChild = function (childRoute, state) {
        var url = state.url;
        return this.authorize(url);
    };
    SalepointGuard.prototype.canActivate = function (route, state) {
        var url = state.url;
        return this.authorize(url);
    };
    SalepointGuard.prototype.authorize = function (url) {
        var _this = this;
        return this.sessionService.checkLogin().map(function (valid) {
            if (!valid) {
                _this.sessionService.redirectUrl = url;
                _this.router.navigate(['/login']);
                return false;
            }
            return _this.sessionService.hasRole(Roles_1.Roles.SalePoint);
        }, function (error) {
            _this.sessionService.redirectUrl = url;
            _this.router.navigate(['/login']);
            return Observable_1.Observable.of(false);
        });
    };
    SalepointGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [SessionService_1.SessionService, router_1.Router])
    ], SalepointGuard);
    return SalepointGuard;
}());
exports.SalepointGuard = SalepointGuard;
//# sourceMappingURL=SalepointGuard.js.map