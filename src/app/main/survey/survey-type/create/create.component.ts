import { Component, EventEmitter, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { SurveyTypeService } from '../survey-type.service'


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @ViewChild('createNgForm') createNgForm: NgForm;
  CreateProject = new EventEmitter();
  public saving: boolean = false;
  public create: UntypedFormGroup;
  public isLoading: boolean = false;
  public data: any;
  public mode: any;
  public src: string = 'assets/icons/icon-img.png';
  public products_type: any[][];
  public regulator_type: any[][];
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private dialogRef: MatDialogRef<CreateComponent>,
    private _formBuilder: UntypedFormBuilder,
    private _surveyTypeService: SurveyTypeService,
    private snackBar: SnackbarService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.formBuilder();
  }

  srcChange($event: any) {

    this.create.get('image').setValue($event);
  }

  formBuilder(): void {
    this.create = this._formBuilder.group({
      name: ['', Validators.required],
      image: [],
    });
  }

  submit(): void {
    // Return if the form is invalid
    if (this.create.invalid) {
      return;
    }

    // Disable the form
    this.create.disable();

    // Saving
    this.saving = true;

    // call to api
    this._surveyTypeService.create(this.create.value).subscribe(
      (res: any) => {
        this.dialogRef.close();
        this.CreateProject.emit(res.product_type);
        //use snack bar to opron message
        this.snackBar.openSnackBar(res.message, '');
      },
      (err: any) => {

        // Re-enable the form
        this.create.enable();

        // saved
        this.saving = false;

        let errors: any[] = [];
        errors = err.error.errors;
        let messages: any[] = [];
        let text: string = '';
        if (errors.length > 0) {
          errors.forEach((v: any) => {
            messages.push(v.message)
          });
          if (messages.length > 1) {
            text = messages.join('-');
          } else {
            text = messages[0];
          }
        } else {
          text = err.error.message;
        }
        this.snackBar.openSnackBar(text, 'error');
      }
    );
  }

}
