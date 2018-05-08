import { Component, OnInit, ElementRef, Renderer2, Input } from "@angular/core";



declare const bodymovin: any;

@Component({
    selector: 'lottie-component',
    template: `<div></div>`
})
export class LottieComponent implements OnInit {
    @Input() selectorElementClasses: string;
    @Input() bodyMovinElementClasses: string;
    @Input() lottiePath: string;

    selectorElement: any;
    bodyMovinElement: any;

    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.selectorElement = el.nativeElement;
    }

    ngOnInit(): void{
        this.bodyMovinElement = this.selectorElement.children[0];

        this.selectorElement.className += " " + this.selectorElementClasses;
        this.bodyMovinElement.className += " " + this.bodyMovinElementClasses;

        console.warn(this.selectorElement);
        console.warn(this.bodyMovinElement);

    }
}