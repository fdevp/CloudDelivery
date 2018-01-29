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
var UsersService_1 = require("../../../../../Services/UsersService");
var EditSalespointTab = /** @class */ (function () {
    function EditSalespointTab(usersService) {
        this.usersService = usersService;
        this.formStates = new Array();
        this.elementStateEnum = FormElementState_1.FormElementState;
        this.formStates['City'] = this.elementStateEnum.Text;
        this.formStates['Address'] = this.elementStateEnum.Text;
        this.formStates['Color'] = this.elementStateEnum.Text;
        this.formStates['LatLng'] = this.elementStateEnum.Text;
    }
    EditSalespointTab.prototype.ngOnInit = function () {
        Object.assign(this.editModel, this.model);
    };
    EditSalespointTab.prototype.setElementState = function (element, state) {
        this.formStates[element] = state;
    };
    EditSalespointTab.prototype.cancelEditing = function (element) {
        this.editModel[element] = this.model[element];
        this.setElementState(element, this.elementStateEnum.Text);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], EditSalespointTab.prototype, "userId", void 0);
    EditSalespointTab = __decorate([
        core_1.Component({
            selector: 'edit-salespoint-tab',
            templateUrl: './edit.salespoint.tab.html',
        }),
        __metadata("design:paramtypes", [UsersService_1.UsersService])
    ], EditSalespointTab);
    return EditSalespointTab;
}());
exports.EditSalespointTab = EditSalespointTab;
//# sourceMappingURL=edit.salespoint.tab.js.map