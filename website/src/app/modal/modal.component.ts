import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  show:boolean=false;

  constructor(private dialogRef: MatDialogRef<ModalComponent>, private dataService: DataService) { }
  
  switch1(v) {
    switch (v) {
      case 1:
        this.dataService.sendSignData("signin1");
        break;
      case 2:
        this.dataService.sendSignData("signin2");
        break;
    }
    const container = document.getElementById('md-container');
    container.classList.add('md-right-panel-active');
    
  }
  switch2() {
    const container = document.getElementById('md-container');
    container.classList.remove('md-right-panel-active');
  }

  ngOnInit() {
    this.show = window.screen.width <= 600? true: false;
    if(this.dataService.getSignData()==="signin1"){
      this.switch1(1)
    }else if (this.dataService.getSignData()==="signin2"){
      this.switch1(2)
    }
}
  @HostListener('window:resize', ['$event'])
  onResize(event) {
      this.show = event.target.innerWidth <= 600 ? true : false; 
  }

  close(){
    this.dialogRef.close();
  }
} 
