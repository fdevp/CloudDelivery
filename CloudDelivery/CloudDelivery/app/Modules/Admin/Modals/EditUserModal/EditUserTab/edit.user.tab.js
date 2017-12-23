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
var UserDetails_1 = require("../../../../../Models/Users/UserDetails");
var FormElementState_1 = require("../../../../../Models/Enums/FormElementState");
var UsersService_1 = require("../../../../../Services/UsersService");
var OrganisationsService_1 = require("../../../../../Services/OrganisationsService");
var EditUserTab = /** @class */ (function () {
    function EditUserTab(usersService, organisationsService) {
        var _this = this;
        this.usersService = usersService;
        this.organisationsService = organisationsService;
        this.defaultValues = new UserDetails_1.UserDetails();
        this.formStates = new Array();
        this.elementStateEnum = FormElementState_1.FormElementState;
        this.organisationsService.list().subscribe(function (list) {
            _this.organisationsList = list;
        });
        this.rolesList = this.usersService.roles();
        this.formStates['Name'] = this.elementStateEnum.Text;
        this.formStates['Organisation'] = this.elementStateEnum.Text;
        this.formStates['Roles'] = this.elementStateEnum.Text;
        this.formStates['Phone'] = this.elementStateEnum.Text;
        this.formStates['Description'] = this.elementStateEnum.Text;
    }
    EditUserTab.prototype.setElementState = function (element, state) {
        this.formStates[element] = state;
    };
    EditUserTab.prototype.cancelEditing = function (element) {
        this.model[element] = this.defaultValues[element];
        this.setElementState(element, this.elementStateEnum.Text);
    };
    EditUserTab.prototype.ngOnInit = function () {
        Object.assign(this.defaultValues, this.model);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", UserDetails_1.UserDetails)
    ], EditUserTab.prototype, "model", void 0);
    EditUserTab = __decorate([
        core_1.Component({
            selector: 'edit-user-tab',
            templateUrl: './edit.user.tab.html',
        }),
        __metadata("design:paramtypes", [UsersService_1.UsersService, OrganisationsService_1.OrganisationsService])
    ], EditUserTab);
    return EditUserTab;
}());
exports.EditUserTab = EditUserTab;
//# sourceMappingURL=edit.user.tab.js.map