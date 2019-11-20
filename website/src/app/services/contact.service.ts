import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  msg: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    public snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  sendMsg(msg) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:2000/contact/save', msg).subscribe(
        (data: { success: boolean, message: string }) => {
          data.success ? this.openSnackBar(data.message, 'Succeeded') : this.openSnackBar(data.message, 'Failed');
        });
    });
  }
}
