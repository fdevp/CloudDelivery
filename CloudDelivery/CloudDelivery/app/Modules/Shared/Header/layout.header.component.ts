import { Component, Input, OnInit } from '@angular/core';
import { SessionService } from '../../../Services/SessionService';
import { MenuFactoryService } from '../../../Services/Layout/MenuFactoryService';

@Component({
    selector: 'app-layout-header',
    templateUrl: './layout.header.component.html'
})
export class LayoutHeaderComponent {
    public links: Array<any> = [];

    constructor(private sessionService: SessionService, private menuService: MenuFactoryService) {
        this.links = menuService.getMenu();
    }

    public Logout(): void{
        this.sessionService.logout();
    }
}
