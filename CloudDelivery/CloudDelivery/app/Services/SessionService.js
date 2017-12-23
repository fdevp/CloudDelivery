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
var SessionUser_1 = require("../Models/Session/SessionUser");
var http_1 = require("@angular/http");
require("rxjs/add/observable/of");
require("rxjs/Rx");
var SessionService = /** @class */ (function () {
    function SessionService(router, http) {
        this.router = router;
        this.http = http;
        this.isLoggedIn = false;
        this.redirectUrl = null;
        this.user = new SessionUser_1.SessionUser();
    }
    SessionService.prototype.checkLogin = function () {
        var _this = this;
        //logged before
        if (this.isLoggedIn)
            return Observable_1.Observable.of(true);
        //try login by token
        this.token = sessionStorage.getItem("cdskey");
        if (this.token == null)
            return Observable_1.Observable.of(false);
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/account/UserInfo', { headers: _this.authHeader() }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                _this.user.name = body.Name;
                _this.user.login = body.Login;
                _this.user.roles = JSON.parse(body.Roles);
                _this.isLoggedIn = true;
                if (_this.redirectUrl != null) {
                    _this.router.navigate([_this.redirectUrl]);
                    _this.redirectUrl = null;
                }
                obs.next(true);
            }, function (error) {
                _this.removeToken();
                obs.next(false);
            });
        });
    };
    SessionService.prototype.authHeader = function () {
        var httpHeaders = new http_1.Headers();
        httpHeaders.append("Authorization", "Bearer " + this.token);
        return httpHeaders;
    };
    SessionService.prototype.login = function (email, password) {
        var _this = this;
        return new Observable_1.Observable(function (obs) {
            var loginBody = "grant_type=password&username=" + email + "&password=" + password;
            var loginHeaders = new http_1.Headers();
            loginHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            _this.http.post('/token', loginBody, { headers: loginHeaders }).map(function (data) { return data.json(); }).subscribe(function (data) {
                //set data
                _this.token = data["access_token"];
                _this.user.name = data["Login"];
                _this.user.login = data["Name"];
                _this.user.roles = JSON.parse(data["roles"]);
                _this.saveToken();
                _this.isLoggedIn = true;
                if (_this.redirectUrl != null) {
                    _this.router.navigate([_this.redirectUrl]);
                    _this.redirectUrl = null;
                }
                obs.next(true);
            }, function (error) { return obs.error(error); });
        });
    };
    SessionService.prototype.isAdmin = function () {
        if (this.user.roles == null)
            return false;
        return this.user.roles.indexOf("admin") > -1;
    };
    SessionService.prototype.hasRole = function (role) {
        if (this.user.roles == null)
            return false;
        return this.user.roles.indexOf(role) > -1;
    };
    SessionService.prototype.logout = function () {
        this.removeToken();
        this.isLoggedIn = false;
        this.user = new SessionUser_1.SessionUser();
        this.router.navigate(["/"]);
    };
    SessionService.prototype.removeToken = function () {
        this.token = null;
        sessionStorage.removeItem("cdskey");
    };
    SessionService.prototype.saveToken = function () {
        sessionStorage.setItem("cdskey", this.token);
    };
    SessionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, http_1.Http])
    ], SessionService);
    return SessionService;
}());
exports.SessionService = SessionService;
//# sourceMappingURL=SessionService.js.map