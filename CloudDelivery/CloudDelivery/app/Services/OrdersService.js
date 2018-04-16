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
var OrdersCountFilters_1 = require("../Models/Orders/OrdersCountFilters");
var OrdersService = /** @class */ (function () {
    function OrdersService(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.inProgressOrdersChanged = new core_1.EventEmitter();
        this.addedOrdersChanged = new core_1.EventEmitter();
    }
    OrdersService.prototype.addOrderToInProgressList = function (order) {
        this.getLocationObject(order);
        this.inProgressOrders.push(order);
        this.inProgressOrdersChanged.emit(this.inProgressOrders);
    };
    OrdersService.prototype.addOrderToAddedList = function (order) {
        this.getLocationObject(order);
        this.addedOrders.push(order);
        this.addedOrdersChanged.emit(this.addedOrders);
    };
    OrdersService.prototype.list = function (filters) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        var body = "=" + JSON.stringify(filters);
        ;
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/orders/list', { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                console.warn("lista orders", body);
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
    OrdersService.prototype.add = function (order) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.post('/api/orders/add', order, { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                _this.addOrderToAddedList(body);
                obs.next(body);
            }, function (e) { console.error("err", e); });
        });
    };
    ;
    OrdersService.prototype.addedList = function (refresh) {
        var _this = this;
        if (this.addedList != null && refresh == false) {
            return Observable_1.Observable.of(this.addedOrders);
        }
        var headers = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/orders/AddedList', { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                _this.getLocationArray(body);
                _this.addedOrders = body;
                _this.addedOrdersChanged.emit(_this.addedOrders);
                obs.next(body);
            }, function (e) { console.error("err", e); });
        });
    };
    ;
    OrdersService.prototype.inProgressList = function (refresh) {
        var _this = this;
        if (this.inProgressOrders != null && refresh == false) {
            return Observable_1.Observable.of(this.inProgressOrders);
        }
        var headers = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/orders/InProgressList', { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                _this.getLocationArray(body);
                _this.inProgressOrders = body;
                _this.inProgressOrdersChanged.emit(_this.inProgressOrders);
                obs.next(body);
            }, function (e) { console.error("err", e); });
        });
    };
    ;
    OrdersService.prototype.cancel = function (orderId) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/orders/cancel', { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
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
    OrdersService.prototype.todayCount = function () {
        var _this = this;
        var filters = new OrdersCountFilters_1.OrdersCountFilters();
        var today = new Date();
        filters.StartTime = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toDateString();
        var headers = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/orders/Count', { headers: headers, params: filters }).subscribe(function (data) {
                obs.next(+data["_body"]);
            }, function (e) { console.error("err", e); });
        });
    };
    OrdersService.prototype.lastWeekCount = function () {
        var _this = this;
        var filters = new OrdersCountFilters_1.OrdersCountFilters();
        var today = new Date();
        filters.StartTime = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).toDateString();
        var headers = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/orders/Count', { headers: headers, params: filters }).subscribe(function (data) {
                obs.next(+data["_body"]);
            }, function (e) { console.error("err", e); });
        });
    };
    OrdersService.prototype.lastMonthCount = function () {
        var _this = this;
        var filters = new OrdersCountFilters_1.OrdersCountFilters();
        var today = new Date();
        filters.StartTime = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()).toDateString();
        var headers = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/orders/Count', { headers: headers, params: filters }).subscribe(function (data) {
                obs.next(+data["_body"]);
            }, function (e) { console.error("err", e); });
        });
    };
    OrdersService.prototype.getLocationArray = function (orders) {
        for (var i = 0; i < orders.length; i++) {
            var order = orders[i];
            //endlatlng
            if (order.EndLatLng == "" || order.EndLatLng == null)
                continue;
            try {
                order.EndLatLng = JSON.parse(order.EndLatLng);
            }
            catch (ex) {
                console.warn("err,", ex);
            }
            //salepoint
            if (order.SalepointLatLng == "" || order.SalepointLatLng == null)
                continue;
            try {
                order.SalepointLatLng = JSON.parse(order.SalepointLatLng);
            }
            catch (ex) {
                console.warn("err,", ex);
            }
            console.warn(order.EndLatLng);
        }
    };
    OrdersService.prototype.getLocationObject = function (order) {
        if (order.EndLatLng == "" || order.EndLatLng == null)
            return;
        try {
            order.EndLatLng = JSON.parse(order.EndLatLng);
        }
        catch (ex) {
            console.warn("err,", ex);
        }
        if (order.SalepointLatLng == "" || order.SalepointLatLng == null)
            return;
        try {
            order.SalepointLatLng = JSON.parse(order.SalepointLatLng);
        }
        catch (ex) {
            console.warn("err,", ex);
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