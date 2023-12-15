import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CommentService {
    public url: string = env.apiUrl;
    public httpOptions = {
        headers: new HttpHeaders().set('Accept', 'application/json'),
    };

    constructor(private http: HttpClient) {}

    // ====================  Comment
    commnet(data: any = {}, id: any): any {
        return this.http.post(
            this.url + '/public/survey/' + id,
            data,
            this.httpOptions
        );
    }
}
