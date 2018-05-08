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
var LottieComponent = /** @class */ (function () {
    function LottieComponent(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.selectorElement = el;
        this.bodyMovinElement = this.selectorElement.nativeElement.children[0];
    }
    LottieComponent.prototype.ngOnInit = function () {
        this.selectorElement.nativeElement.className += " " + this.selectorElementClasses;
        this.bodyMovinElement.nativeElement.className += " " + this.bodyMovinElementClasses;
        console.warn(this.selectorElement);
        console.warn(this.bodyMovinElement);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LottieComponent.prototype, "selectorElementClasses", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LottieComponent.prototype, "bodyMovinElementClasses", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LottieComponent.prototype, "lottiePath", void 0);
    LottieComponent = __decorate([
        core_1.Component({
            selector: 'lottie-component',
            template: "<div></div>"
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2])
    ], LottieComponent);
    return LottieComponent;
}());
exports.LottieComponent = LottieComponent;
//# sourceMappingURL=LottieComponent.js.map