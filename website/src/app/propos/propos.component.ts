import { Component, OnInit } from '@angular/core';
import { InscriptionComponent } from '../inscription/inscription.component';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog'
declare var Rellax : any;
@Component({
  selector: 'app-propos',
  templateUrl: './propos.component.html',
  styleUrls: ['./propos.component.css']
})
export class ProposComponent implements OnInit {
  ngOnInit() {
    var rellax = new Rellax('.rellax');
  }
  constructor(private dialog: MatDialog) { }
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };
    this.dialog.open(InscriptionComponent, dialogConfig);
  }
}
