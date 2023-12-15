import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyTypeModule } from 'app/main/survey/survey-type/survey-type.module';
import { SurveysModule } from 'app/main/survey/surveys/surveys.module';

const productRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'all',
                loadChildren: () => import('app/main/survey/surveys/surveys.module').then(m => m.SurveysModule)
            },
            {
                path: 'survey-types',
                loadChildren: () => import('app/main/survey/survey-type/survey-type.module').then(m => m.SurveyTypeModule)
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(productRoutes),
        SurveysModule,
        SurveyTypeModule
    ],
    exports: [
        SurveysModule,
        SurveyTypeModule
    ]
})
export class SurveyModule{}
