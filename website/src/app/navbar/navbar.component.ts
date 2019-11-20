import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { ModalComponent } from '../modal/modal.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  collapse: boolean = true;
  constructor(private dialog: MatDialog, private dataService: DataService) { }
  open(v) {
    switch (v) {
      case 1:
        this.dataService.sendSignData("signup");
        break;
      case 2:
        this.dataService.sendSignData("signin1");
        break;
      case 3:
        this.dataService.sendSignData("signin2");
        break;
    }
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      return false
    });
  }
  ngOnInit() {
    if (document.body.offsetWidth >= 800) {
      this.collapse = true;
    }
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    let navbar = document.getElementById('navbar');
    let logo = document.getElementById('logo');
    if (number > 10) {
      navbar.classList.add('scrolled');
      logo.style.display = 'none';
      if (document.body.offsetWidth > 800) { navbar.style.backgroundColor = 'rgba(206, 21, 206, .9)'; }
      if (document.body.offsetWidth < 800 && document.getElementById('btnul').className === 'btn responsive' &&
        logo.className !== 'logo hide') {
        logo.style.display = 'unset';
      }
      if (document.body.offsetWidth < 800 && document.getElementById('btnul').className === 'btn responsive') {
        navbar.style.backgroundColor = '#fff';
      }
    } else {
      navbar.classList.remove('scrolled');
      logo.style.display = 'unset';
      if (document.body.offsetWidth < 800 && document.getElementById('btnul').className != 'btn responsive') {
        navbar.style.backgroundColor = 'unset';
      } else if (document.body.offsetWidth > 800) {
        navbar.style.backgroundColor = 'unset';
      }
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth >= 800) {
      if (document.getElementById('btnul').className === 'btn responsive') {
        document.getElementById('btnul').classList.remove('responsive');
        document.getElementById('navbar').style.backgroundColor = 'unset';
        if (document.getElementById('icon').className === 'change') {
          document.getElementById('icon').classList.remove('change');
        }
      }
    }
  }
  toggleCollapse() {
    if (document.body.offsetWidth < 800) {
      let btul = document.getElementById('btnul');
      let logo = document.getElementById('logo');
      if (btul.className === 'btn') {
        btul.className += ' responsive';
        document.getElementById('navbar').style.backgroundColor = '#fff';
        document.getElementById('icon').classList.toggle('change');
        logo.classList.add('hide');

      } else {
        btul.className = 'btn';
        document.getElementById('navbar').style.backgroundColor = 'unset';
        document.getElementById('icon').classList.remove('change');
        logo.classList.remove('hide');
        logo.style.display = 'unset';
      }
    }
  }

}

