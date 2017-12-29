import { Component, Input, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap'
import { UserEditModel } from '../../../../Models/Users/UserEditModel'

@Component({
    selector: 'add-user-modal',
    templateUrl: './add.user.modal.html',
})

export class AddUserModal {
    public model: UserEditModel = new UserEditModel();
    public submit: EventEmitter<UserEditModel> = new EventEmitter();

    constructor(public bsModalRef: BsModalRef) { }

    submitAction() {
        this.submit.emit(this.model);
        this.bsModalRef.hide();
    }
}