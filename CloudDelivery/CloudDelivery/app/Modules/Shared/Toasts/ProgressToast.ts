import { Component, ApplicationRef} from '@angular/core'
import { Toast, ToastrService, ToastPackage,  } from 'ngx-toastr'

@Component({
    selector: 'toast-progress-creating-user',
    template: `
   <div toast-component="" class="toast ng-trigger ng-trigger-flyInOut toast-gray toast-padding">
        <div class="toast-title"> 
            <div class="content-middle">
                <i class="fa fa-cog fa-spin fa-2x toast-icon"></i>
                <span class="toast-text">{{title}}</span>
            </div>
        </div>
   </div>
  `,
    styleUrls:["./toasts.css"]
})
export class ProgressToast {
    private title: string;
    constructor(
        private toastPackage: ToastPackage
    ) {
        this.title = toastPackage.title;
    }
}