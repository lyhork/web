import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';
import { ScanQrComponent } from './scan-qr/scan-qr.component';
import { CommentComponent } from './comment/comment.component';

export const publicSurveyRoutes: Route[] = [
    {
        path     : '',
        component: HomeComponent
    },
    {
        path     : 'reg',
        children : [
            {
                path: ':id',
                component: SurveyComponent
            },
            {
                path     : ':id/type_id/:type_id',
                component: ScanQrComponent
            }
        ]
        
    },
    {
        path: 'survey/:id',
        component: CommentComponent
    }
];
