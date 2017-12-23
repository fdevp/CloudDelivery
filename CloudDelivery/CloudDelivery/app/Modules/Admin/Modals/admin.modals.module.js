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
var edit_salespoint_tab_1 = require("./EditUserModal/EditSalesPointTab/edit.salespoint.tab");
var edit_password_tab_1 = require("./EditUserModal/EditPasswordTab/edit.password.tab");
var edit_user_tab_1 = require("./EditUserModal/EditUserTab/edit.user.tab");
var shared_module_1 = require("../../Shared/shared.module");
var pages = [
    add_user_modal_1.AddUserModal,
    edit_user_modal_1.EditUserModal
];
var tabs = [
    edit_password_tab_1.EditPasswordTab,
    edit_salespoint_tab_1.EditSalespointTab,
    edit_user_tab_1.EditUserTab
];
var modules = [
    common_1.CommonModule,
    router_1.RouterModule,
    forms_1.FormsModule,
    ngx_bootstrap_1.TabsModule,
    shared_module_1.SharedModule
];
var AdminModalsModule = /** @class */ (function () {
    function AdminModalsModule() {
    }
    AdminModalsModule = __decorate([
        core_1.NgModule({
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