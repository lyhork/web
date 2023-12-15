import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-thank',
    templateUrl: './thanks.component.html',
    styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent implements OnInit {

    countdown: number = 6;
    interval: any; // Declare interval variable
    constructor(
    ) { }

    ngOnInit(): void {
        this.interval = setInterval(() => {
            this.countdown--;
            if (this.countdown === -1) {
                clearInterval(this.interval); // Use clearInterval with interval variable
            }
        }, 1000);
    }
}
