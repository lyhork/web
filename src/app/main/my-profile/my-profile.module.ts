import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ScrollbarModule } from 'helpers/directives/scrollbar';
import { TranslocoModule } from '@ngneat/transloco';
import { MyProfileComponent } from './my-profile.component';
import { OverviewComponent } from './overview/overview.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const myProfileRoutes: Routes = [
    {
        path: '',
        component: MyProfileComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        ScrollbarModule,
        TranslocoModule,
        RouterModule.forChild(myProfileRoutes),
    ],
    declarations: [
      MyProfileComponent,
      OverviewComponent,
      ChangePasswordComponent
    ],
})
export class MyProfileModule {}
