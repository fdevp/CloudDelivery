import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../Services/SessionService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-layout-loading',
    styleUrls: ['./redirect.component.css'],
    template: '<div class="loader-container"></div>'
})
export class RedirectComponent implements OnInit{
    constructor(private sessionService: SessionService, private router: Router) {
       
    }
    ngOnInit() {
        this.sessionService.checkLogin().subscribe(isLoggedIn => {
            if (!isLoggedIn) {
                this.router.navigate(['/login']);
                return;
            }

            let page = "";

            if (this.sessionService.isAdmin())
                page = '/admin';
            else if (this.sessionService.hasRole("carrier"))
                page = '/carrier';
            this.router.navigate([page])
        }, err => {
            this.router.navigate(['/login']);
        });
    }
}