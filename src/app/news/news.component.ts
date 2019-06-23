import { Component, OnInit, Input, Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckingService } from '../shared/checking.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Directive({
    selector: '[Id]',
    exportAs: 'Id'
})

export class IdDirective {
    @Input() Id: any;
}

@Component({
    selector: 'app-news-component',
    templateUrl: 'news.component.html',
    styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {
    public changeTheme = false;
    public dots = false;
    public spin = true;
    public newsInfo: any;
    public rootUrl = 'https://localhost:44338/api/RSSFeed';
    public newsUrl = 'https://localhost:44338/api/NewsDetails';
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private checkerService: CheckingService,
        private http: HttpClient
    ) {
        const themeType = localStorage.getItem('theme');
        if (themeType === 'eye') {
            debugger;
            this.changeTheme = true;
        }
        this.http.get<any[]>(this.rootUrl).subscribe(result => {
            this.newsInfo = result;
            this.newsInfo.forEach(element => {
                // tslint:disable-next-line:max-line-length
                let index = element['Description'].indexOf('[&#8230;]');
                element['Description'] = element['Description'].substring(0, index);
                element['Date'] = new Date(element['Date']).toLocaleDateString();
            });
        });
    }

    ngOnInit() {
        setTimeout(() => {
            this.spin = false;
        }, 3000);

        if (this.checkerService.checkForAdmin() === true) {
            this.dots = true;
        }

        const sentence = 'fasdfasd.asdfasdfasdf';
        let index = sentence.indexOf('.');
        console.log(sentence.substring(0, index));
    }

    public deleteNews(id) {
        console.log(this.newsInfo);
        this.newsInfo.forEach((element, idx) => {
            if (element['NewsId'] === id) {
                this.newsInfo.splice(idx, 1);
            }
        });
        debugger;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        let options = { headers: headers };
        this.http.delete<void>(this.newsUrl + '/' + id, options).subscribe(res => {
            console.log(res);
        });
    }
}


