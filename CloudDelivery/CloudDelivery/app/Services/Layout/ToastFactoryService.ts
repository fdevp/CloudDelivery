import { Injectable, } from '@angular/core';
import { ToastrService, ActiveToast, IndividualConfig } from 'ngx-toastr';
import { ProgressToast } from '../../Modules/Shared/Toasts/ProgressToast'

@Injectable()
export class ToastFactoryService {
    constructor(public toastr: ToastrService) {  }

    progress(title: string): ActiveToast{

        return this.toastr.show(null, title, {
            timeOut:0,
            extendedTimeOut: 0,
            closeButton: false,
            tapToDismiss: false,
            toastComponent: ProgressToast
        });
    }

    successCreatingUser(username: string, id: string): void {
        var title = "Dodano użytkownika " + username;
        var message = "Kliknij żeby przejść...";
        var toast = this.toastr.success(message, title, {
            "timeOut": 5000,
            enableHtml: true,
            progressBar: true,
            progressAnimation: "increasing"
        });

        
        //toast.onTap = Observable<any>(() => {

        //});
    }

    errorCreatingUser(): void {
        this.toastr.error("Nie udało się utworzyć użytkownika", "Błąd");
    }




    
}