import { Component, Input, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap'

@Component({
    selector: 'confirm-modal',
    template: `
    <ng-template #template>
      <div class="modal-body text-center">
        <p>{{message}}</p>
        <button type="button" class="btn btn-default" (click)="confirm()" >Tak</button>
        <button type="button" class="btn btn-primary" (click)="decline()" >Nie</button>
      </div>
    </ng-template>
`,
})

export class ConfirmModal {
    submit: EventEmitter<boolean> = new EventEmitter();

    modalRef: BsModalRef;
    message: string;

    constructor(public bsModalRef: BsModalRef) { }

  
    confirm(): void {
        this.submit.emit(true);
        this.modalRef.hide();
    }

    decline(): void {
        this.submit.emit(false);
        this.modalRef.hide();
    }
}