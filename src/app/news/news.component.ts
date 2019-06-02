import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-news-component',
    templateUrl: 'news.component.html',
    styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {}
}
