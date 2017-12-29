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
var OrganisationsService_1 = require("../../../../../Services/OrganisationsService");
var UsersService_1 = require("../../../../../Services/UsersService");
var EditOrgUsersTab = /** @class */ (function () {
    function EditOrgUsersTab(orgService, usersService) {
        this.orgService = orgService;
        this.usersService = usersService;
        this.members = new Array();
        this.inProgress = true;
    }
    EditOrgUsersTab.prototype.ngOnInit = function () {
        var _this = this;
        this.orgService.members(this.orgId).subscribe(function (list) {
            _this.members = list;
            _this.inProgress = false;
            console.log(_this.members);
        }, function (err) {
            _this.inProgress = false;
        });
    };
    EditOrgUsersTab.prototype.removeMember = function (id) {
        var _this = this;
        this.usersService.setOrganisation(id, null).subscribe(function (response) {
            if (response) {
                var elementIndex = _this.members.indexOf(_this.members.find(function (x) { return x.Id == id; }));
                _this.members.splice(elementIndex, 1);
            }
        }, function (err) {
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], EditOrgUsersTab.prototype, "orgId", void 0);
    EditOrgUsersTab = __decorate([
        core_1.Component({
            selector: 'edit-org-users-tab',
            templateUrl: './edit.org.users.tab.html',
        }),
        __metadata("design:paramtypes", [OrganisationsService_1.OrganisationsService, UsersService_1.UsersService])
    ], EditOrgUsersTab);
    return EditOrgUsersTab;
}());
exports.EditOrgUsersTab = EditOrgUsersTab;
//# sourceMappingURL=edit.org.users.tab.js.map