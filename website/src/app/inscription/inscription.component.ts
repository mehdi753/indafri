import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MyErrorStateMatcher } from '../my-error-state-matcher';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  show: boolean = false;
  public regControl: FormGroup;
  matcher = new MyErrorStateMatcher();
  country: String;
  agency: String;
  name: String;
  fname: String;
  email: String;
  phone: String;

  constructor(
    private dialogRef: MatDialogRef<InscriptionComponent>,
    public snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    
  ) { }

  ngOnInit() {
    this.show = window.screen.width <= 600 ? true : false;
    this.regControl = new FormGroup({
      emailFormControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      payFormControl: new FormControl('', [
        Validators.required

      ]),
      agFormControl: new FormControl('', [
        Validators.required
      ]),
      nomFormControl: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
        Validators.minLength(3)
      ]),
      prFormControl: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.minLength(3)
      ]),
      telFormControl: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9+]*'),
        Validators.minLength(4)
      ]),
      captcha: new FormControl(),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.regControl.controls[controlName].hasError(errorName);
  }

  onSubmitSignup() {
    console.log(this.regControl.get('telFormControl').value)
    if (this.hasError('emailFormControl', 'email') || this.hasError('emailFormControl', 'required')
      || this.hasError('agFormControl', 'required') || this.hasError('nomFormControl', 'required')
      || this.hasError('nomFormControl', 'minLength') || this.hasError('nomFormControl', 'pattern')
      || this.hasError('prFormControl', 'required') || this.hasError('prFormControl', 'minLength')
      || this.hasError('prFormControl', 'pattern') || this.hasError('telFormControl', 'required')
      || this.hasError('telFormControl', 'minLength') || this.hasError('telFormControl', 'pattern')
      || this.regControl.get('telFormControl').value.toString(10).length===0) {
      this.openSnackBar('Error', 'Verify your informations');
    } else {
      const user = {
        country: this.regControl.get('payFormControl').value,
        agency: this.regControl.get('agFormControl').value,
        name: this.regControl.get('nomFormControl').value,
        fname: this.regControl.get('prFormControl').value,
        email: this.regControl.get('emailFormControl').value,
        phone: this.regControl.get('telFormControl').value
      };
      this.authService.signupUser(user);
      
    }
  }

  close() {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.show = event.target.innerWidth <= 600 ? true : false;
  }
}
