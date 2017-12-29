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
var OrganisationsService_1 = require("../../../Services/OrganisationsService");
var ModalFactoryService_1 = require("../../../Services/Layout/ModalFactoryService");
var router_1 = require("@angular/router");
var ToastFactoryService_1 = require("../../../Services/Layout/ToastFactoryService");
var Observable_1 = require("rxjs/Observable");
var AdminOrganisationsComponent = /** @class */ (function () {
    function AdminOrganisationsComponent(organisationsService, modalService, toastService, router) {
        this.organisationsService = organisationsService;
        this.modalService = modalService;
        this.toastService = toastService;
        this.router = router;
        this.columns = [
            { prop: 'Id' },
            { prop: 'Name', name: 'Nazwa' },
            { prop: 'MembersNumber', name: 'Ilość członków' },
        ];
        this.selected = [];
        this.orgs = [];
        this.filteredOrgs = [];
        this.initialized = false;
        this.initializeOrgsList();
    }
    AdminOrganisationsComponent.prototype.initializeOrgsList = function () {
        var _this = this;
        this.organisationsService.list().subscribe(function (orgsList) {
            _this.orgs = orgsList;
            _this.filteredOrgs = orgsList;
            _this.initialized = true;
        });
    };
    AdminOrganisationsComponent.prototype.orgSelect = function (_a) {
        var selected = _a.selected;
        console.log('Select Event', selected);
        var modal = this.modalService.showModal("EditOrganisationModal", { class: "modal-lg" });
        modal.content.initOrgDetails(selected[0]);
    };
    AdminOrganisationsComponent.prototype.keyFilter = function (event) {
        if (this.orgs.length == 0) {
            this.filteredOrgs = [];
            return;
        }
        if (event.target.value == null || event.target.value.length == 0) {
            this.filteredOrgs = this.orgs;
            return;
        }
        var val = event.target.value.toLowerCase();
        this.filteredOrgs = this.orgs.filter(function (u) {
            return (u.Name.toLowerCase().indexOf(val) > -1 || u.Id.toString().indexOf(val) > -1);
        });
    };
    AdminOrganisationsComponent.prototype.addOrganisation = function () {
        var _this = this;
        var modal = this.modalService.showModal("AddOrganisationModal");
        var progressToast;
        modal.content.submit.subscribe(function (name) {
            progressToast = _this.toastService.progress("Dodawanie organizacji");
            _this.organisationsService.add(name).subscribe(function (id) {
                var toast = _this.toastService.successCreating("Utworzono organizację " + name);
                toast.onTap = new Observable_1.Observable(function () {
                    /*
                    var modal = this.modalService.showModal("EditUserModal", { class: "modal-lg" });
                    modal.content.initUserDetails(id);*/
                });
                progressToast.toastRef.close();
                _this.organisationsService.list();
            }, function (err) {
                _this.toastService.toastr.error("Błąd", "Nie udało się utworzyć użytkownika");
                progressToast.toastRef.close();
            });
        });
    };
    AdminOrganisationsComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-organisations',
            templateUrl: './admin.organisations.component.html'
        }),
        __metadata("design:paramtypes", [OrganisationsService_1.OrganisationsService, ModalFactoryService_1.ModalFactoryService, ToastFactoryService_1.ToastFactoryService, router_1.Router])
    ], AdminOrganisationsComponent);
    return AdminOrganisationsComponent;
}());
exports.AdminOrganisationsComponent = AdminOrganisationsComponent;
//# sourceMappingURL=admin.organisations.component.js.map