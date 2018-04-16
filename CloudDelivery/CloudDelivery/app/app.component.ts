import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { SessionService } from './Services/SessionService';
import { ModalFactoryService } from './Services/UI/ModalFactoryService';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';

@Component({
    selector: 'my-app',
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
    constructor(private bsmodalService: BsModalService, private modalService: ModalFactoryService) {
        this.modalService.setNgxService(bsmodalService);
    }
}
