import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    public changeTheme = false;
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router

    ) { }

    ngOnInit() {
        const themeType = localStorage.getItem('theme');
        if (themeType === 'eye') {
            this.changeTheme = true;
        }
    }
}
