import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ScrollbarModule } from 'helpers/directives/scrollbar';
import { TranslocoModule } from '@ngneat/transloco';
import { ListingComponent } from './listing/listing.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { UiSwitchModule } from 'ngx-ui-switch';
const productTypeRoutes: Routes = [
    {
        path: '',
        component: ListingComponent
    }
];

@NgModule({
    imports: [
        ScrollbarModule,
        UiSwitchModule,
        TranslocoModule,
        RouterModule.forChild(productTypeRoutes),
        SharedModule
    ],
    declarations: [
        ListingComponent,
        CreateComponent,
        UpdateComponent
    ],
})
export class SurveyTypeModule {}
