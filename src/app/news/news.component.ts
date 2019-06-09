import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckingService } from '../shared/checking.service';

@Component({
    selector: 'app-news-component',
    templateUrl: 'news.component.html',
    styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {
    public dots = false;
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private checkerService: CheckingService
    ) { }

    ngOnInit() {
        if (this.checkerService.checkForAdmin() === true) {
            this.dots = true;
        }
    }

    public deleteNews() {

    }
}
