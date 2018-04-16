import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { OrganisationsService } from '../../../Services/OrganisationsService';
import { ModalFactoryService } from '../../../Services/UI/ModalFactoryService';
import { Router } from '@angular/router';
import { ToastFactoryService } from '../../../Services/UI/ToastFactoryService';
import { Organisation } from '../../../Models/Organisations/Organisation';
import { ActiveToast } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-admin-organisations',
    templateUrl: './admin.organisations.component.html'
})

export class AdminOrganisationsComponent {
    columns = [
        { prop: 'Id' },
        { prop: 'Name', name: 'Nazwa' },
        { prop: 'MembersNumber', name: 'Ilość członków' },
    ]

    public selected = [];

    private orgs: Array<Organisation> = [];
    private filteredOrgs: Array<Organisation> = [];

    public initialized: boolean = false;

    constructor(private organisationsService: OrganisationsService, private modalService: ModalFactoryService, private toastService: ToastFactoryService, private router: Router, private cdr: ChangeDetectorRef) {
        this.initializeOrgsList();
    }

    initializeOrgsList(): void {
        this.organisationsService.list().subscribe(orgsList => {
            this.orgs = orgsList;
            this.filteredOrgs = orgsList;
            this.initialized = true;
        })
    }

    public orgSelect({ selected }) {
        var obj = this;
        var modal = this.modalService.showModal("EditOrganisationModal", { class: "modal-lg" });
        modal.content.initOrgDetails(selected[0]);

        this.modalService.onModalHide.subscribe(event => {
            obj.selected = [];
            obj.cdr.detectChanges();
        });
    }


    public keyFilter(event): void {
        if (this.orgs.length == 0) {
            this.filteredOrgs = [];
            return;
        }

        if (event.target.value == null || event.target.value.length == 0) {
            this.filteredOrgs = this.orgs;
            return;
        }

        var val = event.target.value.toLowerCase();

        this.filteredOrgs = this.orgs.filter(function (u) {
            return (u.Name.toLowerCase().indexOf(val) > -1 || u.Id.toString().indexOf(val) > -1)
        });
    }


    public addOrganisation() {

        var modal = this.modalService.showModal("AddOrganisationModal");
        var progressToast: ActiveToast;

        modal.content.submit.subscribe((name: string) => {

            progressToast = this.toastService.progress("Dodawanie organizacji");

            this.organisationsService.add(name).subscribe(id => {
                var toast = this.toastService.successCreating("Utworzono organizację " + name);
                toast.onTap = new Observable<any>(() => {
                    /*
                    var modal = this.modalService.showModal("EditUserModal", { class: "modal-lg" });
                    modal.content.initUserDetails(id);*/
                });


                progressToast.toastRef.close();
                this.organisationsService.list();
            }, err => {
                this.toastService.toastr.error("Błąd", "Nie udało się utworzyć użytkownika");
                progressToast.toastRef.close();
            });
        });
    }
}