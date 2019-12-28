import { Component, OnInit } from '@angular/core';
import { RefreshTokenInfo } from '../../../../Models/RefreshTokenInfo';
import { SessionService } from '../../../../Services/SessionService';
import { ModalFactoryService } from '../../../../Services/UI/ModalFactoryService';
import { ToastrService } from 'ngx-toastr';
import { ToastFactoryService } from '../../../../Services/UI/ToastFactoryService';


@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
    tokens: RefreshTokenInfo[] = null;

    ngOnInit(): void {
        this.initializeList();
    }

    constructor(private sessionService: SessionService, private modalService: ModalFactoryService, private toastService: ToastFactoryService) {
        
    }

    initializeList(): void {
        this.sessionService.refreshTokens().subscribe(tokens => {
            this.tokens = tokens;
            console.log(tokens);
        });
    }

    public cancelToken(token) {
        this.modalService.ConfirmModal("Czy na pewno chcesz się wylogować z urządzenia " + token.Device).subscribe(confirmation => {
            if (!confirmation) {
                return;
            }

            var inProgressToast = this.toastService.progress("Wylogowywanie z urządzenia");

            this.sessionService.cancelToken(token.Id).subscribe(t => {
                this.tokens = this.tokens.filter(t => t !== token);
                inProgressToast.toastRef.close();
                this.toastService.toastr.success("Wylogowano z urządzenia" + token.Device);
            }, err => {
                inProgressToast.toastRef.close();
                this.toastService.toastr.error("Wystąpił błąd: " + err, "Wylogowywanie");
            })
        })
    }

}