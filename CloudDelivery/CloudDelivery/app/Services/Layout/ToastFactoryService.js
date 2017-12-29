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
var ProgressToast_1 = require("../../Modules/Shared/Toasts/ProgressToast");
var ToastFactoryService = /** @class */ (function () {
    function ToastFactoryService(toastr) {
        this.toastr = toastr;
    }
    ToastFactoryService.prototype.progress = function (title) {
        return this.toastr.show(null, title, {
            timeOut: 0,
            extendedTimeOut: 0,
            closeButton: false,
            tapToDismiss: false,
            toastComponent: ProgressToast_1.ProgressToast
        });
    };
    ToastFactoryService.prototype.successCreating = function (title) {
        var message = "Kliknij żeby przejść...";
        var toast = this.toastr.success(message, title, {
            "timeOut": 5000,
            enableHtml: true,
            progressBar: true,
            progressAnimation: "increasing"
        });
        return toast;
    };
    ToastFactoryService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ngx_toastr_1.ToastrService])
    ], ToastFactoryService);
    return ToastFactoryService;
}());
exports.ToastFactoryService = ToastFactoryService;
//# sourceMappingURL=ToastFactoryService.js.map