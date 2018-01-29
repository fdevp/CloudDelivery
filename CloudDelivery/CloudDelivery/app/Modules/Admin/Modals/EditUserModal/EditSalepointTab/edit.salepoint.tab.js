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
var SalepointsService_1 = require("../../../../../Services/SalepointsService");
var Salepoint_1 = require("../../../../../Models/Salepoints/Salepoint");
var GMapsService_1 = require("../../../../../Services/GMapsService");
var core_2 = require("@agm/core");
var EditSalepointTab = /** @class */ (function () {
    function EditSalepointTab(salepointsService, gmapsService) {
        this.salepointsService = salepointsService;
        this.gmapsService = gmapsService;
        this.model = new Salepoint_1.Salepoint();
        this.editModel = new Salepoint_1.Salepoint();
        this.formStates = new Array();
        this.elementStateEnum = FormElementState_1.FormElementState;
        this.dataLoading = true;
        this.querySearchProgress = false;
        this.addressSearchProgress = false;
        this.formStates['City'] = this.elementStateEnum.Text;
        this.formStates['Address'] = this.elementStateEnum.Text;
        this.formStates['Color'] = this.elementStateEnum.Text;
        this.formStates['LatLng'] = this.elementStateEnum.Text;
        this.editModel.LatLng = gmapsService.getBaseLocation();
    }
    EditSalepointTab.prototype.ngOnInit = function () {
        var _this = this;
        var baseLoc = this.gmapsService.getBaseLocation();
        this.salepointsService.details(this.userId).subscribe(function (details) {
            _this.model = details;
            if (_this.model.LatLng == null) {
                console.log("wszed", _this.model);
                _this.model.LatLng = _this.gmapsService.getBaseLocation();
            }
            if (typeof _this.model.LatLng === "string" || _this.model.LatLng instanceof String) {
                _this.model.LatLng = JSON.parse(_this.model.LatLng + "");
            }
            Object.assign(_this.editModel, _this.model);
            _this.dataLoading = false;
        }, function (err) { });
    };
    EditSalepointTab.prototype.setElementState = function (element, state) {
        this.formStates[element] = state;
    };
    EditSalepointTab.prototype.cancelEditing = function (element) {
        this.editModel[element] = this.model[element];
        this.setElementState(element, this.elementStateEnum.Text);
    };
    EditSalepointTab.prototype.changeAddress = function () {
        var _this = this;
        this.setElementState("Address", this.elementStateEnum.Saving);
        this.salepointsService.setAddress(this.userId, this.editModel.Address).subscribe(function (x) {
            _this.model.Address = _this.editModel.Address;
            _this.setElementState("Address", _this.elementStateEnum.Text);
        }, function (err) {
            _this.cancelEditing("Address");
        });
    };
    EditSalepointTab.prototype.changeCity = function () {
        var _this = this;
        this.setElementState("City", this.elementStateEnum.Saving);
        this.salepointsService.setCity(this.userId, this.editModel.City).subscribe(function (x) {
            _this.model.City = _this.editModel.City;
            _this.setElementState("City", _this.elementStateEnum.Text);
        }, function (err) {
            _this.cancelEditing("City");
        });
    };
    EditSalepointTab.prototype.changeColor = function () {
        var _this = this;
        this.setElementState("Color", this.elementStateEnum.Saving);
        this.salepointsService.setColor(this.userId, this.editModel.Color).subscribe(function (x) {
            _this.model.Color = _this.editModel.Color;
            _this.setElementState("Color", _this.elementStateEnum.Text);
        }, function (err) {
            _this.cancelEditing("Color");
        });
    };
    EditSalepointTab.prototype.changeLatLng = function () {
        var _this = this;
        this.setElementState("LatLng", this.elementStateEnum.Saving);
        this.salepointsService.setLatLng(this.userId, this.editModel.LatLng).subscribe(function (x) {
            _this.model.LatLng = _this.editModel.LatLng;
            _this.setElementState("LatLng", _this.elementStateEnum.Text);
        }, function (err) {
            _this.cancelEditing("LatLng");
        });
    };
    EditSalepointTab.prototype.markerDragEnd = function (m, $event) {
        this.editModel.LatLng.lat = $event.coords.lat;
        this.editModel.LatLng.lng = $event.coords.lng;
    };
    EditSalepointTab.prototype.findInputLocation = function () {
        var _this = this;
        if (this.searchQuery == null || this.searchQuery.length == 0)
            return;
        this.querySearchProgress = true;
        this.gmapsService.getPositionByQuery(this.searchQuery).subscribe(function (position) {
            _this.editModel.LatLng = position;
            _this.querySearchProgress = false;
        }, function (error) {
            _this.querySearchProgress = false;
        });
    };
    EditSalepointTab.prototype.findAddressLocation = function () {
        var _this = this;
        if (this.editModel.Address == null && this.editModel.City == null)
            return;
        this.addressSearchProgress = true;
        var query = this.editModel.Address + ", " + this.editModel.City;
        this.gmapsService.getPositionByQuery(query).subscribe(function (position) {
            _this.editModel.LatLng = position;
            _this.addressSearchProgress = false;
        }, function (error) {
            _this.addressSearchProgress = false;
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], EditSalepointTab.prototype, "userId", void 0);
    __decorate([
        core_1.ViewChild(core_2.AgmMap),
        __metadata("design:type", core_2.AgmMap)
    ], EditSalepointTab.prototype, "agmMap", void 0);
    __decorate([
        core_1.ViewChild(core_2.AgmMarker),
        __metadata("design:type", core_2.AgmMarker)
    ], EditSalepointTab.prototype, "positionMarker", void 0);
    EditSalepointTab = __decorate([
        core_1.Component({
            selector: 'edit-salepoint-tab',
            templateUrl: './edit.salepoint.tab.html',
        }),
        __metadata("design:paramtypes", [SalepointsService_1.SalepointsService, GMapsService_1.GMapsService])
    ], EditSalepointTab);
    return EditSalepointTab;
}());
exports.EditSalepointTab = EditSalepointTab;
//# sourceMappingURL=edit.salepoint.tab.js.map