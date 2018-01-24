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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FormElementState_1 = require("../../../../../Models/Enums/FormElementState");
var Organisation_1 = require("../../../../../Models/Organisations/Organisation");
var OrganisationsService_1 = require("../../../../../Services/OrganisationsService");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var ModalFactoryService_1 = require("../../../../../Services/Layout/ModalFactoryService");
var ToastFactoryService_1 = require("../../../../../Services/Layout/ToastFactoryService");
var EditOrganisationTab = /** @class */ (function () {
    function EditOrganisationTab(bsModalRef, orgService, toastService, modalService) {
        this.bsModalRef = bsModalRef;
        this.orgService = orgService;
        this.toastService = toastService;
        this.modalService = modalService;
        this.defaultValues = new Organisation_1.Organisation();
        this.detailsProgress = true;
        this.formStates = new Array();
        this.elementStateEnum = FormElementState_1.FormElementState;
        this.formStates['Name'] = this.elementStateEnum.Text;
    }
    EditOrganisationTab.prototype.setElementState = function (element, state) {
        this.formStates[element] = state;
    };
    EditOrganisationTab.prototype.cancelEditing = function (element) {
        this.model[element] = this.defaultValues[element];
        this.setElementState(element, this.elementStateEnum.Text);
    };
    EditOrganisationTab.prototype.changeName = function () {
        var _this = this;
        this.setElementState("Name", this.elementStateEnum.Saving);
        this.orgService.setName(this.model.Id, this.model.Name).subscribe(function (x) {
            _this.setElementState("Name", _this.elementStateEnum.Text);
        }, function (err) {
            _this.cancelEditing("Name");
        });
    };
    EditOrganisationTab.prototype.ngOnInit = function () {
        Object.assign(this.defaultValues, this.model);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Organisation_1.Organisation)
    ], EditOrganisationTab.prototype, "model", void 0);
    EditOrganisationTab = __decorate([
        core_1.Component({
            selector: 'edit-organisation-tab',
            templateUrl: './edit.organisation.tab.html',
        }),
        __param(3, core_1.Inject(core_1.forwardRef(function () { return ModalFactoryService_1.ModalFactoryService; }))),
        __metadata("design:paramtypes", [ngx_bootstrap_1.BsModalRef, OrganisationsService_1.OrganisationsService, ToastFactoryService_1.ToastFactoryService,
            ModalFactoryService_1.ModalFactoryService])
    ], EditOrganisationTab);
    return EditOrganisationTab;
}());
exports.EditOrganisationTab = EditOrganisationTab;
//# sourceMappingURL=edit.Organisation.tab.js.map