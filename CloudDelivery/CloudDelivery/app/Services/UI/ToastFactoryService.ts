import { Injectable, } from '@angular/core';
import { ToastrService, ActiveToast, IndividualConfig } from 'ngx-toastr';
import { ProgressToast } from '../../Modules/Shared/Toasts/ProgressToast'
import { Observable } from 'rxjs/Observable';
import { ModalFactoryService } from './ModalFactoryService';

@Injectable()
export class ToastFactoryService {
    constructor(public toastr: ToastrService) { }

    progress(title: string): ActiveToast{
        return this.toastr.show(null, title, {
            timeOut:0,
            extendedTimeOut: 0,
            closeButton: false,
            tapToDismiss: false,
            toastComponent: ProgressToast
        });
    }

    successCreating(title): ActiveToast {
        var message = "Kliknij żeby przejść...";
        var toast = this.toastr.success(message, title, {
            timeOut: 5000,
            enableHtml: true,
            progressBar: true,
            progressAnimation: "increasing"
        });

        return toast;
    }
    
}