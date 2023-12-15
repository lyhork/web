import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { LoadingService } from 'helpers/services/loading';
import { CreateComponent } from '../create/create.component';
import { SurveyTypeService } from '../survey-type.service';
import { UpdateComponent } from '../update/update.component';
import { environment as env } from 'environments/environment';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  public fileUrl: string = env.fileUrl;
  public displayedColumns: string[] = ['no', 'name', 'image', 'action'];
  public dataSource: any;
  public isLoading: boolean = true;
  public data: any = [];

  constructor(
    private _surveyTypeService: SurveyTypeService,
    private _snackBarService: SnackbarService,
    private _loadingService: LoadingService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this._loadingService.show();
    this._surveyTypeService.read().subscribe((res: any) => {
      this._loadingService.hide();
      this.isLoading = false;
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
    }, (err: any) => {
      this._loadingService.hide();
      this.isLoading = false;
      console.log(err);
      this._snackBarService.openSnackBar(err.error.message, 'error');
    })
  }

  //==================>> Create
  create(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "600px";
    const dialogRef = this._dialog.open(CreateComponent, dialogConfig);
    dialogRef.componentInstance.CreateProject.subscribe((response: any) => {
    let copy: any[] = [];
    copy.push(response);
    this.data.forEach((row: any)=>{
        copy.push(row);
    })
    this.data = copy;
    this.dataSource = new MatTableDataSource(this.data);
    });
}
 
//==============================>> Update
update(row: any): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.data = row;
  dialogConfig.width = "600px";
  const dialogRef = this._dialog.open(UpdateComponent, dialogConfig);
  dialogRef.componentInstance.UpdateProject.subscribe((response: any) => {
    let copy: any[] = [];
    this.data.forEach((v: any) => {
      if (v.id == response.id) {
        copy.push(response);
      } else {
        copy.push(v);
      }
    });
    this.isLoading = false;
    this.data = copy;
    this.dataSource = new MatTableDataSource(this.data);
  });
}

  delete(id: number = 0): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "320px";
    const dialogRef = this._dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._surveyTypeService.delete(id).subscribe((res: any) => {
          this._snackBarService.openSnackBar(res.message, '');
          let copy: any[] = [];
          this.data.forEach((obj: any) => {
            if (obj.id !== id) {
              copy.push(obj);
            }
          });
          this.data = copy;
          this.data.sort((a: any, b: any) => a.name.localeCompare(b.name));
          this.dataSource = new MatTableDataSource(this.data);
        }, (err: any) => {
          console.log(err);
          this._snackBarService.openSnackBar('Something went wrong.', 'error');
        });
      }
    });
  }

  
}
