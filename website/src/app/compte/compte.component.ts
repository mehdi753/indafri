import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { MyErrorStateMatcher } from '../my-error-state-matcher'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from "@angular/material";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {
  public signControl: FormGroup;
  show:boolean = false;
  type:String;
  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<CompteComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
    private dataService: DataService
    ) {

  }
  ngOnInit() {
    this.show = window.screen.width <= 600? true: false;
    this.signControl = new FormGroup({
      emailFormControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      passFormControl: new FormControl('', [
        Validators.required,
      ])

    });
  }
  matcher = new MyErrorStateMatcher();
  public hasError = (controlName: string, errorName: string) =>{
    return this.signControl.controls[controlName].hasError(errorName);
  }
  save() {
    console.log(this.dataService.getSignData())
    if (this.hasError('emailFormControl','email') || this.hasError('emailFormControl','required')
      || this.dataService.getSignData()==="") {
      this.openSnackBar("Error", "Verify you informations")
    } else {
      if (this.dataService.getSignData()==="signin1"){
        this.type="Agence";
      }else if (this.dataService.getSignData()==="signin2"){
        this.type="Hotel";
      }
      
      const client = {
        type :    this.type,
        email :   this.signControl.get('emailFormControl').value,
        password: this.signControl.get('passFormControl').value
      };
      console.table([client.type, client.email, client.password])
      /*this.authService.loginUser(client);
      this.router.navigate(['/dashboard']);*/
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
      this.show = event.target.innerWidth <= 600 ? true : false; 
  }
}
