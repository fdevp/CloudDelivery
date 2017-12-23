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
var ModalFactoryService_1 = require("../../../Services/Layout/ModalFactoryService");
var ToastFactoryService_1 = require("../../../Services/Layout/ToastFactoryService");
var router_1 = require("@angular/router");
var AdminUsersComponent = /** @class */ (function () {
    function AdminUsersComponent(usersService, modalService, toastService, router) {
        this.usersService = usersService;
        this.modalService = modalService;
        this.toastService = toastService;
        this.router = router;
        this.columns = [
            { prop: 'Id' },
            { prop: 'Login', name: 'Login' },
            { prop: 'Name', name: 'Nazwa' },
            { prop: 'Organisation', name: 'Organizacja' },
            { prop: 'Roles', name: 'Role' }
        ];
        this.selected = [];
        this.users = [];
        this.filteredUsers = [];
        this.initialized = false;
        this.initializeUsersList();
    }
    AdminUsersComponent.prototype.initializeUsersList = function () {
        var _this = this;
        this.usersService.list(false).subscribe(function (usersList) {
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
                _this.toastService.successCreatingUser(model.Login, id.toString());
                progressToast.toastRef.close();
                _this.usersService.list(true);
            }, function (err) {
                _this.toastService.errorCreatingUser();
                progressToast.toastRef.close();
            });
        });
    };
    AdminUsersComponent.prototype.userSelect = function (_a) {
        var selected = _a.selected;
        console.log('Select Event', selected);
        var modal = this.modalService.showModal("EditUserModal", { class: "modal-lg" });
        modal.content.initUserDetails(selected[0].Id);
        //this.router.navigate(["admin/user", selected[0].Id]);
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
        __metadata("design:paramtypes", [UsersService_1.UsersService, ModalFactoryService_1.ModalFactoryService, ToastFactoryService_1.ToastFactoryService, router_1.Router])
    ], AdminUsersComponent);
    return AdminUsersComponent;
}());
exports.AdminUsersComponent = AdminUsersComponent;
//# sourceMappingURL=admin.users.component.js.map