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
var OrderStatus_1 = require("../../Models/Enums/OrderStatus");
var SignalrService_1 = require("../SignalrService");
var ToastFactoryService_1 = require("../UI/ToastFactoryService");
var OrdersCountFilters_1 = require("../../Models/Orders/OrdersCountFilters");
var SalepointOrdersService = /** @class */ (function (_super) {
    __extends(SalepointOrdersService, _super);
    function SalepointOrdersService(http, sessionService, signalrService, toastsService) {
        var _this = _super.call(this, http, sessionService) || this;
        _this.http = http;
        _this.sessionService = sessionService;
        _this.signalrService = signalrService;
        _this.toastsService = toastsService;
        _this.inProgressOrdersChanged = new core_1.EventEmitter();
        _this.addedOrdersChanged = new core_1.EventEmitter();
        _this.inProgressOrders = new Array();
        _this.addedOrders = new Array();
        _this.setWebsocketsEventsHandlers();
        return _this;
    }
    SalepointOrdersService.prototype.removeOrderFromInProgressList = function (orderId) {
        var orderIndex = this.inProgressOrders.findIndex(function (x) { return x.Id == orderId; });
        if (orderIndex < 0)
            return;
        this.inProgressOrders.splice(orderIndex, 1);
        this.inProgressOrdersChanged.emit(this.inProgressOrders);
    };
    SalepointOrdersService.prototype.removeOrderFromAddedList = function (orderId) {
        var orderIndex = this.addedOrders.findIndex(function (x) { return x.Id == orderId; });
        if (orderIndex < 0)
            return;
        this.addedOrders.splice(orderIndex, 1);
        this.addedOrdersChanged.emit(this.addedOrders);
    };
    SalepointOrdersService.prototype.changeOrderStatus = function (orderId, status) {
        var orderIndex = this.addedOrders.findIndex(function (x) { return x.Id == orderId; });
        if (orderIndex < 0)
            return;
        this.addedOrders[orderIndex].Status = status;
    };
    SalepointOrdersService.prototype.add = function (order) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.post('/api/orders/add', order, { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                _this.addedOrders.push(body);
                _this.addedOrdersChanged.emit(_this.addedOrders);
                _this.countersIncrease.emit();
                obs.next(body);
            }, function (e) { console.error("err", e); });
        });
    };
    ;
    SalepointOrdersService.prototype.cancel = function (inprogress, orderId) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        var url = '/api/orders/cancel/' + orderId;
        return new Observable_1.Observable(function (obs) {
            return _this.http.put(url, { headers: headers }).subscribe(function (data) {
                if (inprogress)
                    _this.removeOrderFromInProgressList(orderId);
                else
                    _this.removeOrderFromAddedList(orderId);
            }, function (e) { console.error("err", e); });
        });
    };
    ;
    SalepointOrdersService.prototype.addedList = function (refresh) {
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
    SalepointOrdersService.prototype.inProgressList = function (refresh) {
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
    SalepointOrdersService.prototype.todayCount = function () {
        var _this = this;
        var filters = new OrdersCountFilters_1.OrdersCountFilters();
        var today = new Date();
        filters.AddedTimeStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toDateString();
        var headers = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/orders/Count', { headers: headers, params: filters }).subscribe(function (data) {
                obs.next(+data["_body"]);
            }, function (e) { console.error("err", e); });
        });
    };
    SalepointOrdersService.prototype.lastWeekCount = function () {
        var _this = this;
        var filters = new OrdersCountFilters_1.OrdersCountFilters();
        var today = new Date();
        filters.AddedTimeStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).toDateString();
        var headers = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/orders/Count', { headers: headers, params: filters }).subscribe(function (data) {
                obs.next(+data["_body"]);
            }, function (e) { console.error("err", e); });
        });
    };
    SalepointOrdersService.prototype.lastMonthCount = function () {
        var _this = this;
        var filters = new OrdersCountFilters_1.OrdersCountFilters();
        var today = new Date();
        filters.AddedTimeStart = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()).toDateString();
        var headers = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/orders/Count', { headers: headers, params: filters }).subscribe(function (data) {
                obs.next(+data["_body"]);
            }, function (e) { console.error("err", e); });
        });
    };
    SalepointOrdersService.prototype.setWebsocketsEventsHandlers = function () {
        var _this = this;
        this.signalrService.salepointOrderAccepted.subscribe(function (order) { return _this.websocketOrderAccepted(order); });
        this.signalrService.salepointOrderDelivered.subscribe(function (orderId) { return _this.websocketOrderDelivered(orderId); });
        this.signalrService.salepointOrderPickedUp.subscribe(function (orderId) { return _this.websocketOrderPickedUp(orderId); });
    };
    SalepointOrdersService.prototype.websocketOrderAccepted = function (order) {
        this.toastsService.toastr.info("Do: " + order.DestinationAddress + "\nKierowca: " + order.CarrierName, "Zaakceptowano zamówienie");
        this.getLocationObject(order);
        var addedOrderIndex = this.addedOrders.findIndex(function (x) { return x.Id == order.Id; });
        if (addedOrderIndex >= 0) {
            this.addedOrders.splice(addedOrderIndex, 1);
            this.addedOrdersChanged.emit(this.addedOrders);
        }
        this.inProgressOrders.push(order);
        this.inProgressOrdersChanged.emit(this.inProgressOrders);
    };
    SalepointOrdersService.prototype.websocketOrderDelivered = function (orderId) {
        var orderIndex = this.inProgressOrders.findIndex(function (x) { return x.Id == orderId; });
        if (orderIndex < 0)
            return;
        var message = "Do: " + this.inProgressOrders[orderIndex].DestinationAddress;
        this.toastsService.toastr.info(message, "Kierowca dostarczył zamówienie.");
        this.inProgressOrders.splice(orderIndex, 1);
        this.inProgressOrdersChanged.emit(this.inProgressOrders);
    };
    SalepointOrdersService.prototype.websocketOrderPickedUp = function (orderId) {
        var orderIndex = this.inProgressOrders.findIndex(function (x) { return x.Id == orderId; });
        if (orderIndex < 0)
            return;
        this.inProgressOrders[orderIndex].Status = OrderStatus_1.OrderStatus.InDelivery;
        this.inProgressOrdersChanged.emit(this.inProgressOrders);
    };
    SalepointOrdersService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, SessionService_1.SessionService, SignalrService_1.SignalrService, ToastFactoryService_1.ToastFactoryService])
    ], SalepointOrdersService);
    return SalepointOrdersService;
}(OrdersService_1.OrdersService));
exports.SalepointOrdersService = SalepointOrdersService;
//# sourceMappingURL=SalepointOrdersService.js.map