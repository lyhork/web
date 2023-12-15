import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicSurveyService } from '../public-survey.service';
import { environment as env } from 'environments/environment';
@Component({
    selector: 'app-scan-qr',
    templateUrl: './scan-qr.component.html',
    styleUrls: ['./scan-qr.component.scss'],
})
export class ScanQrComponent implements OnInit {
    public myAngularxQrCode: string;
    countdown: number = 30;
    interval: any; // Declare interval variable
    public req_id: number = 0;
    public type_id: number = 0;
    public id: number = 0;
    public data: any[] = [];
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private publicService: PublicSurveyService
    ) {
        this.publicService.getSurvey().subscribe((res: any) => {
            this.data = res;
            this.id = this.data['id'];
            this.myAngularxQrCode = env.webUrl + 'public/survey/' + this.id;
        });
        this._route.paramMap.subscribe((params: any) => {
            this.req_id = params.get('id');
        });
    }

    ngOnInit(): void {
        this.interval = setInterval(() => {
            this.countdown--;
            if (this.countdown === -1) {
                clearInterval(this.interval); // Use clearInterval with interval variable
                this._router.navigate(['/thank']);
            }
        }, 1000);
    }
    back(): void {
        clearInterval(this.interval); // Use clearInterval with interval variable
        this._router.navigateByUrl('/public/reg/' + this.req_id);
    }
}
