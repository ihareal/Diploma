import { Component, OnInit, OnChanges } from '@angular/core';
import { CheckingService } from '../shared/checking.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-personal-area-component',
    templateUrl: './personal.area.component.html',
    styleUrls: ['./personal.area.component.css']
})

export class PersonalAreaComponent implements OnInit {
    public adminView = false;
    constructor(
        private checkingService: CheckingService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        if (this.checkingService.checkForAdmin() === true) {
            this.adminView = true;
        } else { this.adminView = false; }
    }

    public controlPanel() {
        this.router.navigate(['/control-panel']);
    }

    public profile() {
        this.router.navigate(['/profile']);
    }

    public statsZone() {
        this.router.navigate(['/statistic-zone']);
    }

    public activities() {
        this.router.navigate(['/activities']);
    }
}

