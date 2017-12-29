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
var UsersService_1 = require("../../../../../Services/UsersService");
var UserDetails_1 = require("../../../../../Models/Users/UserDetails");
var ToastFactoryService_1 = require("../../../../../Services/Layout/ToastFactoryService");
var EditPasswordTab = /** @class */ (function () {
    function EditPasswordTab(usersService, toastService) {
        this.usersService = usersService;
        this.toastService = toastService;
        this.newPassword = "";
        this.inProgress = false;
    }
    EditPasswordTab.prototype.changePassword = function () {
        var _this = this;
        this.inProgress = true;
        this.usersService.changePassword(this.model.Id, this.newPassword).subscribe(function (resp) {
            _this.inProgress = false;
            if (resp) {
                _this.newPassword = "";
                _this.toastService.toastr.success("Ustawiono nowe hasło", "Hasło użytkownika");
            }
            else {
                _this.toastService.toastr.error("Błąd przy ustawianiu nowego hasła", "Hasło użytkownika");
            }
        }, function (err) {
            _this.inProgress = false;
            _this.toastService.toastr.error(err, "Hasło użytkownika");
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", UserDetails_1.UserDetails)
    ], EditPasswordTab.prototype, "model", void 0);
    EditPasswordTab = __decorate([
        core_1.Component({
            selector: 'edit-password-tab',
            templateUrl: './edit.password.tab.html',
        }),
        __metadata("design:paramtypes", [UsersService_1.UsersService, ToastFactoryService_1.ToastFactoryService])
    ], EditPasswordTab);
    return EditPasswordTab;
}());
exports.EditPasswordTab = EditPasswordTab;
//# sourceMappingURL=edit.password.tab.js.map