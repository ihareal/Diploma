import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
@Component({
    selector: 'app-activities',
    templateUrl: 'activities.component.html',
    styleUrls: ['./activities.component.css']
})

export class ActivitiesComponent implements OnInit {
    participate = [
        'We want to restore forest layer. We need 10 trees, no matter what type they are',
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
