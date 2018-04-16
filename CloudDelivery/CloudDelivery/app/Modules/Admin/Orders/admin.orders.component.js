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
var OrdersService_1 = require("../../../Services/OrdersService");
var router_1 = require("@angular/router");
var OrdersListFilters_1 = require("../../../Models/Orders/OrdersListFilters");
var OrderStatusPipe_1 = require("../../Shared/pipes/OrderStatusPipe");
var ShortDateTimePipe_1 = require("../../Shared/pipes/ShortDateTimePipe");
var ModalFactoryService_1 = require("../../../Services/UI/ModalFactoryService");
var AdminOrdersComponent = /** @class */ (function () {
    function AdminOrdersComponent(ordersService, router, modalService, cdr) {
        this.ordersService = ordersService;
        this.router = router;
        this.modalService = modalService;
        this.cdr = cdr;
        this.selected = [];
        this.orders = [];
        this.filters = new OrdersListFilters_1.OrdersListFilters();
        this.initialized = false;
        this.columns = [
            { prop: 'Id' },
            { prop: 'DestinationAddress', name: 'Miejsce dowozu' },
            { prop: 'SalepointName', name: 'Punkt sprzedaży' },
            { prop: 'CarrierName', name: 'Kierowca' },
            { prop: 'AddedTime', name: 'Dodano', pipe: new ShortDateTimePipe_1.ShortDateTimePipe("pl-PL") },
            { prop: 'AddedTime', name: 'Dostarczono', pipe: new ShortDateTimePipe_1.ShortDateTimePipe("pl-PL") },
            { prop: 'Status', name: 'Status', pipe: new OrderStatusPipe_1.OrderStatusPipe() }
        ];
        this.initializeOrdersList();
    }
    AdminOrdersComponent.prototype.initializeOrdersList = function () {
        var _this = this;
        this.ordersService.list(this.filters).subscribe(function (usersList) {
            _this.orders = usersList;
            _this.initialized = true;
        });
    };
    AdminOrdersComponent.prototype.orderSelect = function (_a) {
        var selected = _a.selected;
        var obj = this;
        var modal = this.modalService.showModal("OrderDetailsModal", { class: "modal-lg" });
        modal.content.initOrderDetails(selected[0].Id);
        this.modalService.onModalHide.subscribe(function (event) {
            obj.selected = [];
            obj.cdr.detectChanges();
        });
    };
    AdminOrdersComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-orders',
            templateUrl: './admin.orders.component.html'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof OrdersService_1.OrdersService !== "undefined" && OrdersService_1.OrdersService) === "function" && _a || Object, router_1.Router, ModalFactoryService_1.ModalFactoryService, core_1.ChangeDetectorRef])
    ], AdminOrdersComponent);
    return AdminOrdersComponent;
    var _a;
}());
exports.AdminOrdersComponent = AdminOrdersComponent;
//# sourceMappingURL=admin.orders.component.js.map