import { Component, Inject } from '@angular/core';
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
export class HeaderSideNavComponent {
  opened: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog
  ) { }


  openSignInDialog(): void {
    const dialogRef = this.dialog.open(SignInComponent, {
      width: '550px',
      height: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'app-sign-in-component',
  templateUrl: './sign-in-component.html',
  styleUrls: ['./sign-in-component.css']
})

export class SignInComponent {

  public signInForm: FormGroup;
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
    { value: 'flat', viewValue: 'flat' },
    { value: 'house', viewValue: 'house' },
  ];
  constructor(
    public dialogRef: MatDialogRef<SignInComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
  ) {
    this.signInForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      district: [''],
      houseType: [''],
      stage: [''],
    });
  }

  get formControls() { return this.signInForm.controls; }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
