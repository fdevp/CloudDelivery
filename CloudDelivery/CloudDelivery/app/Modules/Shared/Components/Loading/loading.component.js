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
var LoadingComponent = /** @class */ (function () {
    function LoadingComponent(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.root = el;
    }
    LoadingComponent.prototype.ngOnInit = function () {
        var lottieContainer = this.root.nativeElement.children[0].children[0];
        var animation = bodymovin.loadAnimation({
            container: lottieContainer,
            path: 'Content/Lottie/truck_running.json',
            renderer: 'svg/canvas/html',
            loop: true,
            autoplay: true,
        });
    };
    LoadingComponent = __decorate([
        core_1.Component({
            selector: 'loading-component',
            templateUrl: './loading.component.html',
            styleUrls: ['./loading.component.css']
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2])
    ], LoadingComponent);
    return LoadingComponent;
}());
exports.LoadingComponent = LoadingComponent;
//# sourceMappingURL=loading.component.js.map