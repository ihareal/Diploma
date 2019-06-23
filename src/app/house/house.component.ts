import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'house',
    templateUrl: 'house.component.html',
    styleUrls: ['./house.component.css']
})

export class HouseComponent implements OnInit {
    public changeTheme = false;
    constructor() { }

    ngOnInit() {
        const themeType = localStorage.getItem('theme');
        if (themeType === 'eye') {
            this.changeTheme = true;
        }
    }
}