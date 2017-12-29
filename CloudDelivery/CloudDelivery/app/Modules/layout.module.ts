import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout.component';
import { SessionService } from '../Services/SessionService';
import { LayoutRouting } from './layout.routing'
import {SharedModule} from './Shared/shared.module';
import { MenuFactoryService } from '../Services/Layout/MenuFactoryService';
import { ToastFactoryService } from '../Services/Layout/ToastFactoryService';
import {NgxDatatableModule} from '@swimlane/ngx-datatable'
import { AdminGuard } from '../Services/Guards/AdminGuard';
import { CarrierGuard } from '../Services/Guards/CarrierGuard';

const pages = [
    LayoutComponent,
];

const modules = [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
]

const providers = [
    MenuFactoryService,
    AdminGuard,
    CarrierGuard
]

@NgModule({
    providers: [...providers],
    declarations: [...pages],
    bootstrap: [LayoutComponent],
    imports: [...modules, LayoutRouting],
})
export class LayoutModule { }

