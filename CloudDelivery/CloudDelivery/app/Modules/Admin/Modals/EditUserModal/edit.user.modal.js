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
var ngx_bootstrap_1 = require("ngx-bootstrap");
var UserDetails_1 = require("../../../../Models/Users/UserDetails");
var UsersService_1 = require("../../../../Services/UsersService");
var OrganisationsService_1 = require("../../../../Services/OrganisationsService");
var ModalFactoryService_1 = require("../../../../Services/UI/ModalFactoryService");
var ToastFactoryService_1 = require("../../../../Services/UI/ToastFactoryService");
var Roles_1 = require("../../../../Models/Enums/Roles");
var EditUserModal = /** @class */ (function () {
    function EditUserModal(bsModalRef, usersService, orgService, toastService, modalService) {
        this.bsModalRef = bsModalRef;
        this.usersService = usersService;
        this.orgService = orgService;
        this.toastService = toastService;
        this.modalService = modalService;
        this.details = new UserDetails_1.UserDetails();
        this.detailsProgress = true;
        this.modalClosed = new core_1.EventEmitter();
    }
    EditUserModal.prototype.removeUser = function () {
        var _this = this;
        this.modalService.ConfirmModal("Czy na pewno chcesz usunąć konto " + this.details.Login + "?").subscribe(function (confirmation) {
            if (!confirmation)
                return;
            var progressToast = _this.toastService.progress("Usuwanie użytkownika " + _this.details.Login);
            _this.usersService.remove(_this.userId).subscribe(function (x) {
                progressToast.toastRef.close();
                if (x) {
                    _this.toastService.toastr.success("Usunięto konto " + _this.details.Login, "Usuwanie");
                    _this.closeModal();
                }
                else {
                    _this.toastService.toastr.error("Usuwanie konta " + _this.details.Login + " niepowiodło się.", "Usuwanie");
                }
            }, function (err) {
                progressToast.toastRef.close();
                _this.toastService.toastr.error("Usuwanie konta " + _this.details.Login + " niepowiodło się.", "Usuwanie");
            });
        });
    };
    EditUserModal.prototype.isCarrier = function () {
        return this.details != null && this.details.Roles.indexOf(Roles_1.Roles.Carrier) > -1;
    };
    EditUserModal.prototype.isSalePoint = function () {
        return this.details != null && this.details.Roles.indexOf(Roles_1.Roles.SalePoint) > -1;
    };
    EditUserModal.prototype.closeModal = function () {
        this.modalClosed.emit();
        this.bsModalRef.hide();
    };
    EditUserModal.prototype.initUserDetails = function (userId) {
        var _this = this;
        this.userId = userId;
        this.usersService.details(this.userId).subscribe(function (userDetails) {
            _this.details = userDetails;
            _this.detailsProgress = false;
        });
    };
    EditUserModal = __decorate([
        core_1.Component({
            selector: 'edit-user-modal',
            templateUrl: './edit.user.modal.html',
        }),
        __param(4, core_1.Inject(core_1.forwardRef(function () { return ModalFactoryService_1.ModalFactoryService; }))),
        __metadata("design:paramtypes", [ngx_bootstrap_1.BsModalRef, typeof (_a = typeof UsersService_1.UsersService !== "undefined" && UsersService_1.UsersService) === "function" && _a || Object, typeof (_b = typeof OrganisationsService_1.OrganisationsService !== "undefined" && OrganisationsService_1.OrganisationsService) === "function" && _b || Object, ToastFactoryService_1.ToastFactoryService,
            ModalFactoryService_1.ModalFactoryService])
    ], EditUserModal);
    return EditUserModal;
    var _a, _b;
}());
exports.EditUserModal = EditUserModal;
//# sourceMappingURL=edit.user.modal.js.map