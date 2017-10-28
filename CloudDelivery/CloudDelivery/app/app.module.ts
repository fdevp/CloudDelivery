import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

import { AuthGuard } from './Services/Guards/AuthGuard'
import { AdminGuard } from './Services/Guards/AdminGuard'
import { CarrierGuard } from './Services/Guards/CarrierGuard'
import { SessionService } from './Services/SessionService';

import { AdminModule } from './Modules/Admin/admin.module'
import { CarrierModule } from './Modules/Carrier/carrier.module'
import { SharedModule } from './Shared/shared.module'

const pages = [
    AppComponent,
];

const modules = [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting
]

const myModules = [
    AdminModule,
    CarrierModule,
    SharedModule
]

const providers = [
    { provide: APP_BASE_HREF, useValue: '/' },
    SessionService,
    AuthGuard,
    AdminGuard,
    CarrierGuard
]

@NgModule({
    imports: [...modules, ...myModules],
    providers: [...providers],
    declarations: [...pages],
    bootstrap: [AppComponent],
})
export class AppModule { }
