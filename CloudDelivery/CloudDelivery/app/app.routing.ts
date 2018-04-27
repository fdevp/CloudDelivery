import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './Services/Guards/AuthGuard';
import { LoginComponent } from './Modules/Shared/Components/Login/login.component';
import {LayoutComponent} from './Modules/layout.component'

const appRoutes: Routes = [

    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: "app/modules/layout.module#LayoutModule",

    },
    {
        path: 'login',
        component: LoginComponent
    },
    { path: '**', redirectTo: ''  }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouting { }