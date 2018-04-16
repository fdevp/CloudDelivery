import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

import { AuthGuard } from './Services/Guards/AuthGuard'
import { SessionService } from './Services/SessionService';
import { UsersService } from './Services/UsersService';
import { OrganisationsService } from './Services/OrganisationsService';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr'
import { ModalModule } from 'ngx-bootstrap'
import { TabsModule } from 'ngx-bootstrap';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { LottieAnimationViewModule } from 'ng-lottie';

import { LoginComponent } from './Modules/Shared/Login/login.component';

import { ProgressToast } from './Modules/Shared/Toasts/ProgressToast';

//import { AddUserModal } from './Entries/Modals/AddUserModal/add.user.modal';
import { ModalFactoryService } from './Services/UI/ModalFactoryService';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { AdminModalsModule } from './Modules/Admin/Modals/admin.modals.module'

import { ConfirmModal } from './Modules/Shared/Modals/ConfirmModal'
import { AddUserModal } from './Modules/Admin/Modals/AddUserModal/add.user.modal';
import { EditUserModal } from './Modules/Admin/Modals/EditUserModal/edit.user.modal';
import { SharedModule } from './Modules/Shared/shared.module';
import { ToastFactoryService } from './Services/UI/ToastFactoryService';
import { CarriersService } from './Services/CarriersService';
import { SalePointsService } from './Services/SalePointsService';
import { OrdersService } from './Services/OrdersService';
import { GMapsService } from './Services/GMapsService';
import { OrderDetailsModal } from './Modules/Shared/Modals/OrderDetailsModal/order.details.modal';
import { SignalrService } from './Services/SignalrService';
import { SalepointOrdersService } from './Services/Orders/SalepointOrdersService';
import { CarrierOrdersService } from './Services/Orders/CarrierOrdersService';

const pages = [
    AppComponent,
    LoginComponent
];


const modals = [
    //ConfirmModal,
    //OrderDetailsModal
]

const toasts = [
    ProgressToast
]

const modules = [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    //LottieAnimationViewModule.forRoot(),
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCHX0R_iy25XKld2oyehvuVi26teOlXYWE'
    }),
    AdminModalsModule
]


const providers = [
    { provide: APP_BASE_HREF, useValue: '/' },
    SignalrService,
    SessionService,

    GMapsService,
    GoogleMapsAPIWrapper,
    AuthGuard,
    ModalFactoryService,
    ToastFactoryService,

    SalepointOrdersService,
    CarrierOrdersService,

    //admin
    UsersService,
    OrganisationsService,
    SalePointsService,
    CarriersService
]

@NgModule({
    providers: [...providers],
    declarations: [...pages, ...modals, ...toasts],
    bootstrap: [AppComponent],
    imports: [...modules],
    entryComponents: [...modals, ...toasts]
})
export class AppModule { }
