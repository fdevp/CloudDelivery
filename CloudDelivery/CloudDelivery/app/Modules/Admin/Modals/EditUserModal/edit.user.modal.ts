import { Component, Input, EventEmitter, Inject, forwardRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap'
import { UserDetails } from '../../../../Models/Users/UserDetails'
import { Organisation } from '../../../../Models/Organisations/Organisation'
import { UsersService } from '../../../../Services/UsersService'
import { OrganisationsService } from '../../../../Services/OrganisationsService'
import { ModalFactoryService } from '../../../../Services/Layout/ModalFactoryService';
import { ToastFactoryService } from '../../../../Services/Layout/ToastFactoryService';

@Component({
    selector: 'edit-user-modal',
    templateUrl: './edit.user.modal.html',
})

export class EditUserModal {
    details: UserDetails = new UserDetails();
    userId: number;

    detailsProgress: boolean = true;

    constructor(private bsModalRef: BsModalRef, private usersService: UsersService, private orgService: OrganisationsService, private toastService: ToastFactoryService,
        @Inject(forwardRef(() => ModalFactoryService)) private modalService: ModalFactoryService) {

    }


    removeUser() {
        this.modalService.ConfirmModal("Czy na pewno chcesz usunąć konto " + this.details.Login + "?").subscribe(confirmation => {
            if (!confirmation)
                return;

            var progressToast = this.toastService.progress("Usuwanie użytkownika " + this.details.Login);

            this.usersService.remove(this.userId).subscribe(x => {
                progressToast.toastRef.close();
                if (x) {
                    this.toastService.toastr.success("Usunięto konto " + this.details.Login,"Usuwanie");
                    this.closeModal();
                }
                else {
                    this.toastService.toastr.error("Usuwanie konta " + this.details.Login + " niepowiodło się.", "Usuwanie");
                }
                    
            }, err => {
                progressToast.toastRef.close();
                this.toastService.toastr.error( "Usuwanie konta " + this.details.Login + " niepowiodło się.", "Usuwanie");
            });


        })

    }

    isCarrier(): boolean {
        return this.details != null && this.details.Roles.indexOf("carrier") > -1;
    }

    isSalePoint(): boolean {
        return this.details != null && this.details.Roles.indexOf("salepoint") > -1;
    }

    closeModal() {
        this.usersService.list();
        this.bsModalRef.hide();
    }

    initUserDetails(userId): void {
        this.userId = userId;

        this.usersService.details(this.userId).subscribe((userDetails: UserDetails) => {
            this.details = userDetails;
            this.detailsProgress = false;
        });

    }
}