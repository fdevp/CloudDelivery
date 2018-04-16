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
var ngx_toastr_1 = require("ngx-toastr");
var ProgressToast = /** @class */ (function () {
    function ProgressToast(toastPackage) {
        this.toastPackage = toastPackage;
        this.title = toastPackage.title;
    }
    ProgressToast = __decorate([
        core_1.Component({
            selector: 'toast-progress-creating-user',
            template: "\n   <div class=\"toast ng-trigger ng-trigger-flyInOut toast-gray toast-padding\">\n        <div class=\"toast-title\"> \n            <div class=\"content-middle\">\n                <i class=\"fa fa-cog fa-spin fa-2x toast-icon\"></i>\n                <span class=\"toast-text\">{{title}}</span>\n            </div>\n        </div>\n   </div>\n  ",
            styleUrls: ["./toasts.css"]
        }),
        __metadata("design:paramtypes", [ngx_toastr_1.ToastPackage])
    ], ProgressToast);
    return ProgressToast;
}());
exports.ProgressToast = ProgressToast;
//# sourceMappingURL=ProgressToast.js.map