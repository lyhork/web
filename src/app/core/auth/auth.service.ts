import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { environment as env } from 'environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthService
{
    private url = env.apiUrl;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    private setToken(token: string): any
    {
        localStorage.setItem('accessToken', token);
    }

    public getToken(): string
    {
        return localStorage.getItem('accessToken');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post(this.url+'/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post(this.url+'/auth/reset-password', password);
    }

    /**
     * Login
     *
     * @param credentials
     */
    Login(credentials: { username: string; password: string }): Observable<any>
    {
        return this._httpClient.post(this.url+'/auth/login', credentials).pipe(
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.setToken(response.access_token);

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Logout
    */
    Logout(): void
    {
        // Remove the access token from the local storage
        localStorage.clear();
        // Return to login page
        this._router.navigateByUrl('/auth/login');
        this._httpClient.post(this.url+'/auth/logout',{
            headers:new HttpHeaders().set('Content-Type', 'application/json')
        });
    }

    /**
     * Register
     *
     * @param user
     */
    Register(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post(this.url+'/auth/register', user);
    }
}
