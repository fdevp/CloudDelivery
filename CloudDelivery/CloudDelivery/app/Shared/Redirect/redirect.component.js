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
var RedirectComponent = (function () {
    function RedirectComponent(sessionService, router) {
        this.sessionService = sessionService;
        this.router = router;
    }
    RedirectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkLogin().subscribe(function (isLoggedIn) {
            if (!isLoggedIn) {
                _this.router.navigate(['/login']);
                return;
            }
            var page = "";
            if (_this.sessionService.isAdmin())
                page = '/admin';
            else if (_this.sessionService.hasRole("carrier"))
                page = '/carrier';
            _this.router.navigate([page]);
        }, function (err) {
            _this.router.navigate(['/login']);
        });
    };
    return RedirectComponent;
}());
RedirectComponent = __decorate([
    core_1.Component({
        selector: 'app-layout-loading',
        styleUrls: ['./redirect.component.css'],
        template: '<div class="loader-container"></div>'
    }),
    __metadata("design:paramtypes", [SessionService_1.SessionService, router_1.Router])
], RedirectComponent);
exports.RedirectComponent = RedirectComponent;
//# sourceMappingURL=redirect.component.js.map