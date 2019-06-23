import { Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MultiSelectModel } from '../shared/models/district.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { HttpClient } from '@angular/common/http';

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
  public changeTheme = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.register = true;
    }
    if (localStorage.getItem('role') === 'user') {
      this.menuType = true;
    } else if (localStorage.getItem('role') === 'admin') {
      this.menuType = false;
    }
  }

  openSignInDialog(): void {
    const dialogRef = this.dialog.open(SignInComponent, {
      width: '550px',
      height: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
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

  public themeChanged($event) {
    this.changeTheme = $event.checked;
    if (this.changeTheme === true) {
      localStorage.setItem('theme', 'eye');
      // this.router.navigate(['/home'], { queryParams: { theme: 'eye' } });
    } else {
      localStorage.setItem('theme', 'usual');
      // this.router.navigate(['/home'], { queryParams: { theme: 'usual' } });
    }
  }

}

@Component({
  selector: 'app-sign-in-component',
  templateUrl: './sign-in-component.html',
  styleUrls: ['./sign-in-component.css']
})

export class SignInComponent implements OnInit {

  public signInForm: FormGroup;
  public registrationForm: FormGroup;
  public hiddenPassword = true;
  public hiddenRegistratePassword = true;
  public changeTheme = false;
  public isAdmin = 0;
  public authorizationError = '';
  public registratingError = '';
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
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<SignInComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private http: HttpClient
  ) {
    this.signInForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      district: [''],
      houseType: [''],
      flatStage: [''],
      stageHouseAmount: [''],
    });
    this.registrationForm = this.fb.group({
      emailR: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      passwordR: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(query => {
      if (query['theme'] === 'eye') {
        this.changeTheme = true;
      }
    });
  }
  get registrateControls() { return this.registrationForm.controls; }
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

  public showRegistrationPassword() {
    this.hiddenRegistratePassword = false;
    const x = (<HTMLInputElement>document.getElementById('passwordRegInput'));
    x.type = 'text';
  }

  public hideRegistraionPassword() {
    this.hiddenRegistratePassword = true;
    const x = (<HTMLInputElement>document.getElementById('passwordRegInput'));
    x.type = 'password';
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public authorisationSubmit($event) {

    console.log(this.registrationForm.value);
    let email = this.registrationForm.controls['emailR'].value;
    let password = this.registrationForm.controls['passwordR'].value;
    this.http.get(`https://localhost:44338/api/users/login?email=${email}&password=${password}`).subscribe(
      res => {
        debugger;
        localStorage.setItem('UserId', res['UserId']);
        localStorage.setItem('email', res['Email']);
        if (res['isAdmin'] == 1) {
          localStorage.setItem('role', 'admin');
        } else if (res['isAdmin'] == 0) {
          localStorage.setItem('role', 'user');
        }
        localStorage.setItem('houseType', res['DwellingType']);
        localStorage.setItem('district', res['District']);
        if (res['StageNumber'] !== 0) {
          localStorage.setItem('flatStage', res['StageNumber']);

        } else if (res['StageAmount'] !== 0) {
          localStorage.setItem('stageHouseAmount', res['StageAmount']);
        }

        console.log(res);
        this.dialogRef.close();
      },
      err => {
        debugger;
        this.authorizationError = err.error;
        console.log(err.error);
      });

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

    if (this.signInForm.controls['houseType'].value === 'flat') {

      if (localStorage.getItem('role') === 'admin') {
        this.isAdmin = 1;
      }

      const onk = {
        Email: this.signInForm.controls['email'].value,
        isAdmin: this.isAdmin,
        District: this.signInForm.controls['district'].value,
        Password: this.signInForm.controls['password'].value,
        DwellingType: this.signInForm.controls['houseType'].value,
        StageNumber: parseInt(this.signInForm.controls['flatStage'].value, 10),
      };

      debugger;
      this.userService.postUser(JSON.stringify(onk)).subscribe(
        res => {
          debugger;
          localStorage.setItem('UserId', res['UserId']);
          console.log(res);
          this.dialogRef.close();

        },
        err => {
          console.log(err);
          this.registratingError = err.error;
        }
      );

    } else if (this.signInForm.controls['houseType'].value === 'house') {

      if (localStorage.getItem('role') === 'admin') {
        this.isAdmin = 1;
      }

      const onk = {
        Email: this.signInForm.controls['email'].value,
        isAdmin: this.isAdmin,
        District: this.signInForm.controls['district'].value,
        Password: this.signInForm.controls['password'].value,
        DwellingType: this.signInForm.controls['houseType'].value,
        StageAmount: parseInt(this.signInForm.controls['stageHouseAmount'].value, 10),
      };

      debugger;
      this.userService.postUser(JSON.stringify(onk)).subscribe(
        res => {
          localStorage.setItem('UserId', res['UserId']);
          this.dialogRef.close();
          console.log(res);
        },
        err => {
          console.log(err);
          this.registratingError = err.error;
        }
      );

    }
  }


}
