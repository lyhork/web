import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { DashboardService } from './dashboard.service';
import { ApexOptions } from 'ng-apexcharts';
import { DateTime } from 'luxon';
const now = DateTime.now();

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    
    public loading: boolean = true;
    public isloading: boolean =true;
    public chartOptions:ApexOptions;
    public data: any = {
        
    }
    public dataChart: any = {
        
    }
    constructor(
        private dashboardService: DashboardService,
        private snackBar: SnackbarService,
        private route: Router,
    ) { }


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {
        console.log(now);
        
        this.listing();
        this.dashboardService.getDashboardInfo().subscribe(res => {
            this.isloading = false;
            this.data = res;

        });
        console.log(this.data);
        
        // Prepare the chart data
        this.setSubjectChart();
    }

    //=======================================================>> Function List
    listing(): any {
        this.loading = false;
    }

    setSubjectChart(){
        this.dashboardService.getDataChart().subscribe(res => {
            this.isloading = false;
            this.dataChart = res;
            this.chartOptions = {
                series: [
                    {
                        name: this.dataChart.series.name,
                        data: this.dataChart.series.data
                    }
                ],
                plotOptions: {
                    bar: {
                      distributed: true,
                    }
                },
                legend: {
                    show: false
                },
                states: {
                    hover: {
                        filter: {
                            type: 'none'
                        }
                    },
                    active: {
                        filter: {
                            type: 'none'
                        }
                    }
                },
                chart: {
                  height: 280,
                  type: "bar"
                },
                tooltip: {
                    enabled: true,
                    fillSeriesColor: false,
                    theme: 'dark',
                },
                xaxis: {
                  categories: this.dataChart.xaxis.categories,
                  
                },
                colors:['#5AD829', '#D3E736', '#FCDD3D', '#FE7C34', '#FC252E']
            };
        });
        
    }
    
}
