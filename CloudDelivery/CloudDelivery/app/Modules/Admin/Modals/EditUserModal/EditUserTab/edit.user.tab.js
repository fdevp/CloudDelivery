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
var UsersService_1 = require("../../../../../Services/Admin/UsersService");
var OrganisationsService_1 = require("../../../../../Services/Admin/OrganisationsService");
var EditUserTab = /** @class */ (function () {
    function EditUserTab(usersService, organisationsService) {
        var _this = this;
        this.usersService = usersService;
        this.organisationsService = organisationsService;
        this.editModel = new UserDetails_1.UserDetails();
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
    EditUserTab.prototype.ngOnInit = function () {
        Object.assign(this.editModel, this.model);
    };
    EditUserTab.prototype.setElementState = function (element, state) {
        this.formStates[element] = state;
    };
    EditUserTab.prototype.cancelEditing = function (element) {
        this.editModel[element] = this.model[element];
        this.setElementState(element, this.elementStateEnum.Text);
    };
    EditUserTab.prototype.changeName = function () {
        var _this = this;
        this.setElementState("Name", this.elementStateEnum.Saving);
        this.usersService.setName(this.model.Id, this.editModel.Name).subscribe(function (x) {
            _this.model.Name = _this.editModel.Name;
            _this.setElementState("Name", _this.elementStateEnum.Text);
        }, function (err) {
            _this.cancelEditing("Name");
        });
    };
    EditUserTab.prototype.changeOrganisation = function () {
        var _this = this;
        this.setElementState("Organisation", this.elementStateEnum.Saving);
        this.usersService.setOrganisation(this.model.Id, this.editModel.OrganisationId).subscribe(function (x) {
            _this.model.OrganisationId = _this.editModel.OrganisationId;
            if (_this.model.OrganisationId != null)
                _this.model.Organisation = _this.organisationsList.find(function (x) { return x.Id == _this.model.OrganisationId; }).Name;
            else
                _this.model.Organisation = null;
            _this.setElementState("Organisation", _this.elementStateEnum.Text);
        }, function (err) {
            _this.cancelEditing("Organisation");
        });
    };
    EditUserTab.prototype.changeRoles = function () {
        var _this = this;
        this.setElementState("Roles", this.elementStateEnum.Saving);
        this.usersService.setRole(this.model.Id, this.editModel.Roles).subscribe(function (x) {
            _this.model.Roles = _this.editModel.Roles;
            _this.setElementState("Roles", _this.elementStateEnum.Text);
        }, function (err) {
            _this.cancelEditing("Roles");
        });
    };
    EditUserTab.prototype.changePhone = function () {
        var _this = this;
        this.setElementState("Phone", this.elementStateEnum.Saving);
        this.usersService.setPhone(this.model.Id, this.editModel.Phone).subscribe(function (x) {
            _this.model.Phone = _this.editModel.Phone;
            _this.setElementState("Phone", _this.elementStateEnum.Text);
        }, function (err) {
            _this.cancelEditing("Phone");
        });
    };
    EditUserTab.prototype.changeDescription = function () {
        var _this = this;
        this.setElementState("Description", this.elementStateEnum.Saving);
        this.usersService.setDescription(this.model.Id, this.editModel.Description).subscribe(function (x) {
            _this.model.Description = _this.editModel.Description;
            _this.setElementState("Description", _this.elementStateEnum.Text);
        }, function (err) {
            _this.cancelEditing("Description");
        });
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