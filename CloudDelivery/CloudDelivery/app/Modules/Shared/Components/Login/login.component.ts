import { Component } from '@angular/core';
import { SessionService } from '../../../../Services/SessionService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-layout-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    public password: string;
    public login: string;
    public inProgress: boolean = false;
    public errorOccured: boolean = false;
    public errorMessage: string = "";

    constructor(private sessionService: SessionService, private router: Router) {
    }

    private signIn() {
        this.inProgress = true;
        this.errorOccured = false;
        if(this.sessionService.redirectUrl==null)
            this.sessionService.redirectUrl = "";
        this.sessionService.login(this.login, this.password).subscribe(result => {  }, error => {
            this.errorOccured = true;
            this.inProgress = false;
            var body = JSON.parse(error["_body"]);
            this.errorMessage = body["error_description"];
        }, () => {
            this.inProgress = false;
        });
    }
}