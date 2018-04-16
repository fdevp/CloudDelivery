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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ModalFactoryService_1 = require("../../../Services/UI/ModalFactoryService");
var CarrierOrdersService_1 = require("../../../Services/Orders/CarrierOrdersService");
var GMapsService_1 = require("../../../Services/GMapsService");
var CarrierDashboardComponent = /** @class */ (function () {
    function CarrierDashboardComponent(ordersService, gMapsService, modalService) {
        var _this = this;
        this.ordersService = ordersService;
        this.gMapsService = gMapsService;
        this.modalService = modalService;
        this.ordersService.pendingOrdersChanged.subscribe(function (list) {
            _this.pendingOrders = list;
        });
        this.initData();
        this.baseLocation = gMapsService.getBaseLocation();
    }
    CarrierDashboardComponent.prototype.initData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //count
                        this.ordersService.todayCount().subscribe(function (result) { return _this.todayCount = result; });
                        this.ordersService.lastWeekCount().subscribe(function (result) { return _this.weekCount = result; });
                        this.ordersService.lastMonthCount().subscribe(function (result) { return _this.monthCount = result; });
                        //list
                        return [4 /*yield*/, this.ordersService.pendingList(true).toPromise()];
                    case 1:
                        //list
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CarrierDashboardComponent.prototype.clickedOrder = function (order) {
        var modal = this.modalService.showModal("OrderDetailsModal");
        modal.content.initOrderDetails(order.Id);
    };
    CarrierDashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-carrier-dashboard',
            templateUrl: './carrier.dashboard.component.html',
            styleUrls: ['./carrier.dashboard.component.css']
        }),
        __param(2, core_1.Inject(core_1.forwardRef(function () { return ModalFactoryService_1.ModalFactoryService; }))),
        __metadata("design:paramtypes", [CarrierOrdersService_1.CarrierOrdersService, GMapsService_1.GMapsService,
            ModalFactoryService_1.ModalFactoryService])
    ], CarrierDashboardComponent);
    return CarrierDashboardComponent;
}());
exports.CarrierDashboardComponent = CarrierDashboardComponent;
//# sourceMappingURL=carrier.dashboard.component.js.map