﻿import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LayoutHeaderComponent } from './Header/layout.header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NullStringPipe } from './Pipes/NullStringPipe';
import { RoleNamePipe } from './Pipes/RoleNamePipe';

import { ShowPasswordDirective } from './Directives/ShowPasswordDirective'

const pages = [
    LayoutHeaderComponent,
];


const directives = [
    ShowPasswordDirective
]

const pipes = [
    NullStringPipe,
    RoleNamePipe
]

const modules = [
    CommonModule,
    RouterModule,
    FormsModule
];


@NgModule({
    imports: [...modules],
    declarations: [...pages, ...pipes, ...directives],
    exports: [...pages, ...pipes, ...directives],
})
export class SharedModule { }
