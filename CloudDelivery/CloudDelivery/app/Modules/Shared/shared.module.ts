import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LayoutNavigationComponent } from './Components/Navigation/layout.navigation.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NullStringPipe } from './Pipes/NullStringPipe';
import { RoleNamePipe } from './Pipes/RoleNamePipe';
import { ShortDateTimePipe } from './Pipes/ShortDateTimePipe';
import { DestinationAddressPipe } from './Pipes/DestinationAddressPipe';
import { OrderStatusPipe } from './Pipes/OrderStatusPipe';

import { ShowPasswordDirective } from './Directives/ShowPasswordDirective'
import { CurrencyTextPipe } from './Pipes/CurrencyTextPipe';
import { OrderDetailsModal } from './Modals/OrderDetailsModal/order.details.modal';
import { ConfirmModal } from './Modals/ConfirmModal';
import { DurationTextPipe } from './Pipes/DurationTextPipe';
import { SalepointAddressPipe } from './Pipes/SalepointAddressPipe';
import { AgmCoreModule } from '@agm/core';
import { RouteStatusPipe } from './Pipes/RouteStatusPipe';
import { RouteDetailsComponent } from './Components/RouteDetails/route.details.component';
import { LoadingComponent } from './Components/Loading/loading.component';



const modules = [
    CommonModule,
    RouterModule,
    FormsModule,
    AgmCoreModule
];

const pages = [
    LayoutNavigationComponent,
    RouteDetailsComponent,
];


const directives = [
    ShowPasswordDirective
]

const modals = [
    ConfirmModal,
    OrderDetailsModal
]


const pipes = [
    NullStringPipe,
    RoleNamePipe,
    ShortDateTimePipe,
    DestinationAddressPipe,
    OrderStatusPipe,
    CurrencyTextPipe,
    DurationTextPipe,
    SalepointAddressPipe,
    RouteStatusPipe
]


@NgModule({
    imports: [...modules],
    declarations: [...pages, ...pipes, ...directives, ...modals],
    exports: [...pages, ...pipes, ...directives],
    entryComponents: [...modals]
})
export class SharedModule { }

