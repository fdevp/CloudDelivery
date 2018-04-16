"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var OrdersService_1 = require("./OrdersService");
var SignalrService_1 = require("../SignalrService");
var ToastFactoryService_1 = require("../UI/ToastFactoryService");
var OrdersCountFilters_1 = require("../../Models/Orders/OrdersCountFilters");
var CarrierOrdersService = /** @class */ (function (_super) {
    __extends(CarrierOrdersService, _super);
    function CarrierOrdersService(http, sessionService, signalrService, toastsService) {
        var _this = _super.call(this, http, sessionService) || this;
        _this.http = http;
        _this.sessionService = sessionService;
        _this.signalrService = signalrService;
        _this.toastsService = toastsService;
        _this.pendingOrdersChanged = new core_1.EventEmitter();
        _this.setWebsocketsEventsHandlers();
        return _this;
    }
    CarrierOrdersService.prototype.pendingList = function (refresh) {
        var _this = this;
        if (this.pendingOrders != null && refresh == false) {
            return Observable_1.Observable.of(this.pendingOrders);
        }
        var headers = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/orders/PendingList', { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                _this.getLocationArray(body);
                _this.pendingOrders = body;
                _this.pendingOrdersChanged.emit(_this.pendingOrders);
                obs.next(body);
            }, function (e) { console.error("err", e); });
        });
    };
    ;
    CarrierOrdersService.prototype.setWebsocketsEventsHandlers = function () {
        var _this = this;
        this.signalrService.carrierOrderAccepted.subscribe(function (orderId) { return _this.websocketOrderAccepted(orderId); });
        this.signalrService.carrierOrderAdded.subscribe(function (order) { return _this.websocketOrderAdded(order); });
        this.signalrService.carrierOrderCancelled.subscribe(function (orderId) { return _this.websocketOrderCancelled(orderId); });
    };
    CarrierOrdersService.prototype.websocketOrderAccepted = function (orderId) {
        var orderIndex = this.pendingOrders.findIndex(function (x) { return x.Id == orderId; });
        if (orderIndex < 0)
            return;
        this.pendingOrders.splice(orderIndex, 1);
        this.pendingOrdersChanged.emit(this.pendingOrders);
    };
    CarrierOrdersService.prototype.websocketOrderCancelled = function (orderId) {
        var orderIndex = this.pendingOrders.findIndex(function (x) { return x.Id == orderId; });
        if (orderIndex < 0)
            return;
        this.pendingOrders.splice(orderIndex, 1);
        this.pendingOrdersChanged.emit(this.pendingOrders);
    };
    CarrierOrdersService.prototype.websocketOrderAdded = function (order) {
        this.toastsService.toastr.info("Do: " + order.DestinationAddress, "Dodano zamówienie");
        this.getLocationObject(order);
        this.pendingOrders.push(order);
        this.pendingOrdersChanged.emit(this.pendingOrders);
    };
    CarrierOrdersService.prototype.todayCount = function () {
        var _this = this;
        var filters = new OrdersCountFilters_1.OrdersCountFilters();
        var today = new Date();
        filters.AcceptedTimeStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toDateString();
        var headers = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/orders/Count', { headers: headers, params: filters }).subscribe(function (data) {
                obs.next(+data["_body"]);
            }, function (e) { console.error("err", e); });
        });
    };
    CarrierOrdersService.prototype.lastWeekCount = function () {
        var _this = this;
        var filters = new OrdersCountFilters_1.OrdersCountFilters();
        var today = new Date();
        filters.AcceptedTimeStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).toDateString();
        var headers = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/orders/Count', { headers: headers, params: filters }).subscribe(function (data) {
                obs.next(+data["_body"]);
            }, function (e) { console.error("err", e); });
        });
    };
    CarrierOrdersService.prototype.lastMonthCount = function () {
        var _this = this;
        var filters = new OrdersCountFilters_1.OrdersCountFilters();
        var today = new Date();
        filters.AcceptedTimeStart = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()).toDateString();
        var headers = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/orders/Count', { headers: headers, params: filters }).subscribe(function (data) {
                obs.next(+data["_body"]);
            }, function (e) { console.error("err", e); });
        });
    };
    CarrierOrdersService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, SessionService_1.SessionService, SignalrService_1.SignalrService, ToastFactoryService_1.ToastFactoryService])
    ], CarrierOrdersService);
    return CarrierOrdersService;
}(OrdersService_1.OrdersService));
exports.CarrierOrdersService = CarrierOrdersService;
//# sourceMappingURL=CarrierOrdersService.js.map