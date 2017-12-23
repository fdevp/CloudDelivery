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
var UserDetails_1 = require("../../../../Models/Users/UserDetails");
var UsersService_1 = require("../../../../Services/UsersService");
var OrganisationsService_1 = require("../../../../Services/OrganisationsService");
var EditUserModal = /** @class */ (function () {
    function EditUserModal(bsModalRef, usersService, orgService) {
        this.bsModalRef = bsModalRef;
        this.usersService = usersService;
        this.orgService = orgService;
        this.details = new UserDetails_1.UserDetails();
        this.detailsProgress = true;
    }
    EditUserModal.prototype.removeUser = function () {
        this.bsModalRef.hide();
    };
    EditUserModal.prototype.initUserDetails = function (userId) {
        var _this = this;
        this.userId = userId;
        this.orgService.list().subscribe(function (orgList) {
            console.warn("ORG LIST", orgList);
        });
        this.usersService.details(this.userId).subscribe(function (userDetails) {
            _this.details = userDetails;
            _this.detailsProgress = false;
        });
    };
    EditUserModal = __decorate([
        core_1.Component({
            selector: 'edit-user-modal',
            templateUrl: './edit.user.modal.html',
            styleUrls: ['./edit-user-modal.css']
        }),
        __metadata("design:paramtypes", [ngx_bootstrap_1.BsModalRef, UsersService_1.UsersService, OrganisationsService_1.OrganisationsService])
    ], EditUserModal);
    return EditUserModal;
}());
exports.EditUserModal = EditUserModal;
//# sourceMappingURL=edit.user.modal.js.map