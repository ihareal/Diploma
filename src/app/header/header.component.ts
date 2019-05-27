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
        this.activatedRoute.queryParams.subscribe(query => {
            if (query['theme'] === 'eye') {
                this.changeTheme = true;
            }
        });
    }
}
