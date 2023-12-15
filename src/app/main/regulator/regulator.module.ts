import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ScrollbarModule } from 'helpers/directives/scrollbar';
import { TranslocoModule } from '@ngneat/transloco';
import { ListingComponent } from './listing/listing.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component'
import { UiSwitchModule } from 'ngx-ui-switch';

const regulatorRoutes: Routes = [
    {
        path: '',
        component: ListingComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        UiSwitchModule,
        TranslocoModule,
        RouterModule.forChild(regulatorRoutes),
        ScrollbarModule
    ],
    declarations: [
        ListingComponent,
        CreateComponent,
        UpdateComponent
    ],
})
export class RegulatorModule { }
