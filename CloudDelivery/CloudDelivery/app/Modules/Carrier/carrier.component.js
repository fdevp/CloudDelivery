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
var MenuService_1 = require("../../Services/MenuService");
//import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
var CarrierComponent = (function () {
    function CarrierComponent(
        //private sessionService: SessionService,
        //private toastr: ToasterService,
        route, menuService) {
        this.route = route;
        this.menuService = menuService;
        this.mylinks = [];
        //public toastrConfig: ToasterConfig;
        this.skin = 'skin-black';
        var param = route.snapshot.data[0];
        //this.toastrConfig = new ToasterConfig({
        //    newestOnTop: true,
        //    showCloseButton: true,
        //    tapToDismiss: false
        //});
        this.mylinks = this.menuService.getMenu();
    }
    CarrierComponent.prototype.ngOnInit = function () {
        document.body.className = 'hold-transition ' + this.skin + ' layout-top-nav';
    };
    CarrierComponent.prototype.ngOnDestroy = function () {
        document.body.className = '';
    };
    return CarrierComponent;
}());
CarrierComponent = __decorate([
    core_1.Component({
        selector: 'app-carrier',
        templateUrl: './carrier.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        MenuService_1.MenuService])
], CarrierComponent);
exports.CarrierComponent = CarrierComponent;
//# sourceMappingURL=carrier.component.js.map