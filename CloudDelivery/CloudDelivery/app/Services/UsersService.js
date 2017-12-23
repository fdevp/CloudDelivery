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
var UsersService = /** @class */ (function () {
    function UsersService(http, sessionServ) {
        this.http = http;
        this.sessionServ = sessionServ;
        this.usersList = [];
        this.listInitialized = false;
        this.sessionService = sessionServ;
    }
    UsersService.prototype.create = function (model) {
        var _this = this;
        var hdrz = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.post('/api/account/register', model, { headers: hdrz }).subscribe(function (data) {
                console.log(data);
                var body = JSON.parse(data["_body"]);
                var id = parseInt(body);
                obs.next(id);
            }, function (err) { obs.error(err); });
        });
    };
    UsersService.prototype.list = function (refresh) {
        var _this = this;
        if (!refresh && this.listInitialized) {
            return Observable_1.Observable.of(this.usersList);
        }
        var hdrz = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/users/list', { headers: hdrz }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                _this.usersList = body;
                _this.listInitialized = true;
                obs.next(_this.usersList);
            }, function (e) { console.error("err", e); obs.next(_this.usersList); });
        });
    };
    UsersService.prototype.details = function (userId) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        var url = '/api/users/details/' + userId;
        return new Observable_1.Observable(function (obs) {
            return _this.http.get(url, { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            });
        });
    };
    UsersService.prototype.remove = function (userId) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        var url = '/api/Users/Remove/' + userId;
        return new Observable_1.Observable(function (obs) {
            return _this.http.delete(url, { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                console.error("get", body);
            });
        });
    };
    UsersService.prototype.roles = function () {
        return ["admin", "carrier", "salepoint", "organisator"];
    };
    UsersService.prototype.edit = function (userId, phone, description) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        var body = { "phone": phone, "description": description };
        var url = '/api/users/edit/' + userId;
        return new Observable_1.Observable(function (obs) {
            return _this.http.put('/api/users/edit', body, { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                console.error("get", body);
            });
        });
    };
    UsersService.prototype.setOrganisation = function (userId, organisationId) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        var body = { "organisationId": organisationId };
        return new Observable_1.Observable(function (obs) {
            return _this.http.put('/api/users/organisation', body, { headers: headers }).subscribe(function (data) {
                console.error("org data status", data.status);
            });
        });
    };
    UsersService.prototype.setRole = function (userId, role) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        var body = { "organisationId": role };
        return new Observable_1.Observable(function (obs) {
            return _this.http.put('/api/users/organisation', body, { headers: headers }).subscribe(function (data) {
                console.error("org data status", data.status);
            });
        });
    };
    UsersService.prototype.setPhone = function (userId, organisationId) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        var body = { "organisationId": organisationId };
        return new Observable_1.Observable(function (obs) {
            return _this.http.put('/api/users/organisation', body, { headers: headers }).subscribe(function (data) {
                console.error("org data status", data.status);
            });
        });
    };
    UsersService.prototype.setName = function (userId, organisationId) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        var body = { "organisationId": organisationId };
        return new Observable_1.Observable(function (obs) {
            return _this.http.put('/api/users/organisation', body, { headers: headers }).subscribe(function (data) {
                console.error("org data status", data.status);
            });
        });
    };
    UsersService.prototype.setDescription = function (userId, organisationId) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        var body = { "organisationId": organisationId };
        return new Observable_1.Observable(function (obs) {
            return _this.http.put('/api/users/organisation', body, { headers: headers }).subscribe(function (data) {
                console.error("org data status", data.status);
            });
        });
    };
    UsersService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, SessionService_1.SessionService])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=UsersService.js.map