import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../header-side-nav/header-side-nav.component';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    public changeTheme = false;
    public dwellingType = 'flat';
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog

    ) { }

    ngOnInit() {
        const themeType = localStorage.getItem('theme');
        if (themeType === 'eye') {
            this.changeTheme = true;
        }

        if (localStorage.getItem('houseType') === 'house') {
            this.dwellingType = 'house';
        } else { this.dwellingType = 'flat'; }
    }

    openSignIn($event) {
        const dialogRef = this.dialog.open(SignInComponent, {
            width: '550px',
            height: '600px',
        });
    }
}
