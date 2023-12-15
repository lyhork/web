import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class SurveysService {

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
        return this.http.post(this.url + '/surveys', data, this.httpOptions);
    }
    // ==================== Read All Surveys
    read(params = {}): any {
        const httpOptions = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
        httpOptions['params'] = params;
        return this.http.get(this.url + '/surveys', httpOptions);
    }

    //==================================================================================>> Printing
    printingSale(params): Observable<any> {

        const httpOptions = {};
        httpOptions['params'] = params;

        return this.http.get<any>(this.url + '/surveys/printing', httpOptions);
    }

    // =================== Update One Survey
    update(id: number = 0, data: object = {}): any {
        return this.http.post(this.url + '/surveys/' + id, data, this.httpOptions);
    }
    // ==================== Delete One Survey
    delete(id: number = 0): any {
        return this.http.delete(this.url + '/surveys/' + id, this.httpOptions);
    }
    //==================================================================
}
