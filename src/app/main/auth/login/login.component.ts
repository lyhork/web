import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { GlobalConstants } from 'app/shared/global-constants';
import { Animations } from 'helpers/animations';
import { AlertType } from 'helpers/components/alert';
import { environment as env } from 'environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations   : Animations
})
export class LoginComponent implements OnInit {
    @ViewChild('logInNgForm') logInNgForm: NgForm;

    alert: { type: AlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    logInForm: UntypedFormGroup;
    showAlert: boolean = false;
    saving: boolean = false;
    url = env.fileUrl;
    user: any = {
        id: null,
        name: null,
        email: null,
        avatar: null,
        phone: null,
    };

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.logInForm = this._formBuilder.group({
            username    : ['', [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
            password    : ['', Validators.required],
            rememberMe  : ['']
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Login
     */
    Login(): void
    {
        // Return if the form is invalid
        if ( this.logInForm.invalid)
        {
            return;
        }

        // Disable the form
        this.logInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Saving
        this.saving = true;

        // Login
        this._authService.Login(this.logInForm.value).subscribe(
                (res: any) => {
                    if(res.user){
                        // saved
                        this.saving = false;
                        console.log(res.user);
                        this.user.id = res.user.id;
                        this.user.email = res.user.email;
                        this.user.name = res.user.name;
                        this.user.avatar = res.user.avatar;
                        if (res.user.avatar == '') {
                            this.user.avatar = 'assets/images/avatars/default.jpg';
                        } else {
                            this.user.avatar = this.url + res.user.avatar;
                        }
                        this.user.phone = res.user.phone;
                        localStorage.setItem('user',JSON.stringify(this.user));
                        localStorage.setItem('role',res.role);
                        
                    }

                    // Navigate to the dashboard
                    this._router.navigateByUrl('/dashboard');
                },
                (err: any) => {

                    // Re-enable the form
                    this.logInForm.enable();

                    // saved
                    this.saving = false;

                    // Reset the form
                    this.logInNgForm.resetForm();

                    if(err.error.message == undefined){
                        //for ios device
                        this.alert = {
                            type   : 'error',
                            message: 'ទិន្នន័យដែលបានផ្តល់ឱ្យមិនត្រឹមត្រូវទេ។'
                        };
                    }else{
                        this.alert = {
                            type   : 'error',
                            message: err.error ? err.error.message : 'Something went worng!. Plese try again'
                        };
                    }
                    

                    // Show the alert
                    this.showAlert = true;

                }
            );
    }
}
