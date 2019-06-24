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
        console.log(event);
        if (event.previousContainer === event.container) {
            debugger;
            // Если пользователь недоятянул
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            debugger;
            // Если дотянул успешно
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);

            if (event.container.id === '') {
                // post if sdk = 0 
            } else if (event.container.id === '') {
                // delete if sdk = 1
            }
        }
    }

    constructor() { }

    ngOnInit() { }
}
