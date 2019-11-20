import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  signMsg:String;
  constructor() { }
  sendSignData(message){
    this.signMsg = message
  }
  getSignData(){
    return this.signMsg;
  }
}
