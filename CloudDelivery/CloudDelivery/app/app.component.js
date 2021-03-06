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
var ModalFactoryService_1 = require("./Services/UI/ModalFactoryService");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var AppComponent = /** @class */ (function () {
    function AppComponent(bsmodalService, modalService) {
        this.bsmodalService = bsmodalService;
        this.modalService = modalService;
        this.modalService.setNgxService(bsmodalService);
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "<router-outlet></router-outlet>",
        }),
        __metadata("design:paramtypes", [ngx_bootstrap_1.BsModalService, ModalFactoryService_1.ModalFactoryService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map