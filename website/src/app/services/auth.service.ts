import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  authToken: any;
  client: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    public snackBar: MatSnackBar,
    private cookieService: CookieService
  ) { };

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  signupUser(user) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:2000/user/signup', user).subscribe(
        (data: { success: boolean, message: string }) => {
          data.success ? this.openSnackBar(data.message, 'Succeeded') : this.openSnackBar(data.message, 'Failed');
        });
    });
  }
  loginUser(client) {
    return new Promise((resolve, reject)=>{
      this.http.post('http://localhost:2000/user/login', client).subscribe(
        (data: { success: boolean, token: string, client:Object, msg: string }) => {
          if (data.success) {
            this.openSnackBar(data.msg, 'Succeeded')
            this.storeClientData( data.token, data.client);
          }else{
            this.openSnackBar(data.msg, 'Failed');
          } 
        });
    })
  }
  storeClientData(token, client){
    this.cookieService.set( 'id_token', token );
    this.cookieService.set( 'user', JSON.stringify(client));
    this.authToken= token;
    this.user= client;
  }
}
