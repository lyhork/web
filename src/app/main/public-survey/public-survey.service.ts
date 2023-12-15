import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PublicSurveyService {

    public url: string = env.apiUrl;
    public httpOptions = {
        headers: new HttpHeaders().set('Accept', 'application/json'),
    };

    constructor(private http: HttpClient) {}

    // ==================== Get Regulator
    getRegulator(): any {
        return this.http.get(this.url + '/public/regulator', this.httpOptions);
    }
    // ==================== View Regulator
    viewRegulator(id: number = 0): any {
        return this.http.get(this.url + '/public/regulator/'+id, this.httpOptions);
    }

    // ==================== Get Survey
    getSurveyType(): any {
        return this.http.get(this.url + '/public/survey-type', this.httpOptions);
    }

    // ==================== Get Survey
    getSurvey(): any {
        return this.http.get(this.url + '/public/survey', this.httpOptions);
    }

    // ====================  Comment
    saveSurvey(data: any = {},regulator_id, type_id): any {
        console.log()
        return this.http.post(this.url + '/public/regulator/'+regulator_id + '/type/' + type_id, data, this.httpOptions);
    }
}
