import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RegulatorService {

    public url: string = env.apiUrl;
    public httpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    constructor(private http: HttpClient) { }

    /**
     |-------------------------------------------------------------------
     | Learn Read Delete (RD)
     |-------------------------------------------------------------------
     |
     | develop by: Yim Klok
     |
     */
    // ==================== Read All Products
    read(): any {
        return this.http.get(this.url + '/regulators', this.httpOptions);
    }
    // ==================== Delete One Product
    delete(id: number = 0): any {
        return this.http.delete(this.url + '/regulators/' + id, this.httpOptions);
    }
     // ==================== Create One Survey
     create(data: object = {}): any {
        return this.http.post(this.url + '/regulators', data, this.httpOptions);
    }
    // =================== Update One Survey
     update(id: number = 0, data: object = {}): any {
        return this.http.post(this.url + '/regulators/' + id, data, this.httpOptions);
    }
    // =================== Update password
    changeStatus(id: number = 0): any {
        return this.http.post(this.url + '/regulators/'+id+'/change-status', this.httpOptions);
    }
}
