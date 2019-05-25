import { Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MultiSelectModel } from '../shared/models/district.model';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-header-side-nav',
  templateUrl: './header-side-nav.component.html',
  styleUrls: ['./header-side-nav.component.css']
})

export class HeaderSideNavComponent implements OnInit {
  opened: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  public register = false;
  public menuType = null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.register = true;
    }
  }

  openSignInDialog(): void {
    const dialogRef = this.dialog.open(SignInComponent, {
      width: '550px',
      height: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (localStorage.getItem('email')) {
        this.register = true;
      }
      if (localStorage.getItem('role') === 'user') {
        this.menuType = true;
      } else if (localStorage.getItem('role') === 'admin') {
        this.menuType = false;
      }
    });
  }

  public signOut() {
    this.register = false;
    localStorage.clear();
  }

}

@Component({
  selector: 'app-sign-in-component',
  templateUrl: './sign-in-component.html',
  styleUrls: ['./sign-in-component.css']
})

export class SignInComponent {

  public signInForm: FormGroup;
  public hiddenPassword = true;
  public districtArray: MultiSelectModel[] = [
    { value: 'Centralniy', viewValue: 'Centralniy' },
    { value: 'Sovietskiy', viewValue: 'Sovietskiy' },
    { value: 'Pervomayskiy', viewValue: 'Pervomayskiy' },
    { value: 'Partizanski', viewValue: 'Partizanski' },
    { value: 'Zavodskoy', viewValue: 'Zavodskoy' },
    { value: 'Leninskiy', viewValue: 'Leninskiy' },
    { value: 'Oktyabrskiy', viewValue: 'Oktyabrskiy' },
    { value: 'Moscouski', viewValue: 'Moscouski' },
    { value: 'Frunzenski', viewValue: 'Frunzenski' },
  ];

  public dwellingArray: MultiSelectModel[] = [
    { value: 'flat', viewValue: 'Flat' },
    { value: 'house', viewValue: 'House' },
  ];

  constructor(
    public dialogRef: MatDialogRef<SignInComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
  ) {
    this.signInForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      district: [''],
      houseType: [''],
      flatStage: [''],
      stageHouseAmount: [''],
    });
  }

  get formControls() { return this.signInForm.controls; }

  public show() {
    this.hiddenPassword = false;
    const x = (<HTMLInputElement>document.getElementById('passwordInput'));
    x.type = 'text';
  }

  public hide() {
    this.hiddenPassword = true;
    const x = (<HTMLInputElement>document.getElementById('passwordInput'));
    x.type = 'password';
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onOkClick($event) {
    Object.keys(this.formControls).forEach(control => {
      if (control !== 'password') {
        (this.signInForm.controls[control].value !== null &&
          this.signInForm.controls[control].value !== undefined &&
          this.signInForm.controls[control].value !== '') ?
          // true
          localStorage.setItem(control, this.signInForm.controls[control].value) :
          // false
          console.log();
      } else if (this.signInForm.controls['password'].value === 'admin') {
        localStorage.setItem('role', 'admin');
      } else if (this.signInForm.controls['password'].value !== 'admin') {
        localStorage.setItem('role', 'user');
      }
    });
    this.dialogRef.close();
  }
}
