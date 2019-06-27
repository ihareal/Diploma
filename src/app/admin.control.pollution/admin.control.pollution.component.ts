import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { PollutionService } from '../shared/services/pollution.service';

export interface PollutionGetModel {
  PollutionId: number;
  UserId: number;
  Title: string;
  Description: string;
  Status: string;
  CreationDate: string;
}

@Component({
  selector: 'app-admin-control-pollution',
  templateUrl: './admin.control.pollution.component.html',
  styleUrls: ['./admin.control.pollution.component.css']
})
export class AdminControlPollutionComponent implements OnInit {
  public initial: PollutionGetModel[] = [
    // tslint:disable-next-line:max-line-length
    { PollutionId: 1, UserId: 1, Title: 'asdfasf', Description: 'asdfad', Status: 'Status', CreationDate: '29/08/2000' },
    // tslint:disable-next-line:max-line-length
    { PollutionId: 1, UserId: 1, Title: 'asdfasf', Description: 'asdfad', Status: 'Status', CreationDate: '29/08/2000' },
    // tslint:disable-next-line:max-line-length
    { PollutionId: 1, UserId: 1, Title: 'asdfasf', Description: 'asdfad', Status: 'Status', CreationDate: '29/08/2000' },
    // tslint:disable-next-line:max-line-length
    { PollutionId: 1, UserId: 1, Title: 'asdfasf', Description: 'asdfad', Status: 'Status', CreationDate: '29/08/2000' },


  ];
  public userData;
  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['PollutionId', 'UserId', 'Title', 'Description', 'Status', 'CreationDate', 'Delete'];


  public dataSource;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;


  constructor(
    private pollutionService: PollutionService,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource(this.initial);
    this.pollutionService.getPollutions().subscribe(data => {this.dataSource.data = data; this.userData = data})
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
