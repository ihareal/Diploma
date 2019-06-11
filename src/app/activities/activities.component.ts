import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
@Component({
    selector: 'app-activities',
    templateUrl: 'activities.component.html',
    styleUrls: ['./activities.component.css']
})

export class ActivitiesComponent implements OnInit {
    participate = [
        'Event descrition 0',
        'Event descrition 1',
    ];

    refuse = [
        'Event descrition 2'
    ];

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }

    constructor() { }

    ngOnInit() { }
}
