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
var platform_browser_1 = require("@angular/platform-browser");
var Roles_1 = require("../../../Models/Enums/Roles");
var RoleNamePipe = /** @class */ (function () {
    function RoleNamePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    RoleNamePipe.prototype.transform = function (value) {
        var name = value;
        var nullContent = "<span class='text-muted'><em>brak</em></span>";
        if (value == null || value == 'undefined' || value == "")
            return this.sanitizer.bypassSecurityTrustHtml(nullContent);
        switch (value) {
            case Roles_1.Roles.Admin:
                name = "Administrator";
                break;
            case Roles_1.Roles.Carrier:
                name = "Dostawca";
                break;
            case Roles_1.Roles.SalePoint:
                name = "Punkt sprzedaży";
                break;
            case Roles_1.Roles.Organisation:
                name = "Właściciel";
                break;
        }
        return name;
    };
    RoleNamePipe = __decorate([
        core_1.Pipe({ name: 'roleName' }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
    ], RoleNamePipe);
    return RoleNamePipe;
}());
exports.RoleNamePipe = RoleNamePipe;
//# sourceMappingURL=RoleNamePipe.js.map