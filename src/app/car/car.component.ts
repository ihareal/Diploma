import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'car',
    templateUrl: 'car.component.html',
    styleUrls: ['./car.component.css']
})

export class CarComponent implements OnInit {
    public changeTheme = false;
    constructor() { }

    ngOnInit() {
        const themeType = localStorage.getItem('theme');
        if (themeType === 'eye') {
            this.changeTheme = true;
        }
    }
}
