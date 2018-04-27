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
var SessionService_1 = require("./SessionService");
var Observable_1 = require("rxjs/Observable");
var http_1 = require("@angular/http");
var RoutesService = /** @class */ (function () {
    function RoutesService(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.routesListChanged = new core_1.EventEmitter();
    }
    RoutesService.prototype.list = function (refresh) {
        var _this = this;
        if (this.routesList != null && refresh == false) {
            return Observable_1.Observable.of(this.routesList);
        }
        var headers = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/routes/list', { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                _this.routesList = body;
                _this.routesListChanged.emit(_this.routesList);
                obs.next(body);
            }, function (e) { console.error("err", e); });
        });
    };
    RoutesService.prototype.details = function (routeId) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        var path = '/api/routes/details/' + routeId;
        return new Observable_1.Observable(function (obs) {
            return _this.http.get(path, { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                _this.getRoutePointLocationObjects(body);
                obs.next(body);
            }, function (e) { console.error("err", e); });
        });
    };
    RoutesService.prototype.getRoutePointLocationObjects = function (route) {
        for (var _i = 0, _a = route.Points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (point.Order.EndLatLng != null) {
                try {
                    point.Order.EndLatLng = JSON.parse(point.Order.EndLatLng);
                }
                catch (ex) {
                    console.error("err,", ex);
                }
            }
            if (point.Order.SalepointLatLng != null) {
                try {
                    point.Order.SalepointLatLng = JSON.parse(point.Order.SalepointLatLng);
                }
                catch (ex) {
                    console.error("err,", ex);
                }
            }
        }
    };
    RoutesService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, SessionService_1.SessionService])
    ], RoutesService);
    return RoutesService;
}());
exports.RoutesService = RoutesService;
//# sourceMappingURL=RoutesService.js.map