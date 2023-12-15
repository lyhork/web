import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { routes } from './thank.routing';
import { ThankComponent } from './thank.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ThankComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ThankModule { }
