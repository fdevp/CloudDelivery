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
var SessionService_1 = require("../../../Services/SessionService");
var MenuFactoryService_1 = require("../../../Services/UI/MenuFactoryService");
var SignalrService_1 = require("../../../Services/SignalrService");
var SignalrConnectionState_1 = require("../../../Models/Enums/SignalrConnectionState");
var LayoutNavigationComponent = /** @class */ (function () {
    function LayoutNavigationComponent(sessionService, menuService, signalrService, cdr) {
        var _this = this;
        this.sessionService = sessionService;
        this.menuService = menuService;
        this.signalrService = signalrService;
        this.cdr = cdr;
        this.links = [];
        this.connected = false;
        this.reconnecting = false;
        this.reconnecting = signalrService.connectionState == SignalrConnectionState_1.SignalrConnectionStates.connecting;
        this.links = menuService.getMenu();
        this.userName = sessionService.user.name;
        this.signalrService.signalrStateChange.subscribe(function (state) {
            switch (state) {
                case SignalrConnectionState_1.SignalrConnectionStates.connecting:
                case SignalrConnectionState_1.SignalrConnectionStates.reconnecting:
                    _this.reconnecting = true;
                    break;
                case SignalrConnectionState_1.SignalrConnectionStates.connected:
                    _this.reconnecting = false;
                    _this.connected = true;
                    break;
                case SignalrConnectionState_1.SignalrConnectionStates.disconnected:
                    _this.reconnecting = false;
                    _this.connected = false;
                    break;
            }
            _this.cdr.detectChanges();
        });
    }
    LayoutNavigationComponent.prototype.reconnectWebsockets = function () {
        if (!this.reconnecting)
            this.signalrService.startConnection();
    };
    LayoutNavigationComponent = __decorate([
        core_1.Component({
            selector: 'app-layout-navigation',
            templateUrl: './layout.navigation.component.html'
        }),
        __metadata("design:paramtypes", [SessionService_1.SessionService, MenuFactoryService_1.MenuFactoryService, SignalrService_1.SignalrService, core_1.ChangeDetectorRef])
    ], LayoutNavigationComponent);
    return LayoutNavigationComponent;
}());
exports.LayoutNavigationComponent = LayoutNavigationComponent;
//# sourceMappingURL=layout.navigation.component.js.map