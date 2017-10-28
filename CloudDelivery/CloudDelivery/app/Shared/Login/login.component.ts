import { Component } from '@angular/core';
import { SessionService } from '../../Services/SessionService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-layout-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    public password: string;
    public email: string;
    public inProgress: boolean = false;

    constructor(private sessionService: SessionService, private router: Router) {
    }

    private login() {
        this.inProgress = true;
        this.sessionService.redirectUrl = "";
        this.sessionService.login(this.email, this.password).subscribe(result => null, error => {
            console.log("ss error", error)
        }, () => {
            this.inProgress = false;
        });
    }
}