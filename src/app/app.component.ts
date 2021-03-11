import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './service/sidenav.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('drawer') public sidenav: MatSidenav;
  constructor(
    private sidenavService: SidenavService
    ){}
ngAfterViewInit() { 
  this.sidenavService.setSidenav(this.sidenav);
  document.addEventListener('scroll',()=>{
    this.whenScroll();
  })
}
whenScroll(){
  if(window.scrollY > 60){
    this.topNav = true;
  }
  else {
    this.topNav = false;
  }
}
topNav = false;
}
