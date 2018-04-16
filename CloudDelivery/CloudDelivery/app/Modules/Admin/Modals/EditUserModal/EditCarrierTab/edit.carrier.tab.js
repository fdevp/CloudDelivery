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
var FormElementState_1 = require("../../../../../Models/Enums/FormElementState");
var Carrier_1 = require("../../../../../Models/Carriers/Carrier");
var CarriersService_1 = require("../../../../../Services/CarriersService");
var EditCarrierTab = /** @class */ (function () {
    function EditCarrierTab(carrierService) {
        this.carrierService = carrierService;
        this.model = new Carrier_1.Carrier();
        this.editModel = new Carrier_1.Carrier();
        this.formStates = new Array();
        this.elementStateEnum = FormElementState_1.FormElementState;
        this.dataLoading = true;
        this.formStates['Marker'] = this.elementStateEnum.Text;
    }
    EditCarrierTab.prototype.ngOnInit = function () {
        var _this = this;
        this.carrierService.details(this.userId).subscribe(function (details) {
            _this.model = details;
            Object.assign(_this.editModel, _this.model);
            _this.dataLoading = false;
        }, function (err) { });
    };
    EditCarrierTab.prototype.setElementState = function (element, state) {
        this.formStates[element] = state;
    };
    EditCarrierTab.prototype.cancelEditing = function (element) {
        this.editModel[element] = this.model[element];
        this.setElementState(element, this.elementStateEnum.Text);
    };
    EditCarrierTab.prototype.changeMarker = function () {
        var _this = this;
        this.setElementState("Marker", this.elementStateEnum.Saving);
        this.carrierService.setColor(this.userId, this.editModel.Marker).subscribe(function (x) {
            _this.model.Marker = _this.editModel.Marker;
            _this.setElementState("Marker", _this.elementStateEnum.Text);
        }, function (err) {
            _this.cancelEditing("Marker");
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], EditCarrierTab.prototype, "userId", void 0);
    EditCarrierTab = __decorate([
        core_1.Component({
            selector: 'edit-carrier-tab',
            templateUrl: './edit.carrier.tab.html',
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof CarriersService_1.CarriersService !== "undefined" && CarriersService_1.CarriersService) === "function" && _a || Object])
    ], EditCarrierTab);
    return EditCarrierTab;
    var _a;
}());
exports.EditCarrierTab = EditCarrierTab;
//# sourceMappingURL=edit.carrier.tab.js.map