import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { ScrollbarModule } from 'helpers/directives/scrollbar';
import { ListingComponent } from './listing/listing.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

const productsRoutes: Routes = [
    {
        path: '',
        component: ListingComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        ScrollbarModule,
        TranslocoModule,
        RouterModule.forChild(productsRoutes),
    ],
    declarations: [
        ListingComponent,
        CreateComponent,
        UpdateComponent,
    ]
})
export class SurveysModule {}
