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
var OrderStatus_1 = require("../../../Models/Enums/OrderStatus");
var OrderStatusPipe = /** @class */ (function () {
    function OrderStatusPipe() {
    }
    OrderStatusPipe.prototype.transform = function (value) {
        var name = "";
        switch (value) {
            case OrderStatus_1.OrderStatus.Accepted:
                name = "Zaakceptowano";
                break;
            case OrderStatus_1.OrderStatus.Added:
                name = "Dodano";
                break;
            case OrderStatus_1.OrderStatus.Cancelled:
                name = "Anulowano";
                break;
            case OrderStatus_1.OrderStatus.Delivered:
                name = "Dostarczono";
                break;
            case OrderStatus_1.OrderStatus.InDelivery:
                name = "W trakcie dostawy";
                break;
        }
        return name;
    };
    OrderStatusPipe = __decorate([
        core_1.Pipe({ name: 'orderStatus' }),
        __metadata("design:paramtypes", [])
    ], OrderStatusPipe);
    return OrderStatusPipe;
}());
exports.OrderStatusPipe = OrderStatusPipe;
//# sourceMappingURL=OrderStatusPipe.js.map