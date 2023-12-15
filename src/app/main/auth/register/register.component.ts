import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { GlobalConstants } from 'app/shared/global-constants';
import { Animations } from 'helpers/animations';
import { AlertType } from 'helpers/components/alert';
import { environment as env } from 'environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: Animations
})
export class RegisterComponent implements OnInit {

  @ViewChild('RegisterNgForm') RegisterNgForm: NgForm;

  alert: { type: AlertType; message: string } = {
    type: 'success',
    message: ''
  };

  public RegisterForm: UntypedFormGroup;
  public showAlert: boolean = false;
  public saving: boolean = false;
  public url = env.fileUrl;
  public user: any = {
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
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.RegisterForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(40)]],
      phone: ['', [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      rememberMe: ['']
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Login
   */
  Login(): void {
    // Return if the form is invalid
    if (this.RegisterForm.invalid) {
      return;
    }

    // Disable the form
    this.RegisterForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Saving
    this.saving = true;

    // Login
    this._authService.Login(this.RegisterForm.value).subscribe(
      (res: any) => {
        if (res.user) {
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
          // console.log(this.user);
          localStorage.setItem('user', JSON.stringify(this.user));
        }

        // Navigate to the dashboard
        this._router.navigateByUrl('/dashboard');
      },
      () => {

        // Re-enable the form
        this.RegisterForm.enable();

        // saved
        this.saving = false;

        // Reset the form
        this.RegisterNgForm.resetForm();

        // Set the alert
        this.alert = {
          type: 'error',
          message: 'Wrong email or password'
        };

        // Show the alert
        this.showAlert = true;

      }
    );
  }

}
