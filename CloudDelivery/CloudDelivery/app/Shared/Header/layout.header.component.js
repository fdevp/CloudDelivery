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
var LayoutHeaderComponent = (function () {
    function LayoutHeaderComponent(sessionService) {
        this.sessionService = sessionService;
        this.links = [];
    }
    LayoutHeaderComponent.prototype.Logout = function () {
        this.sessionService.logout();
    };
    return LayoutHeaderComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], LayoutHeaderComponent.prototype, "links", void 0);
LayoutHeaderComponent = __decorate([
    core_1.Component({
        selector: 'app-layout-header',
        templateUrl: './layout.header.component.html'
    }),
    __metadata("design:paramtypes", [SessionService_1.SessionService])
], LayoutHeaderComponent);
exports.LayoutHeaderComponent = LayoutHeaderComponent;
//# sourceMappingURL=layout.header.component.js.map