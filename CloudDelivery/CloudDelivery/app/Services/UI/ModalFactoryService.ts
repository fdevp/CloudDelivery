﻿import { Injectable, EventEmitter, } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap'
import { AddUserModal } from '../../Modules/Admin/Modals/AddUserModal/add.user.modal';
import { EditUserModal } from '../../Modules/Admin/Modals/EditUserModal/edit.user.modal';

import { ConfirmModal } from '../../Modules/Shared/Modals/ConfirmModal';
import { Observable } from 'rxjs/Observable';
import { AddOrganisationModal } from '../../Modules/Admin/Modals/AddOrganisationModal/add.organisation.modal';
import { EditOrganisationModal } from '../../Modules/Admin/Modals/EditOrganisationModal/edit.organisation.modal';
import { OrderDetailsModal } from '../../Modules/Shared/Modals/OrderDetailsModal/order.details.modal';

@Injectable()
export class ModalFactoryService {
    onModalHide: EventEmitter<any>;

    private ngxService: BsModalService = null;
    private modals: { [name: string]: any; } = {
        "AddUserModal": AddUserModal,
        "AddOrganisationModal": AddOrganisationModal,
        "EditOrganisationModal": EditOrganisationModal,
        "EditUserModal": EditUserModal,
        "ConfirmModal": ConfirmModal,
        "OrderDetailsModal": OrderDetailsModal
    };

    constructor() {

    }

    public setNgxService(service: BsModalService) {
        this.ngxService = service;
        this.onModalHide = this.ngxService.onHide;
    }

    public showModal(componentName, config?): BsModalRef {
        if (config != null)
            return this.ngxService.show(this.modals[componentName], config);
        else
            return this.ngxService.show(this.modals[componentName]);
    }

    public addModal(name, component) {
        this.modals[name] = component;
    }

    public ConfirmModal(message): Observable<boolean> {
        var modal = this.ngxService.show(ConfirmModal);
        modal.content.message = message;
        return modal.content.submit;
    }
}