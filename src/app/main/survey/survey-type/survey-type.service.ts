import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SurveyTypeService {

    public url: string = env.apiUrl;
    public httpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    constructor(private http: HttpClient) { }

    /**
     |-------------------------------------------------------------------
     | Learn Create Read Update Delete (CRUD)
     |-------------------------------------------------------------------
     |
     | develop by: Yim Klok
     |
     */
    // ==================== Create One Survey
    create(data: object = {}): any {
        return this.http.post(this.url + '/survey/types', data, this.httpOptions);
    }
    // ==================== Read All Surveys
    read(params = {}): any {
        const httpOptions = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
        httpOptions['params'] = params;
        return this.http.get(this.url + '/survey/types', httpOptions);
    }
    // ==================== Update One Survey
    update(id: number = 0, data: object = {}): any {
        return this.http.post(this.url + '/survey/types/' + id, data, this.httpOptions);
    }
    // ==================== Delete One Survey
    delete(id: number = 0): any {
        return this.http.delete(this.url + '/survey/types/' + id, this.httpOptions);
    }
    //==================================================================
}
