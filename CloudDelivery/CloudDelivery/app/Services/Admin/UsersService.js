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
var UsersService = /** @class */ (function () {
    function UsersService(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
    }
    UsersService.prototype.create = function (model) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.post('/api/account/register', model, { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                var id = parseInt(body);
                obs.next(id);
            }, function (err) { obs.error(err); });
        });
    };
    UsersService.prototype.changePassword = function (userId, newPassword) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/json");
        var body = { Id: userId, NewPassword: newPassword };
        var url = '/api/Account/SetPassword';
        return new Observable_1.Observable(function (obs) {
            return _this.http.post(url, body, { headers: headers }).subscribe(function (data) {
                obs.next(true);
            }, function (err) {
                obs.next(false);
            });
        });
    };
    UsersService.prototype.refreshList = function () {
    };
    UsersService.prototype.list = function () {
        var _this = this;
        var headers = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/users/list', { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            }, function (e) { console.error("err", e); });
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
                obs.next(true);
            }, function (err) {
                obs.next(false);
            });
        });
    };
    UsersService.prototype.roles = function () {
        return ["admin", "carrier", "salepoint", "organisator"];
    };
    UsersService.prototype.setOrganisation = function (userId, organisationId) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        var body = "=" + organisationId;
        var url = '/api/users/organisation/' + userId;
        return new Observable_1.Observable(function (obs) {
            return _this.http.put(url, body, { headers: headers }).subscribe(function (data) {
                obs.next(true);
            });
        });
    };
    UsersService.prototype.setRole = function (userId, role) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        var body = "=" + role;
        var url = '/api/users/role/' + userId;
        return new Observable_1.Observable(function (obs) {
            return _this.http.put(url, body, { headers: headers }).subscribe(function (data) {
                obs.next(true);
            });
        });
    };
    UsersService.prototype.setPhone = function (userId, phone) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        var body = "=" + phone;
        var url = '/api/users/phone/' + userId;
        return new Observable_1.Observable(function (obs) {
            return _this.http.put(url, body, { headers: headers }).subscribe(function (data) {
                obs.next(true);
            });
        });
    };
    UsersService.prototype.setName = function (userId, name) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        var body = "=" + name;
        var url = '/api/users/name/' + userId;
        return new Observable_1.Observable(function (obs) {
            return _this.http.put(url, body, { headers: headers }).subscribe(function (data) {
                obs.next(true);
            });
        });
    };
    UsersService.prototype.setDescription = function (userId, description) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        var body = "=" + description;
        var url = '/api/users/description/' + userId;
        return new Observable_1.Observable(function (obs) {
            return _this.http.put(url, body, { headers: headers }).subscribe(function (data) {
                obs.next(true);
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