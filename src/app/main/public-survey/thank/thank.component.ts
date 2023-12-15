import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-thank',
    templateUrl: './thank.component.html',
    styleUrls: ['./thank.component.scss']
})
export class ThankComponent implements OnInit {

    countdown: number = 6;
    interval: any; // Declare interval variable
    constructor(
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.interval = setInterval(() => {
            this.countdown--;
            if (this.countdown === -1) {
                clearInterval(this.interval); // Use clearInterval with interval variable
                this._router.navigate(['/']);
            }
        }, 1000);
    }
}
