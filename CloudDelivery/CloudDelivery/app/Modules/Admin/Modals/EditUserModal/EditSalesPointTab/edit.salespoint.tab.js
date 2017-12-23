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
var UserDetails_1 = require("../../../../../Models/Users/UserDetails");
var EditSalespointTab = /** @class */ (function () {
    function EditSalespointTab() {
        this.model = new UserDetails_1.UserDetails();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", UserDetails_1.UserDetails)
    ], EditSalespointTab.prototype, "model", void 0);
    EditSalespointTab = __decorate([
        core_1.Component({
            selector: 'edit-salespoint-tab',
            templateUrl: './edit.salespoint.tab.html',
        }),
        __metadata("design:paramtypes", [])
    ], EditSalespointTab);
    return EditSalespointTab;
}());
exports.EditSalespointTab = EditSalespointTab;
//# sourceMappingURL=edit.salespoint.tab.js.map