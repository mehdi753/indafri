import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  lat1: number = 35.848827;
  lng1: number = 10.617586;
  lat2: number = 51.217770;
  lng2: number = 6.779150;
  constructor() { }

  ngOnInit() {
  }

}
