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
var SessionService_1 = require("../SessionService");
var AuthGuard = /** @class */ (function () {
    function AuthGuard(sessionService, router) {
        this.sessionService = sessionService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        var url = state.url;
        return this.sessionService.checkLogin().map(function (valid) {
            if (!valid)
                _this.redirectToLogin(url);
            return valid;
        }, function (error) {
            _this.redirectToLogin(url);
            return error;
        });
    };
    AuthGuard.prototype.redirectToLogin = function (url) {
        this.sessionService.redirectUrl = url;
        // Navigate to the login page with extras
        this.router.navigate(['/login']);
    };
    AuthGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [SessionService_1.SessionService, router_1.Router])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=AuthGuard.js.map