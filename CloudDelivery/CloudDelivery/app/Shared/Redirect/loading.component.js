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
var SessionService_1 = require("../../Services/SessionService");
var router_1 = require("@angular/router");
var LoadingComponent = (function () {
    function LoadingComponent(sessionService, router) {
        this.sessionService = sessionService;
        this.router = router;
    }
    return LoadingComponent;
}());
LoadingComponent = __decorate([
    core_1.Component({
        selector: 'app-layout-loading',
        styleUrls: ['./loading.component.css'],
        template: '<div class="loader-container"></div>'
    }),
    __metadata("design:paramtypes", [SessionService_1.SessionService, router_1.Router])
], LoadingComponent);
exports.LoadingComponent = LoadingComponent;
//# sourceMappingURL=loading.component.js.map