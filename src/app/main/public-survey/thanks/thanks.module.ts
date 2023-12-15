import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { routes } from './thanks.routing';
import { ThanksComponent } from './thanks.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ThanksComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ThanksModule { }
