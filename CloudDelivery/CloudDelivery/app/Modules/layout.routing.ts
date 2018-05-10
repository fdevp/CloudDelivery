import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LayoutComponent } from './layout.component'


import {AdminGuard} from '../Services/Guards/AdminGuard';
import { CarrierGuard } from '../Services/Guards/CarrierGuard';
import { SalepointGuard } from '../Services/Guards/SalepointGuard';

const layoutRoutes: Routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'admin',
                canLoad: [AdminGuard],
                loadChildren: "app/modules/admin/admin.module#AdminModule",
            },
            {
                path: 'carrier',
                canLoad: [CarrierGuard],
                loadChildren: "app/modules/carrier/carrier.module#CarrierModule",
            },
            {
                path: 'salepoint',
                canLoad: [SalepointGuard],
                loadChildren: "app/modules/salepoint/salepoint.module#SalepointModule",
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