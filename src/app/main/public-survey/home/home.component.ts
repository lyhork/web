import { Component, OnInit } from '@angular/core';
import { PublicSurveyService } from '../public-survey.service';
import { environment as env } from 'environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public isLoading: boolean = false;
    public fileUrl: string = env.fileUrl;
    public data: any[] = [];
    constructor(
        private publicService: PublicSurveyService
    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.publicService.getRegulator().subscribe((res: any)=> {
            this.isLoading = false;
            this.data = res;
        },(err: any)=>{
            this.isLoading = false;
            console.log(err);
        });
    }
}
