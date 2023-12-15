import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MyProfileService {

    public url: string = env.apiUrl;
    public httpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    constructor(private http: HttpClient) {}

    // ==================== Get Profile
    getProfile(): any {
        return this.http.get(this.url + '/my-profiles', this.httpOptions);
    }

    // ==================== Update Profile
    updateProfile(data: any): any {
        return this.http.post(this.url + '/my-profiles',data, this.httpOptions);
    }

    // =================== Update password
    updatePassword(data: any): any {
        return this.http.post(this.url + '/my-profiles/change-password',data, this.httpOptions);
    }
}
