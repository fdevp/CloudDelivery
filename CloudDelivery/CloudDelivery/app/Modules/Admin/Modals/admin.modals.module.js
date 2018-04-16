"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var add_user_modal_1 = require("./AddUserModal/add.user.modal");
var edit_user_modal_1 = require("./EditUserModal/edit.user.modal");
var edit_SalePoint_tab_1 = require("./EditUserModal/EditSalePointTab/edit.SalePoint.tab");
var edit_carrier_tab_1 = require("./EditUserModal/EditCarrierTab/edit.carrier.tab");
var edit_password_tab_1 = require("./EditUserModal/EditPasswordTab/edit.password.tab");
var edit_user_tab_1 = require("./EditUserModal/EditUserTab/edit.user.tab");
var shared_module_1 = require("../../Shared/shared.module");
var add_organisation_modal_1 = require("./AddOrganisationModal/add.organisation.modal");
var edit_organisation_modal_1 = require("./EditOrganisationModal/edit.organisation.modal");
var edit_Organisation_tab_1 = require("./EditOrganisationModal/EditOrgTab/edit.Organisation.tab");
var edit_org_users_tab_1 = require("./EditOrganisationModal/EditOrgUsersTab/edit.org.users.tab");
var core_2 = require("@agm/core");
var pages = [
    add_user_modal_1.AddUserModal,
    edit_user_modal_1.EditUserModal,
    add_organisation_modal_1.AddOrganisationModal,
    edit_organisation_modal_1.EditOrganisationModal
];
var tabs = [
    edit_password_tab_1.EditPasswordTab,
    edit_SalePoint_tab_1.EditSalePointTab,
    edit_user_tab_1.EditUserTab,
    edit_carrier_tab_1.EditCarrierTab,
    edit_Organisation_tab_1.EditOrganisationTab,
    edit_org_users_tab_1.EditOrgUsersTab
];
var modules = [
    common_1.CommonModule,
    router_1.RouterModule,
    forms_1.FormsModule,
    ngx_bootstrap_1.TabsModule,
    shared_module_1.SharedModule,
    core_2.AgmCoreModule
];
var providers = [];
var AdminModalsModule = /** @class */ (function () {
    function AdminModalsModule() {
    }
    AdminModalsModule = __decorate([
        core_1.NgModule({
            providers: providers.slice(),
            imports: modules.slice(),
            declarations: pages.concat([tabs]),
            exports: pages.slice(),
            entryComponents: pages.slice()
        })
    ], AdminModalsModule);
    return AdminModalsModule;
}());
exports.AdminModalsModule = AdminModalsModule;
//# sourceMappingURL=admin.modals.module.js.map