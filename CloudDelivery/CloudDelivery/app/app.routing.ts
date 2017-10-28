import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './Shared/Login/login.component';
import { RedirectComponent } from './Shared/Redirect/redirect.component';
import { AuthGuard } from './Services/Guards/AuthGuard'
import { AdminGuard } from './Services/Guards/AdminGuard'
import { CarrierGuard } from './Services/Guards/CarrierGuard'

const appRoutes: Routes = [

    {
        path: '',
        component: RedirectComponent
    },
    {
        path: 'admin',
        loadChildren: "app/modules/admin/admin.module#AdminModule",
    },
    {
        path: 'carrier',
        canLoad: [CarrierGuard],
        loadChildren: "app/modules/carrier/carrier.module#CarrierModule",
    },
    {
        path: 'login',
        component: LoginComponent
    },
    //,{ path: '**', component: PageNotFoundComponent }
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