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
var OrdersService = /** @class */ (function () {
    function OrdersService(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.countersIncrease = new core_1.EventEmitter();
    }
    OrdersService.prototype.list = function (filters) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        var body = "=" + JSON.stringify(filters);
        ;
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/orders/list', { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            }, function (e) { console.error("err", e); });
        });
    };
    ;
    OrdersService.prototype.details = function (orderId) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        var path = '/api/orders/details/' + orderId;
        return new Observable_1.Observable(function (obs) {
            return _this.http.get(path, { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                _this.getLocationObject(body);
                obs.next(body);
            }, function (e) { console.error("err", e); });
        });
    };
    ;
    OrdersService.prototype.discard = function (orderId) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/orders/discard', { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            }, function (e) { console.error("err", e); });
        });
    };
    ;
    OrdersService.prototype.getLocationArray = function (orders) {
        for (var _i = 0, orders_1 = orders; _i < orders_1.length; _i++) {
            var order = orders_1[_i];
            //endlatlng
            if (order.EndLatLng == "" || order.EndLatLng == null)
                continue;
            try {
                order.EndLatLng = JSON.parse(order.EndLatLng);
            }
            catch (ex) {
                console.error("err,", ex);
            }
            //salepoint
            if (order.SalepointLatLng == "" || order.SalepointLatLng == null)
                continue;
            try {
                order.SalepointLatLng = JSON.parse(order.SalepointLatLng);
            }
            catch (ex) {
                console.error("err,", ex);
            }
        }
    };
    OrdersService.prototype.getLocationObject = function (order) {
        if (order.EndLatLng != null) {
            try {
                order.EndLatLng = JSON.parse(order.EndLatLng);
            }
            catch (ex) {
                console.error("err,", ex);
            }
        }
        if (order.SalepointLatLng != null) {
            try {
                order.SalepointLatLng = JSON.parse(order.SalepointLatLng);
            }
            catch (ex) {
                console.error("err,", ex);
            }
        }
    };
    OrdersService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, SessionService_1.SessionService])
    ], OrdersService);
    return OrdersService;
}());
exports.OrdersService = OrdersService;
//# sourceMappingURL=OrdersService.js.map