import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { EventService } from '../shared/services/event.service';

export interface EventGetModel {
  EventId: number;
  UserId: number;
  Title: string;
  Description: string;
  Latitude: number;
  Longitude: number;
  Status: string;
  CreationDate: string;
  StartDate: string;
  EndDate: string;
}

@Component({
  selector: 'app-admin-control-event',
  templateUrl: './admin.control.event.component.html',
  styleUrls: ['./admin.control.event.component.css']
})
export class AdminControlEventComponent implements OnInit {
  public initial: EventGetModel[] = [
    // tslint:disable-next-line:max-line-length
    { EventId: 0, UserId: 1, Title: 'dsf', Description: 'asdfasdf', Latitude: 56.4578457, Longitude: 52345.555, Status: 'asdfasdf', CreationDate: '28/05/2019', StartDate: '28/05/2019', EndDate: '31/05/2019' },
    // tslint:disable-next-line:max-line-length
    { EventId: 1, UserId: 1, Title: 'dsf', Description: 'asdfasdf', Latitude: 56.4578457, Longitude: 52345.555, Status: 'asdfasdf', CreationDate: '28/05/2019', StartDate: '28/05/2019', EndDate: '31/05/2019' },
    // tslint:disable-next-line:max-line-length
    { EventId: 2, UserId: 1, Title: 'dsf', Description: 'asdfasdf', Latitude: 56.4578457, Longitude: 52345.555, Status: 'asdfasdf', CreationDate: '28/05/2019', StartDate: '28/05/2019', EndDate: '31/05/2019' },
    // tslint:disable-next-line:max-line-length
    { EventId: 3, UserId: 1, Title: 'dsf', Description: 'asdfasdf', Latitude: 56.4578457, Longitude: 52345.555, Status: 'asdfasdf', CreationDate: '28/05/2019', StartDate: '28/05/2019', EndDate: '31/05/2019' },
  ];

  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['EventId', 'UserId', 'Title', 'Description', 'Latitude', 'Longitude', 'Status', 'CreationDate', 'StartDate', 'EndDate', 'Delete'];


  public dataSource;
  public userData: any;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;


  constructor(
    private eventService: EventService,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource(this.initial);
    this.eventService.getEvents().subscribe(data => { debugger; this.dataSource.data = data; this.userData = data; });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  public expr(row) {
    console.log(row);
    debugger;
    this.userData.forEach((element, idx) => {
      if (element['UserId'] === row['UserId']) {
        console.log(idx);
        this.userData.splice(idx, 1);
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'userTable.xlsx');

  }

}
