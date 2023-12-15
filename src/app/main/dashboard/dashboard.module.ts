import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ScrollbarModule } from 'helpers/directives/scrollbar';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { NgApexchartsModule } from 'ng-apexcharts';

const dashboardRoutes: Routes = [
  {
      path: '',
      component: DashboardComponent,
  },
];

@NgModule({
    declarations: [
      DashboardComponent,
    ],
    imports: [
      ScrollbarModule,
      SharedModule,
      RouterModule.forChild(dashboardRoutes),
      TranslocoModule,
      NgApexchartsModule
    ]
})
export class DashboardModule {}
