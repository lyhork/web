import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    public url: string = env.apiUrl;
    public httpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    constructor(private http: HttpClient) {}

    // ==================== Get One User
    getUserType(): any {
        return this.http.get(this.url + '/user/get-type', this.httpOptions);
    }

    getRegulator(): any {
        return this.http.get(this.url + '/user/get-regulator', this.httpOptions);
    }

   // ==================== Get All Users
   listing(params = {}): any {
        const httpOptions = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
        httpOptions['params'] = params;
        return this.http.get(this.url + '/users', httpOptions);
    }

    // ==================== Get One User
    view(id: any = ''): any {
        const httpOptions = {};
        return this.http.get(this.url + '/users/'+ id, httpOptions);
    }

    // ==================== Create User
    create(data: any = {}): any {
        return this.http.post(this.url + '/users', data, this.httpOptions);
    }

    // =================== Update User
    update(id: number = 0, data: object = {}): any {
        return this.http.post(this.url + '/users/' + id, data, this.httpOptions);
    }

    // ==================== Update User
    delete(id: number = 0): any {
        return this.http.delete(this.url + '/users/'+id, this.httpOptions);
    }

    // =================== Update password
    changePassword(id: number = 0,data: any): any {
        return this.http.post(this.url + '/users/'+id+'/change-password',data, this.httpOptions);
    }
    // =================== Update password
    changeStatus(id: number = 0): any {
        return this.http.post(this.url + '/users/'+id+'/change-status', this.httpOptions);
    }
}
