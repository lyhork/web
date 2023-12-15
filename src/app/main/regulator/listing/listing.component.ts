import { Component, OnInit } from '@angular/core';
import { RegulatorService } from '../regulator.service';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component';
import { environment as env } from 'environments/environment';
import { CreateComponent } from '../create/create.component';
import { UpdateComponent } from '../update/update.component'
@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

    public fileUrl: string = env.fileUrl;
    public displayedColumns: string[] = ['no', 'image', 'regulator', 'status', 'action'];
    public dataSource: any;
    public isLoading: boolean = true;
    public data: any = [];
    constructor(
        private _regulatorService: RegulatorService,
        private _snackBarService: SnackbarService,
        private _dialog: MatDialog,
        private _snackBar: SnackbarService,
    ) { }

    ngOnInit(): void {
        this.listing();
    }

    //===================================>> Read Regulator
    listing(): void {
        this.isLoading = true;
        this._regulatorService.read().subscribe((res: any) => {
            this.isLoading = false;
            this.data = res;
            this.dataSource = new MatTableDataSource(this.data);
        }, (err: any) => {
            this.isLoading = false;
            this._snackBarService.openSnackBar(err?.error ? err?.error?.message : 'Something went wrong!.', 'error');
        }
        );
    }

    //=======================================>> Create Regulator
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

    //=======================================>> Update Regulator
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
          this.data = copy;
          this.dataSource = new MatTableDataSource(this.data);
        });
      }

    //=======================================>> Delete Regulator
    delete(id: number = 0): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = "320px";
        const dialogRef = this._dialog.open(ConfirmDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._regulatorService.delete(id).subscribe((res: any) => {
                    this._snackBarService.openSnackBar(res.message, '');
                    let copy: any[] = [];
                    this.data.forEach((obj: any) => {
                        if (obj.id !== id) {
                            copy.push(obj);
                        }
                    });
                    this.data = copy;
                    this.dataSource = new MatTableDataSource(this.data);
                }, (err: any) => {
                    console.log(err);
                    this._snackBarService.openSnackBar('Something went wrong.', 'error');
                });
            }
        });
    }

     //=============================================>> Status
  onChange(status: any, id: any): any {
    const data = {
      status: status == true ? 1 : 0,
      id: id,
    };
    //console.log(data);
    this._regulatorService.changeStatus(id).subscribe((res: any) => {
      this._snackBar.openSnackBar(res.message, '');
    }, (err: any) => {
      this._snackBar.openSnackBar('Something went wrong.', 'error');
    })
  }

    
}
