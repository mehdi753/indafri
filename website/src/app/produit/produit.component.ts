import { Component, OnInit } from '@angular/core';
import { InscriptionComponent } from '../inscription/inscription.component';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog'
declare var Rellax : any;
@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

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
