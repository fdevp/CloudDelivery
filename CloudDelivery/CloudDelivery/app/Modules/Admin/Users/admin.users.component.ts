import { Component, OnInit, OnDestroy, ComponentFactoryResolver, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { UsersService } from '../../../Services/UsersService';
import { ModalFactoryService } from '../../../Services/UI/ModalFactoryService';
import { ToastFactoryService } from '../../../Services/UI/ToastFactoryService';
import { UserListItem } from '../../../Models/Users/UserListItem';
import { UserEditModel } from '../../../Models/Users/UserEditModel';
import { AddUserModal } from '../Modals/AddUserModal/add.user.modal';
import { ActiveToast } from 'ngx-toastr'
import { Router } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';
import { RoleNamePipe } from '../../Shared/Pipes/RoleNamePipe'
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-admin-users',
    templateUrl: './admin.users.component.html',
})

export class AdminUsersComponent {

    public selected = [];

    public users: Array<UserListItem> = [];
    public filteredUsers: Array<UserListItem> = [];

    public initialized: boolean = false;

    constructor(private usersService: UsersService, private modalService: ModalFactoryService, private toastService: ToastFactoryService, private router: Router, private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef ) {
        this.initializeUsersList();
    }

    columns = [
        { prop: 'Id' },
        { prop: 'Login', name: 'Login' },
        { prop: 'Name', name: 'Nazwa' },
        { prop: 'Organisation', name: 'Organizacja' },
        { prop: 'Roles', name: 'Rola', pipe: new RoleNamePipe(this.sanitizer) }
    ];
  


    public initializeUsersList(): void {
        this.usersService.list().subscribe(usersList => {
            this.users = usersList;
            this.filteredUsers = usersList;
            this.initialized = true;
        });
    }


    public addUser() {

        var modal = this.modalService.showModal("AddUserModal");
        var progressToast: ActiveToast;

        modal.content.submit.subscribe((model: UserEditModel) => {

            progressToast = this.toastService.progress("Dodawanie użytkownika");

            this.usersService.create(model).subscribe(id => {
                var toast = this.toastService.successCreating("Dodano użytkownika " + model.Login);
                toast.onTap = new Observable<any>(() => {
                    var modal = this.modalService.showModal("EditUserModal", { class: "modal-lg" });
                    modal.content.initUserDetails(id);
                });


                progressToast.toastRef.close();
                this.usersService.list();
            }, err => {
                this.toastService.toastr.error("Błąd", "Nie udało się utworzyć użytkownika");
                progressToast.toastRef.close();
            });
        });

    }

    public userSelect({ selected }) {
        var obj = this;
        var modal = this.modalService.showModal("EditUserModal", { class: "modal-lg" });
        modal.content.initUserDetails(selected[0].Id);

        var modalClose: EventEmitter<any> = modal.content.modalClosed;
        modalClose.subscribe(() => {
            obj.selected = [];
            obj.cdr.detectChanges();
        });
    }


    public keyFilter(event): void {
        if (this.users.length == 0) {
            this.filteredUsers = [];
            return;
        }

        if (event.target.value == null || event.target.value.length == 0) {
            this.filteredUsers = this.users;
            return;
        }

        var val = event.target.value.toLowerCase();

        this.filteredUsers = this.users.filter(function (u) {
            return (u.Name.toLowerCase().indexOf(val) > -1 ||
                (u.Organisation != null && u.Organisation.toLowerCase().indexOf(val) > -1) ||
                (u.Roles != null && u.Roles.toLowerCase().indexOf(val) > -1))
        });
    }
}