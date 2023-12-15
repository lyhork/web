import { Component, OnInit } from '@angular/core';
import { PublicSurveyService } from '../public-survey.service';
import { environment as env } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'app/shared/services/snackbar.service';

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
    public isLoading: boolean = false;
    public fileUrl: string = env.fileUrl;
    public regulator: any = undefined;
    public regulator_id: number;
    public survey_id: number;
    public data: any[] = [];
    public req_id: number = 0;
    constructor(
        private _route: ActivatedRoute,
        private publicService: PublicSurveyService,
        private route: ActivatedRoute,
        private router: Router,
        private _snackBar: SnackbarService
    ) { 
        this._route.paramMap.subscribe((params: any) => {
            this.req_id = params.get('id');
        });
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.publicService.viewRegulator(this.req_id).subscribe((res: any) => {
            this.isLoading = false;
            this.regulator = res;
            console.log(this.regulator);
        }, (err: any) => {
            this.isLoading = false;
            console.log(err);
        });
        this.isLoading = true;
        this.publicService.getSurveyType().subscribe((res: any) => {
            this.isLoading = false;
            this.data = res;
            console.log(this.data);
        }, (err: any) => {
            this.isLoading = false;
            console.log(err);
        });
    }

    submit(regulator_id,survey_id): void {
        let data: object = {
            regulator_id: this.regulator_id,
            type_id: this.survey_id
        }
        // console.log(regulator_id,survey_id)
        this.publicService.saveSurvey(data,regulator_id,survey_id).subscribe((res: any) => {
            this.data = res;
            console.log(this.data)
        }, (err: any) => {
            console.log(err);
            this._snackBar.openSnackBar('Something went wrong!.', 'error');
        });
    }
}
