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
var ngx_bootstrap_1 = require("ngx-bootstrap");
var OrganisationsService_1 = require("../../../../Services/OrganisationsService");
var Organisation_1 = require("../../../../Models/Organisations/Organisation");
var EditOrganisationModal = /** @class */ (function () {
    function EditOrganisationModal(bsModalRef, orgService) {
        this.bsModalRef = bsModalRef;
        this.orgService = orgService;
        this.details = new Organisation_1.Organisation();
        this.detailsProgress = true;
    }
    EditOrganisationModal.prototype.removeOrganisation = function () {
    };
    EditOrganisationModal.prototype.closeModal = function () {
        this.orgService.list();
        this.bsModalRef.hide();
    };
    EditOrganisationModal.prototype.initOrgDetails = function (organisation) {
        this.details = organisation;
        this.detailsProgress = false;
    };
    EditOrganisationModal = __decorate([
        core_1.Component({
            selector: 'edit-organisation-modal',
            templateUrl: './edit.organisation.modal.html',
        }),
        __metadata("design:paramtypes", [ngx_bootstrap_1.BsModalRef, OrganisationsService_1.OrganisationsService])
    ], EditOrganisationModal);
    return EditOrganisationModal;
}());
exports.EditOrganisationModal = EditOrganisationModal;
//# sourceMappingURL=edit.organisation.modal.js.map