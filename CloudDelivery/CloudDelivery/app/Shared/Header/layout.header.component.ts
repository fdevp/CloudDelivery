import { Component, Input, OnInit } from '@angular/core';
import { SessionService } from '../../Services/SessionService';

@Component({
    selector: 'app-layout-header',
    templateUrl: './layout.header.component.html'
})
export class LayoutHeaderComponent {
    @Input() links: Array<any> = [];

    constructor(private sessionService: SessionService) {
        
    }

    public Logout(): void{
        this.sessionService.logout();
    }
}
