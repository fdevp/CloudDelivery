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
var router_1 = require("@angular/router");
var ShortDateTimePipe_1 = require("../../Shared/pipes/ShortDateTimePipe");
var ModalFactoryService_1 = require("../../../Services/UI/ModalFactoryService");
var RoutesService_1 = require("../../../Services/RoutesService");
var DurationTextPipe_1 = require("../../Shared/Pipes/DurationTextPipe");
var RouteStatusPipe_1 = require("../../Shared/Pipes/RouteStatusPipe");
var AdminRoutesComponent = /** @class */ (function () {
    function AdminRoutesComponent(routesService, router, modalService, cdr) {
        this.routesService = routesService;
        this.router = router;
        this.modalService = modalService;
        this.cdr = cdr;
        this.selected = [];
        this.routes = [];
        this.initialized = false;
        this.columns = [
            { prop: 'Id' },
            { prop: 'CarrierName', name: 'Kierowca' },
            { prop: 'AddedTime', name: 'Utworzona', pipe: new ShortDateTimePipe_1.ShortDateTimePipe("pl-PL") },
            { prop: 'RoutePointsCount', name: 'Ilość punktów' },
            { prop: 'Status', name: 'Status', pipe: new RouteStatusPipe_1.RouteStatusPipe() },
            { prop: 'FinishTime', name: 'Zakończona', pipe: new ShortDateTimePipe_1.ShortDateTimePipe("pl-PL") },
            { prop: 'Duration', name: 'Czas trwania', pipe: new DurationTextPipe_1.DurationTextPipe() },
        ];
        this.initializeOrdersList();
    }
    AdminRoutesComponent.prototype.initializeOrdersList = function () {
        var _this = this;
        this.routesService.list(false).subscribe(function (routesList) {
            _this.routes = routesList;
            _this.initialized = true;
        });
    };
    AdminRoutesComponent.prototype.routeSelect = function (_a) {
        var selected = _a.selected;
        var obj = this;
        this.router.navigate(["admin/route", selected[0].Id]);
    };
    AdminRoutesComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-routes',
            templateUrl: './admin.routes.component.html'
        }),
        __metadata("design:paramtypes", [RoutesService_1.RoutesService, router_1.Router, ModalFactoryService_1.ModalFactoryService, core_1.ChangeDetectorRef])
    ], AdminRoutesComponent);
    return AdminRoutesComponent;
}());
exports.AdminRoutesComponent = AdminRoutesComponent;
//# sourceMappingURL=admin.routes.component.js.map