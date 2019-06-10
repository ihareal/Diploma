import { Component, OnInit, OnChanges } from '@angular/core';
import { CheckingService } from '../shared/checking.service';

@Component({
    selector: 'app-personal-area-component',
    templateUrl: './personal.area.component.html',
    styleUrls: ['./personal.area.component.css']
})

export class PersonalAreaComponent implements OnInit {
    public adminView = false;
    constructor(
        private checkingService: CheckingService,
    ) { }

    ngOnInit() {
        if (this.checkingService.checkForAdmin() === true) {
            this.adminView = true;
        } else { this.adminView = false; }
    }

}
