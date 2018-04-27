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
var RoutesService_1 = require("../../../../Services/RoutesService");
var router_1 = require("@angular/router");
var RoutePointType_1 = require("../../../../Models/Enums/RoutePointType");
var SessionService_1 = require("../../../../Services/SessionService");
var GMapsService_1 = require("../../../../Services/GMapsService");
var RouteStatus_1 = require("../../../../Models/Enums/RouteStatus");
var ModalFactoryService_1 = require("../../../../Services/UI/ModalFactoryService");
var RouteDetailsComponent = /** @class */ (function () {
    function RouteDetailsComponent(sessionService, route, routesService, router, cdr, gMapsService, modalService) {
        this.sessionService = sessionService;
        this.route = route;
        this.routesService = routesService;
        this.router = router;
        this.cdr = cdr;
        this.gMapsService = gMapsService;
        this.modalService = modalService;
        this.routePointTypeEnum = RoutePointType_1.RoutePointType;
        this.routeStatusEnum = RouteStatus_1.RouteStatus;
        this.initialized = false;
        this.baseLocation = gMapsService.getBaseLocation();
    }
    RouteDetailsComponent.prototype.isAdmin = function () {
        return this.sessionService.isAdmin();
    };
    RouteDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.routeId = +params['id'];
            _this.routesService.details(_this.routeId).subscribe(function (details) {
                _this.details = details;
                _this.initialized = true;
            });
        });
    };
    RouteDetailsComponent.prototype.orderDetails = function (orderId) {
        var modal = this.modalService.showModal("OrderDetailsModal");
        modal.content.initOrderDetails(orderId);
    };
    RouteDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-route-details',
            templateUrl: './route.details.component.html',
            styleUrls: ['./route.details.component.css']
        }),
        __metadata("design:paramtypes", [SessionService_1.SessionService, router_1.ActivatedRoute, RoutesService_1.RoutesService, router_1.Router, core_1.ChangeDetectorRef, GMapsService_1.GMapsService, ModalFactoryService_1.ModalFactoryService])
    ], RouteDetailsComponent);
    return RouteDetailsComponent;
}());
exports.RouteDetailsComponent = RouteDetailsComponent;
//# sourceMappingURL=route.details.component.js.map