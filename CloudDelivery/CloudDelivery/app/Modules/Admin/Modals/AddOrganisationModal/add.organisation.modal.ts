import { Component, Input, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap'
import { UserEditModel } from '../../../../Models/Users/UserEditModel'

@Component({
    selector: 'add-organisation-modal',
    templateUrl: './add.organisation.modal.html',
})

export class AddOrganisationModal {
    public organisationName: string;
    public submit: EventEmitter<string> = new EventEmitter();

    constructor(public bsModalRef: BsModalRef) { }

    submitAction() {
        this.submit.emit(this.organisationName);
        this.bsModalRef.hide();
    }
}