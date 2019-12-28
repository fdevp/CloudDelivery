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
var SessionService_1 = require("../../../../Services/SessionService");
var router_1 = require("@angular/router");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(sessionService, router) {
        this.sessionService = sessionService;
        this.router = router;
        this.inProgress = false;
        this.errorOccured = false;
        this.errorMessage = "";
    }
    LoginComponent.prototype.signIn = function () {
        var _this = this;
        this.inProgress = true;
        this.errorOccured = false;
        if (this.sessionService.redirectUrl == null) {
            this.sessionService.redirectUrl = "";
        }
        var loginBody = "grant_type=password&username=" + this.login + "&password=" + this.password + "&device=" + this.sessionService.getBrowserInfo();
        this.sessionService.login(loginBody).subscribe(function (result) { }, function (error) {
            _this.errorOccured = true;
            _this.inProgress = false;
            var body = JSON.parse(error["_body"]);
            _this.errorMessage = body["error_description"];
        }, function () {
            _this.inProgress = false;
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-layout-login',
            templateUrl: './login.component.html'
        }),
        __metadata("design:paramtypes", [SessionService_1.SessionService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map