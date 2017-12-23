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
var ShowPasswordDirective = /** @class */ (function () {
    function ShowPasswordDirective(el, renderer) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.passwordText = false;
        this.inputElement = el;
        this.parentElement = renderer.parentNode(el.nativeElement);
        //add button box to input
        this.iconDivElement = renderer.createElement("iconthis.iconDivElementElement");
        renderer.addClass(this.iconDivElement, "input-group-addon");
        this.iconElement = renderer.createElement("i");
        renderer.addClass(this.iconElement, "fa");
        renderer.addClass(this.iconElement, "fa-eye");
        renderer.appendChild(this.iconDivElement, this.iconElement);
        //set listener
        renderer.listen(this.iconDivElement, "click", function (event) {
            _this.showPassword();
        });
        //add element to correct place
        if (renderer.nextSibling(this.parentElement)) {
            renderer.insertBefore(this.parentElement, this.iconDivElement, renderer.nextSibling(this.parentElement));
        }
        else {
            renderer.appendChild(this.parentElement, this.iconDivElement);
        }
    }
    ShowPasswordDirective.prototype.showPassword = function () {
        this.passwordText = !this.passwordText;
        if (this.passwordText) {
            this.setTextInput();
        }
        else {
            this.setPasswordInput();
        }
    };
    ShowPasswordDirective.prototype.setTextInput = function () {
        this.renderer.addClass(this.iconElement, "fa-eye-slash");
        this.renderer.removeClass(this.iconElement, "fa-eye");
        this.renderer.setAttribute(this.inputElement.nativeElement, "type", "text");
    };
    ShowPasswordDirective.prototype.setPasswordInput = function () {
        this.renderer.addClass(this.iconElement, "fa-eye");
        this.renderer.removeClass(this.iconElement, "fa-eye-slash");
        this.renderer.setAttribute(this.inputElement.nativeElement, "type", "password");
    };
    ShowPasswordDirective = __decorate([
        core_1.Directive({
            selector: "[showPassword]"
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2])
    ], ShowPasswordDirective);
    return ShowPasswordDirective;
}());
exports.ShowPasswordDirective = ShowPasswordDirective;
//# sourceMappingURL=ShowPasswordDirective.js.map