import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { UsersService } from '../../../Services/UsersService';
import { ModalFactoryService } from '../../../Services/Layout/ModalFactoryService';
import { ToastFactoryService } from '../../../Services/Layout/ToastFactoryService';
import { UserListItem } from '../../../Models/Users/UserListItem';
import { UserEditModel } from '../../../Models/Users/UserEditModel';
import { AddUserModal } from '../Modals/AddUserModal/add.user.modal';
import { ActiveToast } from 'ngx-toastr'
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-users',
    templateUrl: './admin.users.component.html',
})

export class AdminUsersComponent {

    constructor(private usersService: UsersService, private modalService: ModalFactoryService, private toastService: ToastFactoryService,private router: Router) {
        this.initializeUsersList();
    }

    columns = [
        { prop: 'Id' },
        { prop: 'Login', name: 'Login' },
        { prop: 'Name', name: 'Nazwa' },
        { prop: 'Organisation', name: 'Organizacja' },
        { prop: 'Roles', name: 'Role' }
    ];

    public selected = [];

    public users: Array<UserListItem> = [];
    public filteredUsers: Array<UserListItem> = [];

    public initialized: boolean = false;


    public initializeUsersList(): void {
        this.usersService.list(false).subscribe(usersList => {
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
                this.toastService.successCreatingUser(model.Login, id.toString());
                progressToast.toastRef.close();
                this.usersService.list(true);
            }, err => {
                this.toastService.errorCreatingUser();
                progressToast.toastRef.close();
            });
        });


    }

    public userSelect({ selected }) {
        console.log('Select Event', selected);
        var modal = this.modalService.showModal("EditUserModal", { class: "modal-lg" });
        modal.content.initUserDetails(selected[0].Id);
        //this.router.navigate(["admin/user", selected[0].Id]);
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