import { Component, OnInit } from '@angular/core';
import { SessionService } from './Services/SessionService';
import { Router } from '@angular/router';

@Component({
    selector: 'my-app',
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
    constructor() { }
}
