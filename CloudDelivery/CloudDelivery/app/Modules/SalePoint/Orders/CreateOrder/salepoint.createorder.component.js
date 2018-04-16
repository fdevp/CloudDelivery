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
var OrderEditModel_1 = require("../../../../Models/Orders/OrderEditModel");
var GMapsService_1 = require("../../../../Services/GMapsService");
var ToastFactoryService_1 = require("../../../../Services/UI/ToastFactoryService");
var SalepointOrdersService_1 = require("../../../../Services/Orders/SalepointOrdersService");
var SalepointCreateOrderComponent = /** @class */ (function () {
    function SalepointCreateOrderComponent(ordersService, gMapsService, cdr, toastService) {
        this.ordersService = ordersService;
        this.gMapsService = gMapsService;
        this.cdr = cdr;
        this.toastService = toastService;
        this.inProgress = false;
        this.geocoderFinished = false;
        this.geocoderSuccess = false;
        this.setCleanModel();
    }
    SalepointCreateOrderComponent.prototype.setCleanModel = function () {
        this.model = new OrderEditModel_1.OrderEditModel();
        this.model.DestinationCity = "Słupsk";
    };
    SalepointCreateOrderComponent.prototype.startGeocoder = function () {
        var _this = this;
        this.inProgress = true;
        this.geocoderFinished = false;
        var inProgressToast = this.toastService.progress("Wyszukiwanie lokalizacji");
        var query = this.model.DestinationCity + ", " + this.model.DestinationAddress;
        this.gMapsService.getPositionByQuery(query).subscribe(function (response) {
            _this.model.EndLaLng = response;
            _this.finishGeocoder(true, inProgressToast);
        }, function (err) {
            _this.finishGeocoder(false, inProgressToast);
        });
    };
    SalepointCreateOrderComponent.prototype.finishGeocoder = function (result, toast) {
        this.geocoderSuccess = result;
        this.geocoderFinished = true;
        toast.toastRef.close();
        this.cdr.detectChanges();
    };
    SalepointCreateOrderComponent.prototype.addOrder = function () {
        var _this = this;
        var inProgressToast = this.toastService.progress("Dodawanie zamówienia");
        this.ordersService.add(this.model).subscribe(function (t) {
            inProgressToast.toastRef.close();
            _this.toastService.toastr.success("Dodano zamówienie " + _this.model.DestinationAddress, "Nowe zamówienie");
            _this.setCleanModel();
            _this.inProgress = false;
        }, function (err) {
            inProgressToast.toastRef.close();
            _this.toastService.toastr.error("Wystąpił błąd: " + err, "Nowe zamówienie");
            _this.inProgress = false;
        });
    };
    SalepointCreateOrderComponent.prototype.stopInProgress = function () {
        this.inProgress = false;
    };
    SalepointCreateOrderComponent = __decorate([
        core_1.Component({
            selector: 'app-salepoint-createorder',
            templateUrl: './salepoint.createorder.component.html',
            styleUrls: ['./salepoint.createorder.component.css']
        }),
        __metadata("design:paramtypes", [SalepointOrdersService_1.SalepointOrdersService, GMapsService_1.GMapsService, core_1.ChangeDetectorRef, ToastFactoryService_1.ToastFactoryService])
    ], SalepointCreateOrderComponent);
    return SalepointCreateOrderComponent;
}());
exports.SalepointCreateOrderComponent = SalepointCreateOrderComponent;
//# sourceMappingURL=salepoint.createorder.component.js.map