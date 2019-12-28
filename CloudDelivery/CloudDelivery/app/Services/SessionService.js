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
var SignalrService_1 = require("./SignalrService");
var Roles_1 = require("../Models/Enums/Roles");
require("rxjs/add/observable/of");
require("rxjs/Rx");
var SessionService = /** @class */ (function () {
    function SessionService(router, http, signalrService) {
        this.router = router;
        this.http = http;
        this.signalrService = signalrService;
        this.isLoggedIn = false;
        this.redirectUrl = null;
        this.tokenInitializing = false;
        this.user = new SessionUser_1.SessionUser();
    }
    SessionService.prototype.checkRefreshToken = function () {
        this.tokenInitializing = true;
        //logged before
        if (this.isLoggedIn)
            return Observable_1.Observable.of(true);
        //try login by token
        var refreshToken = localStorage.getItem("cdskey");
        if (refreshToken == null) {
            return Observable_1.Observable.of(false);
        }
        var loginBody = "grant_type=refresh_token&refresh_token=" + refreshToken;
        return this.login(loginBody);
    };
    SessionService.prototype.authHeader = function () {
        var httpHeaders = new http_1.Headers();
        httpHeaders.append("Authorization", "Bearer " + this.token);
        return httpHeaders;
    };
    SessionService.prototype.login = function (loginBody) {
        var _this = this;
        return new Observable_1.Observable(function (obs) {
            var loginHeaders = new http_1.Headers();
            loginHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            _this.http.post('/token', loginBody, { headers: loginHeaders }).map(function (data) { return data.json(); }).subscribe(function (data) {
                //set data
                _this.token = data["access_token"];
                _this.user.name = data["Name"];
                _this.user.login = data["Login"];
                _this.user.roles = JSON.parse(data["Roles"]);
                var refreshToken = data["refresh_token"];
                if (refreshToken) {
                    _this.saveToken(refreshToken);
                }
                _this.isLoggedIn = true;
                _this.tokenInitializing = false;
                _this.startWebsockets();
                if (_this.redirectUrl != null) {
                    _this.router.navigate([_this.redirectUrl]);
                    _this.redirectUrl = null;
                }
                obs.next(true);
            }, function (error) { return obs.next(false); });
        });
    };
    SessionService.prototype.startWebsockets = function () {
        this.signalrService.setAuthHeader(this.token);
        var role;
        if (this.hasRole(Roles_1.Roles.SalePoint))
            role = Roles_1.Roles.SalePoint;
        else if (this.hasRole(Roles_1.Roles.Carrier))
            role = Roles_1.Roles.Carrier;
        else if (this.isAdmin())
            role = Roles_1.Roles.Admin;
        this.signalrService.setCallbacks(role);
        this.signalrService.startConnection();
    };
    SessionService.prototype.isAdmin = function () {
        if (this.user.roles == null)
            return false;
        return this.user.roles.indexOf(Roles_1.Roles.Admin) > -1;
    };
    SessionService.prototype.hasRole = function (role) {
        if (this.user.roles == null)
            return false;
        return this.user.roles.indexOf(role) > -1;
    };
    SessionService.prototype.logout = function () {
        var _this = this;
        var refreshToken = localStorage.getItem("cdskey");
        this.cancelCurrentToken(refreshToken).subscribe(function () {
            _this.removeToken();
            _this.isLoggedIn = false;
            _this.user = new SessionUser_1.SessionUser();
            _this.router.navigate(["./login"]);
        });
    };
    SessionService.prototype.refreshTokens = function () {
        var _this = this;
        var path = '/api/Account/tokens';
        return new Observable_1.Observable(function (obs) {
            return _this.http.get(path, { headers: _this.authHeader() }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            }, function (e) { console.error("err", e); });
        });
        /*var path = '/api/Account/tokens';

        return new Observable((obs: Observer<RefreshTokenInfo[]>) => {
            return this.http.get(path).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            }, e => { console.error("err", e); })
        });*/
    };
    SessionService.prototype.cancelToken = function (token) {
        var _this = this;
        var path = '/api/Account/cancelToken/' + token;
        return new Observable_1.Observable(function (obs) {
            return _this.http.put(path, {}, { headers: _this.authHeader() }).subscribe(function (data) {
                obs.next(true);
            }, function (e) { console.error("err", e); });
        });
    };
    SessionService.prototype.cancelCurrentToken = function (token) {
        var _this = this;
        var path = '/api/Account/cancelToken/';
        var body = { token: token };
        return new Observable_1.Observable(function (obs) {
            return _this.http.put(path, body, { headers: _this.authHeader() }).subscribe(function (data) {
                obs.next(true);
            }, function (e) { console.error("err", e); });
        });
    };
    SessionService.prototype.getBrowserInfo = function () {
        var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null)
                return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null)
            M.splice(1, 1, tem[1]);
        return M.join(' ');
    };
    SessionService.prototype.removeToken = function () {
        this.token = null;
        localStorage.removeItem("cdskey");
    };
    SessionService.prototype.saveToken = function (token) {
        localStorage.setItem("cdskey", token);
    };
    SessionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, http_1.Http, SignalrService_1.SignalrService])
    ], SessionService);
    return SessionService;
}());
exports.SessionService = SessionService;
//# sourceMappingURL=SessionService.js.map