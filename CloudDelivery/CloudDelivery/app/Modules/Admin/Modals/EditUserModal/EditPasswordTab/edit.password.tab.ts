import { Component, Input } from '@angular/core';
import { ShowPasswordDirective } from '../../../../Shared/Directives/ShowPasswordDirective'
import { UsersService } from '../../../../../Services/Admin/UsersService';
import { UserDetails } from '../../../../../Models/Users/UserDetails';
import { ToastFactoryService } from '../../../../../Services/UI/ToastFactoryService';

@Component({
    selector: 'edit-password-tab',
    templateUrl: './edit.password.tab.html',
})

export class EditPasswordTab {
    @Input() model: UserDetails;

    newPassword: string;
    inProgress: boolean;

    constructor(private usersService: UsersService, private toastService: ToastFactoryService) {
        this.newPassword = "";
        this.inProgress = false;
    }

    changePassword() {
        this.inProgress = true;
        this.usersService.changePassword(this.model.Id, this.newPassword).subscribe(resp => {
            this.inProgress = false;
            if (resp) {
                this.newPassword = "";
                this.toastService.toastr.success("Ustawiono nowe hasło", "Hasło użytkownika");
            } else {
                this.toastService.toastr.error("Błąd przy ustawianiu nowego hasła", "Hasło użytkownika");
            }
        }, err => {
            this.inProgress = false;
            this.toastService.toastr.error(err, "Hasło użytkownika");
        });
    }
}