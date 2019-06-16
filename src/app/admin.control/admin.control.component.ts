import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { UserService } from '../shared/services/user.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

export interface UserGetModel {
  Email: string;
  isAdmin: number;
  District: string;
  Password: string;
  DwellingType: string;
  UserId: number;
  StageAmount: number;
  StageNumber: number;
}


@Component({
  selector: 'app-admin.control',
  templateUrl: './admin.control.component.html',
  styleUrls: ['./admin.control.component.css']
})
export class AdminControlComponent implements OnInit {
  public initial: UserGetModel[] = [
    // tslint:disable-next-line:max-line-length
    { UserId: 1, Email: 'h@gmail.com', isAdmin: 0, Password: 'asdfaasdf', DwellingType: 'House', StageAmount: 1, StageNumber: 0, District: 'Autozavod' },
    // tslint:disable-next-line:max-line-length
    { UserId: 2, Email: 'h@gmail.com', isAdmin: 0, Password: 'asdfaasdf', DwellingType: 'House', StageAmount: 1, StageNumber: 0, District: 'Autozavod' },
    // tslint:disable-next-line:max-line-length
    { UserId: 3, Email: 'h@gmail.com', isAdmin: 0, Password: 'asdfaasdf', DwellingType: 'House', StageAmount: 1, StageNumber: 0, District: 'Autozavod' },
    // tslint:disable-next-line:max-line-length
    { UserId: 4, Email: 'h@gmail.com', isAdmin: 0, Password: 'asdfaasdf', DwellingType: 'House', StageAmount: 1, StageNumber: 0, District: 'Autozavod' },
    // tslint:disable-next-line:max-line-length
    { UserId: 5, Email: 'h@gmail.com', isAdmin: 0, Password: 'asdfaasdf', DwellingType: 'House', StageAmount: 1, StageNumber: 0, District: 'Autozavod' },
    // tslint:disable-next-line:max-line-length
    { UserId: 6, Email: 'h@gmail.com', isAdmin: 0, Password: 'asdfaasdf', DwellingType: 'House', StageAmount: 1, StageNumber: 0, District: 'Autozavod' },
    // tslint:disable-next-line:max-line-length
    { UserId: 7, Email: 'h@gmail.com', isAdmin: 0, Password: 'asdfaasdf', DwellingType: 'House', StageAmount: 1, StageNumber: 0, District: 'Autozavod' },

  ];
  public userData: any;


  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['UserId', 'Email', 'isAdmin', 'Password', 'DwellingType', 'StageAmount', 'StageNumber', 'District', 'Delete'];


  public dataSource;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;


  constructor(
    private userService: UserService,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource(this.initial);
    this.userService.getUsers().subscribe(result => { this.dataSource.data = result; this.userData = result; });
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
