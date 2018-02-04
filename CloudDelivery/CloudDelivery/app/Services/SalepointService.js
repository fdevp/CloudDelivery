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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var SessionService_1 = require("../Services/SessionService");
require("rxjs/add/observable/of");
require("rxjs/Rx");
var SalepointService = /** @class */ (function () {
    function SalepointService(http, sessionServ) {
        this.http = http;
        this.sessionServ = sessionServ;
        this.sessionService = sessionServ;
    }
    SalepointService.prototype.list = function () {
        var _this = this;
        var hdrz = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/Salepoints/list', { headers: hdrz }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            }, function (e) { console.error("err", e); });
        });
    };
    SalepointService.prototype.listOrg = function (orgId) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        var url = '/api/Salepoints/details/' + orgId;
        return new Observable_1.Observable(function (obs) {
            return _this.http.get(url, { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            });
        });
    };
    SalepointService.prototype.details = function (userId) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        var url = '/api/Salepoints/details/' + userId;
        return new Observable_1.Observable(function (obs) {
            return _this.http.get(url, { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            });
        });
    };
    SalepointService.prototype.setCity = function (userId, city) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        var body = "=" + city;
        var url = '/api/Salepoints/city/' + userId;
        return new Observable_1.Observable(function (obs) {
            return _this.http.put(url, body, { headers: headers }).subscribe(function (data) {
                obs.next(true);
            });
        });
    };
    SalepointService.prototype.setAddress = function (userId, address) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        var body = "=" + address;
        var url = '/api/Salepoints/address/' + userId;
        return new Observable_1.Observable(function (obs) {
            return _this.http.put(url, body, { headers: headers }).subscribe(function (data) {
                obs.next(true);
            });
        });
    };
    SalepointService.prototype.setLatLng = function (userId, latlng) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        var body = "=" + latlng;
        var url = '/api/Salepoints/latlng/' + userId;
        return new Observable_1.Observable(function (obs) {
            return _this.http.put(url, body, { headers: headers }).subscribe(function (data) {
                obs.next(true);
            });
        });
    };
    SalepointService.prototype.setColor = function (userId, color) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        var body = "=" + color;
        var url = '/api/Salepoints/color/' + userId;
        return new Observable_1.Observable(function (obs) {
            return _this.http.put(url, body, { headers: headers }).subscribe(function (data) {
                obs.next(true);
            });
        });
    };
    SalepointService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, SessionService_1.SessionService])
    ], SalepointService);
    return SalepointService;
}());
exports.SalepointService = SalepointService;
//# sourceMappingURL=SalepointService.js.map