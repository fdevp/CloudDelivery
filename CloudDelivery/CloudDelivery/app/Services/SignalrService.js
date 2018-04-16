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
var ToastFactoryService_1 = require("./UI/ToastFactoryService");
var Roles_1 = require("../Models/Enums/Roles");
var SignalrService = /** @class */ (function () {
    function SignalrService(toastsService) {
        this.toastsService = toastsService;
        this.signalrStateChange = new core_1.EventEmitter();
        this.salepointOrderAccepted = new core_1.EventEmitter();
        this.salepointOrderDelivered = new core_1.EventEmitter();
        this.salepointOrderPickedUp = new core_1.EventEmitter();
        this.carrierOrderAccepted = new core_1.EventEmitter();
        this.carrierOrderAdded = new core_1.EventEmitter();
        this.carrierOrderCancelled = new core_1.EventEmitter();
        this.connection = $.hubConnection();
        var obj = this;
        this.connection.stateChanged(function (state) {
            obj.connectionState = state.newState;
            obj.signalrStateChange.emit(obj.connectionState);
        });
        this.proxy = this.connection.createHubProxy("NotificationsHub");
    }
    SignalrService.prototype.setAuthHeader = function (token) {
        $.signalR.ajaxDefaults.headers = token;
    };
    SignalrService.prototype.setCallbacks = function (role) {
        switch (role) {
            case Roles_1.Roles.SalePoint:
                this.setSalepointCallbacks();
                break;
            case Roles_1.Roles.Admin:
            case Roles_1.Roles.Carrier:
                this.setCarrierCallbacks(); //notifications are same for admin and carrier
                break;
        }
    };
    SignalrService.prototype.cleanConnection = function () {
        this.proxy.on("OrderAccepted", function (obj) {
        });
        this.proxy.on("OrderDelivered", function (obj) {
        });
        this.proxy.on("OrderPickedUp", function (obj) {
        });
        this.proxy.on("OrderCancelled", function (obj) {
        });
        this.proxy.on("OrderAdded", function (obj) {
        });
    };
    SignalrService.prototype.cleanAuthHeader = function () {
        $.signalR.ajaxDefaults.headers = null;
    };
    SignalrService.prototype.startConnection = function () {
        var obj = this;
        this.connection.start().done(function () {
            obj.toastsService.toastr.success(null, "Nawiązano połączenie z serwerem.");
            console.warn("signalr success");
        }).fail(function () {
            obj.toastsService.toastr.error(null, "Nawiązanie połączenia z serwerem nie powiodło się.");
            console.warn("signalr err");
        });
    };
    SignalrService.prototype.endConnection = function () {
        this.connection.stop();
    };
    SignalrService.prototype.setSalepointCallbacks = function () {
        var obj = this;
        this.proxy.on("OrderAccepted", function (order) {
            obj.salepointOrderAccepted.emit(order);
        });
        this.proxy.on("OrderDelivered", function (orderId) {
            obj.salepointOrderDelivered.emit(orderId);
        });
        this.proxy.on("OrderPickedUp", function (orderId) {
            obj.salepointOrderPickedUp.emit(orderId);
        });
    };
    SignalrService.prototype.setCarrierCallbacks = function () {
        var obj = this;
        this.proxy.on("OrderAccepted", function (orderId) {
            obj.carrierOrderAccepted.emit(orderId);
        });
        this.proxy.on("OrderCancelled", function (orderId) {
            obj.carrierOrderCancelled.emit(orderId);
        });
        this.proxy.on("OrderAdded", function (order) {
            obj.carrierOrderAdded.emit(order);
        });
    };
    SignalrService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ToastFactoryService_1.ToastFactoryService])
    ], SignalrService);
    return SignalrService;
}());
exports.SignalrService = SignalrService;
//# sourceMappingURL=SignalrService.js.map