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
var UsersService_1 = require("../../../Services/UsersService");
var ModalFactoryService_1 = require("../../../Services/UI/ModalFactoryService");
var ToastFactoryService_1 = require("../../../Services/UI/ToastFactoryService");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var RoleNamePipe_1 = require("../../Shared/Pipes/RoleNamePipe");
var Observable_1 = require("rxjs/Observable");
var AdminUsersComponent = /** @class */ (function () {
    function AdminUsersComponent(usersService, modalService, toastService, router, sanitizer, cdr) {
        this.usersService = usersService;
        this.modalService = modalService;
        this.toastService = toastService;
        this.router = router;
        this.sanitizer = sanitizer;
        this.cdr = cdr;
        this.selected = [];
        this.users = [];
        this.filteredUsers = [];
        this.initialized = false;
        this.columns = [
            { prop: 'Id' },
            { prop: 'Login', name: 'Login' },
            { prop: 'Name', name: 'Nazwa' },
            { prop: 'Organisation', name: 'Organizacja' },
            { prop: 'Roles', name: 'Rola', pipe: new RoleNamePipe_1.RoleNamePipe(this.sanitizer) }
        ];
        this.initializeUsersList();
    }
    AdminUsersComponent.prototype.initializeUsersList = function () {
        var _this = this;
        this.usersService.list().subscribe(function (usersList) {
            _this.users = usersList;
            _this.filteredUsers = usersList;
            _this.initialized = true;
        });
    };
    AdminUsersComponent.prototype.addUser = function () {
        var _this = this;
        var modal = this.modalService.showModal("AddUserModal");
        var progressToast;
        modal.content.submit.subscribe(function (model) {
            progressToast = _this.toastService.progress("Dodawanie użytkownika");
            _this.usersService.create(model).subscribe(function (id) {
                var toast = _this.toastService.successCreating("Dodano użytkownika " + model.Login);
                toast.onTap = new Observable_1.Observable(function () {
                    var modal = _this.modalService.showModal("EditUserModal", { class: "modal-lg" });
                    modal.content.initUserDetails(id);
                });
                progressToast.toastRef.close();
                _this.usersService.list();
            }, function (err) {
                _this.toastService.toastr.error("Błąd", "Nie udało się utworzyć użytkownika");
                progressToast.toastRef.close();
            });
        });
    };
    AdminUsersComponent.prototype.userSelect = function (_a) {
        var selected = _a.selected;
        var obj = this;
        var modal = this.modalService.showModal("EditUserModal", { class: "modal-lg" });
        modal.content.initUserDetails(selected[0].Id);
        var modalClose = modal.content.modalClosed;
        modalClose.subscribe(function () {
            obj.selected = [];
            obj.cdr.detectChanges();
        });
    };
    AdminUsersComponent.prototype.keyFilter = function (event) {
        if (this.users.length == 0) {
            this.filteredUsers = [];
            return;
        }
        if (event.target.value == null || event.target.value.length == 0) {
            this.filteredUsers = this.users;
            return;
        }
        var val = event.target.value.toLowerCase();
        this.filteredUsers = this.users.filter(function (u) {
            return (u.Name.toLowerCase().indexOf(val) > -1 ||
                (u.Organisation != null && u.Organisation.toLowerCase().indexOf(val) > -1) ||
                (u.Roles != null && u.Roles.toLowerCase().indexOf(val) > -1));
        });
    };
    AdminUsersComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-users',
            templateUrl: './admin.users.component.html',
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof UsersService_1.UsersService !== "undefined" && UsersService_1.UsersService) === "function" && _a || Object, ModalFactoryService_1.ModalFactoryService, ToastFactoryService_1.ToastFactoryService, router_1.Router, platform_browser_1.DomSanitizer, core_1.ChangeDetectorRef])
    ], AdminUsersComponent);
    return AdminUsersComponent;
    var _a;
}());
exports.AdminUsersComponent = AdminUsersComponent;
//# sourceMappingURL=admin.users.component.js.map