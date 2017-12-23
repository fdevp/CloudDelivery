import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LayoutComponent } from './layout.component'


import {AdminGuard} from '../Services/Guards/AdminGuard';
import {CarrierGuard} from '../Services/Guards/CarrierGuard';

const layoutRoutes: Routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'admin',
                canActivate: [AdminGuard],
                loadChildren: "app/modules/admin/admin.module#AdminModule",
            },
            {
                path: 'carrier',
                canLoad: [CarrierGuard],
                loadChildren: "app/modules/carrier/carrier.module#CarrierModule",
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(
            layoutRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})
export class LayoutRouting { }