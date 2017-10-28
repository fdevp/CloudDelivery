import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LayoutHeaderComponent } from './Header/layout.header.component';
import { RedirectComponent } from './Redirect/redirect.component';
import { LoginComponent } from './Login/login.component';


const pages = [
    RedirectComponent,
    LayoutHeaderComponent,
    LoginComponent
];

const modules = [
    CommonModule,
    RouterModule,
    FormsModule
];

@NgModule({
    imports: [...modules],
    declarations: [...pages],
    exports: [...pages]
})
export class SharedModule { }

