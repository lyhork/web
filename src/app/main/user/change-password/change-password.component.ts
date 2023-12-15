import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

    @ViewChild('changePasswordNgForm') changePasswordNgForm: NgForm;

    changePasswordForm: UntypedFormGroup;
    saving: boolean = false;

    /**
     * Constructor
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) public id: any,
        private dialogRef: MatDialogRef<ChangePasswordComponent>,
        private _userService: UserService,
        private _formBuilder: UntypedFormBuilder,
        private _snackBar: SnackbarService,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.changePasswordForm = this._formBuilder.group({
            old_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
            confirm_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * change password
     */
    changePassword(): void {
        // Return if the form is invalid
        if (this.changePasswordForm.invalid) {
            return;
        }

        // Disable the form
        this.changePasswordForm.disable();


        // Send the request to the server
        this.saving = true;
        this._userService.changePassword(this.id, this.changePasswordForm.value).subscribe(
            (res: any) => {
                this.saving = false;
                this.changePasswordForm.enable();
                this._snackBar.openSnackBar(res.message, '');
                // Reset the form
                this.changePasswordNgForm.resetForm();
            },
            (err: any) => {
                this.saving = false;
                // Re-enable the form
                this.changePasswordForm.enable();
                this._snackBar.openSnackBar(err.error.message, 'error');
                this._router.navigate['-1'];
            }
        );
    }
}
