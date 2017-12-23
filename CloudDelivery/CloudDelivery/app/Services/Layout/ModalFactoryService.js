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
var add_user_modal_1 = require("../../Modules/Admin/Modals/AddUserModal/add.user.modal");
var edit_user_modal_1 = require("../../Modules/Admin/Modals/EditUserModal/edit.user.modal");
var ModalFactoryService = /** @class */ (function () {
    function ModalFactoryService() {
        this.ngxService = null;
        this.modals = {
            "AddUserModal": add_user_modal_1.AddUserModal,
            "EditUserModal": edit_user_modal_1.EditUserModal
        };
    }
    ModalFactoryService.prototype.setNgxService = function (service) {
        this.ngxService = service;
    };
    ModalFactoryService.prototype.showModal = function (componentName, config) {
        if (config != null)
            return this.ngxService.show(this.modals[componentName], config);
        else
            return this.ngxService.show(this.modals[componentName]);
    };
    ModalFactoryService.prototype.addModal = function (name, component) {
        this.modals[name] = component;
    };
    ModalFactoryService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ModalFactoryService);
    return ModalFactoryService;
}());
exports.ModalFactoryService = ModalFactoryService;
//# sourceMappingURL=ModalFactoryService.js.map