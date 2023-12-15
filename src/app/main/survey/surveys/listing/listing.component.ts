import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { LoadingService } from 'helpers/services/loading';
import { CreateComponent } from '../create/create.component';
import { SurveysService } from '../surveys.service';
import { UpdateComponent } from '../update/update.component';
import { SurveyTypeService } from '../../survey-type/survey-type.service';
import { RegulatorService } from '../../../regulator/regulator.service';
import jsreport from '@jsreport/browser-client';



@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  providers: [DatePipe]

})
export class ListingComponent implements OnInit {

  public displayedColumns: string[] = ['no','regulator', 'survey', 'comment', 'date'];
  public dataSource: any;
  public isLoading: boolean = true;
  public data: any[] = [];
  public total: number = 10;
  public limit: number = 10;
  public page: number = 1;
  public key: string = '';
  public products_type: any[][];
  public regulator_type: any[][];

  public regulator_id: number = 0;
  public type_id: number = 0;
  public regulator: number = 0;
  public dataPrint: any;
  public from:any;
  public to:any;


  constructor(
    private _surveyTypeService: SurveyTypeService,
    private _surveysService: SurveysService,
    private _regulatorService: RegulatorService,
    private _snackBarService: SnackbarService,
    private _loadingService: LoadingService,
    private _dialog: MatDialog,
    private datePipe: DatePipe,
  ) {
    this.from = this.datePipe.transform(this.from, 'yyyy-MM-dd');
    this.to = this.datePipe.transform(this.to, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this._surveyTypeService.read().subscribe((res: any) => {
      this.products_type = res;
    }, (err: any) => {
      //console.log(err);
    });
    this._regulatorService.read().subscribe((res: any) => {
      this.regulator_type = res;
    }, (err: any) => {
      //console.log(err);
    });
    this.listing(this.limit, this.page);
  }

  //=======================================>> Listing Survey
  listing(_limit: number = 10, _page: number = 1): any {

    const param: any = {
      limit: _limit,
      page: _page,
    };

    if (this.key != '') {
      param.key = this.key;
    }
    if (this.regulator_id != 0) {
      param.regulator = this.regulator_id;
    }
    if (this.type_id != 0) {
      param.type = this.type_id;
    }
    if (this.page != 0) {
      param.page = this.page;
    }
    if(this.from && this.to){
      param.from =  this.datePipe.transform(this.from, 'yyyy-MM-dd'),
      param.to =  this.datePipe.transform(this.to, 'yyyy-MM-dd')
  }
  console.log(param); 
    this.isLoading = true;
    this._loadingService.show();
    this._surveysService.read(param).subscribe((res: any) => {
      this.isLoading = false;
      this._loadingService.hide();
      this.data = res.data;
      console.log(this.data);
      this.dataSource = new MatTableDataSource(this.data);
      this.total = res.total;
      this.page = res.current_page;
      this.limit = res.per_page;
    }, (err: any) => {
      this.isLoading = false;
      this._loadingService.hide();
      this._snackBarService.openSnackBar('Something went wrong.', 'error');
      console.log(err);
    }
    );
  }
  //=======================================>> On Page Changed
  onPageChanged(event: any): any {
    if (event && event.pageSize) {
      this.limit = event.pageSize;
      this.page = event.pageIndex + 1;
      this.listing(this.limit, this.page);
    }
  }

  //=======================================>> Create Survey
  create(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    const dialogRef = this._dialog.open(CreateComponent, dialogConfig);
    dialogRef.componentInstance.CreateProject.subscribe((response: any) => {
      let copy: any[] = [];
      copy.push(response);
      this.data.forEach((row: any)=>{
        copy.push(row);
      })
      this.data = copy;
      this.total += 1;
      this.limit += 1;
      this.dataSource = new MatTableDataSource(this.data);
    });
  }
  //=======================================>> Update Survey
  update(row: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = row;
    dialogConfig.width = "700px";
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
  //=======================================>> Delete Survey
  delete(id: number = 0): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "320px";
    const dialogRef = this._dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._surveysService.delete(id).subscribe((res: any) => {
          this._snackBarService.openSnackBar(res.message, '');
          let copy: any[] = [];
          this.data.forEach((obj: any) => {
            if (obj.id !== id) {
              copy.push(obj);
            }
          });
          this.total -= 1;
          this.limit -= 1;
          this.data = copy;
          this.dataSource = new MatTableDataSource(this.data);
        }, (err: any) => {
         // console.log(err);
          this._snackBarService.openSnackBar('Something went wrong.', 'error');
        });
      }
    });
  }
  //=======================================>> Printing Report
  print(){
  
      let param:any={}      
      
      if (this.regulator_id != 0) {
        param.regulator = this.regulator_id;
      }
      if (this.type_id != 0) {
        param.type = this.type_id;
      }
      this.isLoading = true;
      this._surveysService.printingSale(param).subscribe(res => {
        this.isLoading = false;
        this.dataPrint = res;   
        jsreport["serverUrl"] = 'http://127.0.0.1:5488';
        jsreport.headers['Authorization'] = "Basic " + "YWRtaW46MTIzNDU2";
        let request:any = {
  
          "data":JSON.stringify(this.dataPrint),
          "template": { "name":"invoice-main" },
        }
        
        jsreport.render(request).then(function(res) {
  
        // open output in the new window
          // res.openInWindow();
          res.download('Report.xlsx');
        }) 
      
      })
    }
}
