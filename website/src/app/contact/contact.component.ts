import { Component, OnInit } from '@angular/core';
import { MyErrorStateMatcher } from '../my-error-state-matcher';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ContactService } from '../services/contact.service';
import {Router } from '@angular/router'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public contControl: FormGroup;
  matcher = new MyErrorStateMatcher();
  lat1: number = 35.848827;
  lng1: number = 10.617586;
  today:any;

  constructor(
    public snackBar: MatSnackBar,
    private contactService: ContactService,
    private router: Router
    ) { }
  
  ngOnInit() {
    this.contControl = new FormGroup({
      emailFormControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      nomFormControl: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
        Validators.minLength(3)
      ]),
      telFormControl: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.minLength(4)
      ]),
      msgFormControl: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.contControl.controls[controlName].hasError(errorName);
  }
  onSubmitSend() {
    if (this.hasError('emailFormControl', 'email') || this.hasError('emailFormControl', 'required')
      || this.hasError('nomFormControl', 'required') || this.hasError('nomFormControl', 'pattern')
      || this.hasError('nomFormControl', 'minLength') || this.hasError('telFormControl', 'required')
      || this.hasError('telFormControl', 'minLength') || this.hasError('telFormControl', 'pattern')
      || this.hasError('msgFormControl', 'minLength') || this.hasError('msgFormControl', 'required')) {
      this.openSnackBar('Error', 'Verify your informations');
    } else {
      const today = new Date();
      const date =today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
      const time =today.getHours()+':'+(today.getMinutes()+1)+':'+today.getSeconds();
      const dateTime = date + ' - ' + time;
      const msg = {
        name:this.contControl.get('nomFormControl').value,
        email:this.contControl.get('emailFormControl').value,
        phone:this.contControl.get('telFormControl').value,
        message:this.contControl.get('msgFormControl').value,
        dateTime:dateTime
      }
      this.contactService.sendMsg(msg);
      this.router.navigate(['/dashboard']);
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
