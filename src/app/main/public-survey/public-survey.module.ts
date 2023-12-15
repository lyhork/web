import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { publicSurveyRoutes } from './public-survey.routing';
import { SurveyComponent } from './survey/survey.component';
import { SharedModule } from 'app/shared/shared.module';
import { ScanQrComponent } from './scan-qr/scan-qr.component';
import { QRCodeModule } from 'angularx-qrcode';
import { CommentComponent } from './comment/comment.component';


@NgModule({
  declarations: [
    HomeComponent,
    SurveyComponent,
    ScanQrComponent,
    CommentComponent
  ],
  imports: [
    SharedModule,
    QRCodeModule,
    RouterModule.forChild(publicSurveyRoutes)
  ]
})
export class PublicSurveyModule { }
