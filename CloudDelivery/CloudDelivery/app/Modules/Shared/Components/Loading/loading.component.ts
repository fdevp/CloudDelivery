import { Component, ElementRef, Renderer2, OnInit } from "@angular/core";




declare const bodymovin: any;

@Component({
    selector: 'loading-component',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit{
    
    root: ElementRef;

    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.root = el;
    }

    ngOnInit(): void {
        var lottieContainer = this.root.nativeElement.children[0].children[0];
        var animation = bodymovin.loadAnimation({
            container: lottieContainer, // Required
            path: 'Content/Lottie/truck_running.json', // Required
            renderer: 'svg/canvas/html', // Required
            loop: true, // Optional
            autoplay: true, // Optional
        })
    }

}