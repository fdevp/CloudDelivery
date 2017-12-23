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
var ConfirmModal = /** @class */ (function () {
    function ConfirmModal(bsModalRef) {
        this.bsModalRef = bsModalRef;
        this.submit = new core_1.EventEmitter();
    }
    ConfirmModal.prototype.confirm = function () {
        this.submit.emit(true);
        this.modalRef.hide();
    };
    ConfirmModal.prototype.decline = function () {
        this.submit.emit(false);
        this.modalRef.hide();
    };
    ConfirmModal = __decorate([
        core_1.Component({
            selector: 'confirm-modal',
            template: "\n    <ng-template #template>\n      <div class=\"modal-body text-center\">\n        <p>{{message}}</p>\n        <button type=\"button\" class=\"btn btn-default\" (click)=\"confirm()\" >Tak</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"decline()\" >Nie</button>\n      </div>\n    </ng-template>\n",
        }),
        __metadata("design:paramtypes", [ngx_bootstrap_1.BsModalRef])
    ], ConfirmModal);
    return ConfirmModal;
}());
exports.ConfirmModal = ConfirmModal;
//# sourceMappingURL=ConfirmModal.js.map