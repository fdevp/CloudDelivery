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
var SessionService_1 = require("../../Services/SessionService");
require("rxjs/add/observable/of");
require("rxjs/Rx");
var OrganisationsService = /** @class */ (function () {
    function OrganisationsService(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.lista = new Array();
    }
    OrganisationsService.prototype.refreshList = function () {
    };
    OrganisationsService.prototype.list = function () {
        var _this = this;
        var headers = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/organisations/list', { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                _this.lista = body;
                obs.next(_this.lista);
            }, function (e) { console.error("err", e); });
        });
    };
    OrganisationsService.prototype.members = function (organisationId) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        var url = '/api/organisations/members/' + organisationId;
        return new Observable_1.Observable(function (obs) {
            return _this.http.get(url, { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            });
        });
    };
    OrganisationsService.prototype.setName = function (userId, name) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        var body = "=" + name;
        var url = '/api/organisations/name/' + userId;
        return new Observable_1.Observable(function (obs) {
            return _this.http.put(url, body, { headers: headers }).subscribe(function (data) {
                obs.next(true);
            });
        });
    };
    OrganisationsService.prototype.add = function (name) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        var body = "=" + name;
        return new Observable_1.Observable(function (obs) {
            return _this.http.post('/api/Organisations/Add', body, { headers: headers }).subscribe(function (data) {
                obs.next(true);
            }, function (err) { obs.next(false); });
        });
    };
    OrganisationsService.prototype.remove = function (organisationId) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        var url = '/api/users/remove/' + organisationId;
        return new Observable_1.Observable(function (obs) {
            return _this.http.delete(url, { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                console.error("get", body);
            });
        });
    };
    OrganisationsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, SessionService_1.SessionService])
    ], OrganisationsService);
    return OrganisationsService;
}());
exports.OrganisationsService = OrganisationsService;
//# sourceMappingURL=OrganisationsService.js.map