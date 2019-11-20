import { Component, OnInit, HostListener } from '@angular/core';

declare var Particler: any;
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})

export class AccueilComponent implements OnInit {

  myNb: number;
  active1: boolean = false;
  active2: boolean = false;
  active3: boolean = false;


  goTo(event) {
    if (document.body.offsetWidth < 800) {
      if (event.type === 'click') {
        if (event.target.closest('.deals') && this.active1) {
          window.open('https://www.4deals.tn', '_blank');
          this.active1 = false;
        } else if (event.target.closest('.idzifly') && this.active2) {
          window.open('https://www.idzifly.com', '_blank');
          this.active2 = false;
        } else if (event.target.closest('.igo') && this.active3) {
          window.open('https://www.igo.tn', '_blank');
          this.active3 = false;
        } else {
          if (event.target.closest('.deals')) {
            this.active1 = true;
            this.active2 = false;
            this.active3 = false;
          } else if (event.target.closest('.idzifly')) {
            this.active1 = false;
            this.active2 = true;
            this.active3 = false;
          } else if (event.target.closest('.igo')) {
            this.active1 = false;
            this.active2 = false;
            this.active3 = true;
          };
        }
      }
    } else {
      if (event.target.closest('.deals')) {
        window.open('https://www.4deals.tn', '_blank');
      } else if (event.target.closest('.idzifly')) {
        window.open('https://www.idzifly.com', '_blank');
      } else if (event.target.closest('.igo')) {
        window.open('https://www.igo.tn', '_blank');
      }
    }
  }
  @HostListener('window:click', ['$event'])
  onWindowClick(event) {
    if (!event.target.closest('.part')) {
      this.active1 = false;
      this.active2 = false;
      this.active3 = false;
    }
  }
  onInViewportChange(inViewport: boolean) {
    inViewport ? this.myNb = 1000 : this.myNb = 1;

  }
  ngOnInit() {
    var particlerOptions = {
      quantity: 20,
      fillColor: "#fa00d9",
      lineWidth:0.00001,
      maxSize:2.5,
      minimalLineLength:600,
    };
    // create particler instance
    var particlerExample = new Particler("particler-instance", particlerOptions);
    
  }
}
