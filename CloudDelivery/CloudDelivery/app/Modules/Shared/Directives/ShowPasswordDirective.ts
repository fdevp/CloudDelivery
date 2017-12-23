import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
    selector: "[showPassword]"
})
export class ShowPasswordDirective {
    inputElement: ElementRef;
    parentElement: ElementRef;
    iconDivElement: ElementRef;
    iconElement: ElementRef;


    passwordText: boolean = false;

    constructor(private el: ElementRef, private renderer: Renderer2) {
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
        renderer.listen(this.iconDivElement, "click", event => {
            this.showPassword();
        });
        
        //add element to correct place
        if (renderer.nextSibling(this.parentElement)) {
            renderer.insertBefore(this.parentElement, this.iconDivElement, renderer.nextSibling(this.parentElement));
        } else {
            renderer.appendChild(this.parentElement, this.iconDivElement);   
        }
    }

    showPassword() {
        this.passwordText = !this.passwordText;
        if (this.passwordText) {
            this.setTextInput();
        } else {
            this.setPasswordInput();
        }
    }

    setTextInput() {
        this.renderer.addClass(this.iconElement, "fa-eye-slash");
        this.renderer.removeClass(this.iconElement, "fa-eye");
        this.renderer.setAttribute(this.inputElement.nativeElement, "type", "text");
    }


    setPasswordInput() {
        this.renderer.addClass(this.iconElement, "fa-eye");
        this.renderer.removeClass(this.iconElement, "fa-eye-slash");
        this.renderer.setAttribute(this.inputElement.nativeElement, "type", "password");
    }


}