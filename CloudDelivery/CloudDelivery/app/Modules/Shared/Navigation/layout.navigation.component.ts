import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { SessionService } from '../../../Services/SessionService';
import { MenuFactoryService } from '../../../Services/UI/MenuFactoryService';
import { SignalrService } from '../../../Services/SignalrService';
import { SignalrConnectionStates } from '../../../Models/Enums/SignalrConnectionState';

@Component({
    selector: 'app-layout-navigation',
    templateUrl: './layout.navigation.component.html'
})
export class LayoutNavigationComponent {
    public links: Array<any> = [];
    public userName: string;
    public connected: boolean = false;
    public reconnecting: boolean = false;


    constructor(private sessionService: SessionService, private menuService: MenuFactoryService, private signalrService: SignalrService, private cdr: ChangeDetectorRef) {
        this.reconnecting = signalrService.connectionState == SignalrConnectionStates.connecting;
        this.links = menuService.getMenu();
        this.userName = sessionService.user.name;

        this.signalrService.signalrStateChange.subscribe(state => {

            switch (state) {
                case SignalrConnectionStates.connecting:
                case SignalrConnectionStates.reconnecting:
                    this.reconnecting = true;
                    break;
                case SignalrConnectionStates.connected:
                    this.reconnecting = false;
                    this.connected = true;
                    break;
                case SignalrConnectionStates.disconnected:
                    this.reconnecting = false;
                    this.connected = false;
                    break;
            }


            this.cdr.detectChanges();
        });
    }

    reconnectWebsockets() {
        if (!this.reconnecting)
            this.signalrService.startConnection();
    }
}
