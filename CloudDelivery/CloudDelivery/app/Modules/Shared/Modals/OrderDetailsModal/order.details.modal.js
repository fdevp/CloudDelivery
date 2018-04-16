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
var OrderDetails_1 = require("../../../../Models/Orders/OrderDetails");
var OrdersService_1 = require("../../../../Services/OrdersService");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var SessionService_1 = require("../../../../Services/SessionService");
var GMapsService_1 = require("../../../../Services/GMapsService");
var Roles_1 = require("../../../../Models/Enums/Roles");
var OrderDetailsModal = /** @class */ (function () {
    function OrderDetailsModal(bsModalRef, ordersService, sessionService, gMapsService) {
        this.bsModalRef = bsModalRef;
        this.ordersService = ordersService;
        this.sessionService = sessionService;
        this.gMapsService = gMapsService;
        this.details = new OrderDetails_1.OrderDetails();
        this.detailsProgress = true;
        this.modalClosed = new core_1.EventEmitter();
        this.baseLocation = gMapsService.getBaseLocation();
    }
    OrderDetailsModal.prototype.isAdmin = function () {
        return this.sessionService.isAdmin();
    };
    OrderDetailsModal.prototype.isCarrier = function () {
        return this.sessionService.hasRole(Roles_1.Roles.Carrier);
    };
    OrderDetailsModal.prototype.isSalepoint = function () {
        return this.sessionService.hasRole(Roles_1.Roles.SalePoint);
    };
    OrderDetailsModal.prototype.initOrderDetails = function (orderId) {
        var _this = this;
        this.orderId = orderId;
        this.ordersService.details(this.orderId).subscribe(function (orderDetails) {
            _this.details = orderDetails;
            _this.detailsProgress = false;
            if (_this.details.EndLatLng != null)
                _this.baseLocation = _this.details.EndLatLng;
        });
    };
    OrderDetailsModal.prototype.closeModal = function () {
        this.modalClosed.emit();
        this.bsModalRef.hide();
    };
    OrderDetailsModal = __decorate([
        core_1.Component({
            selector: 'order-details-modal',
            templateUrl: './order.details.modal.html',
            styleUrls: ['./order.details.modal.css']
        }),
        __metadata("design:paramtypes", [ngx_bootstrap_1.BsModalRef, typeof (_a = typeof OrdersService_1.OrdersService !== "undefined" && OrdersService_1.OrdersService) === "function" && _a || Object, SessionService_1.SessionService, GMapsService_1.GMapsService])
    ], OrderDetailsModal);
    return OrderDetailsModal;
    var _a;
}());
exports.OrderDetailsModal = OrderDetailsModal;
//# sourceMappingURL=order.details.modal.js.map