import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ScrollbarModule } from 'helpers/directives/scrollbar';
import { TranslocoModule } from '@ngneat/transloco';
import { ListingComponent } from './listing/listing.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const userRoutes: Routes = [
    {
        path: '',
        component: ListingComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        ScrollbarModule,
        UiSwitchModule,
        TranslocoModule,
        RouterModule.forChild(userRoutes),
    ],
    declarations: [
        ListingComponent,
        CreateComponent,
        UpdateComponent,
        ChangePasswordComponent
    ],
})
export class UserModule { }
