import { Component, OnInit ,AfterViewInit,Output,EventEmitter} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog} from '@angular/material/dialog';
import { ReadyComponent} from '../../page/ready/ready.component';
import { TodayLiveComponent} from '../../page/today-live/today-live.component';
import { AllLiveComponent} from '../../page/all-live/all-live.component';
import { MaumdociComponent} from '../../page/maumdoci/maumdoci.component';
import { LoginComponent} from '../login/login.component';
import { AuthService } from '../../service/auth.service';
import { SidenavService} from '../../service/sidenav.service';
@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements AfterViewInit{
  @Output() navToggle = new EventEmitter<boolean>();
  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private auth: AuthService,
    public dialog:MatDialog,
    public sign_in:MatDialog,
    public golink:MatDialog,
    private sidenav: SidenavService,
  ) {
    router.events.subscribe(()=>{
      this.url = this.router.url.split('/');
      if(this.url.includes('allLive')){this.upsideName = '모든라이브';}
      else if(this.url.includes('preopen')){this.upsideName = '오픈예정';}
      else if(this.url.includes('todayLive')){this.upsideName = '오늘의 라이브';}
      else if(this.url.includes('detail')){this.upsideName = '상세페이지';}
      else if(this.url.includes('mypage')){this.upsideName = '마이페이지';}
      else if(this.url.includes('mypageTeacher')){this.upsideName = '마이페이지';}
      else if(this.url.includes('join')){this.upsideName = '회원가입';}
      else if(this.url.includes('maum')){this.upsideName = '마음도씨란?';}
      else if(this.url.includes('enrollClass')){this.upsideName = '수강신청';}
      else{this.upsideName = null;}
      console.log(this.upsideName);
    })
    auth.Log.subscribe( () => {
      this.sign_check();
    })
    
  }

  ngOnInit(): void {
    this.sign_check();
  }
  ngAfterViewInit():void{
    document.addEventListener('scroll',()=>{
      this.whenScroll();
    })
    this.route.params.subscribe(dt=>{
      console.log(dt)
    })
  }
  upsideName:any;
  search = 0;
  topNav = false;
  sign = false;
  info;
  display = 'none';
  url;
  sign_check() {
    if (!this.auth.isAuthenticated()) {
      this.sign = false;
    } else {
      this.sign = true;
      // console.log(this.auth.getUserData());
      this.info = JSON.parse(this.auth.getUserData());
      console.log(this.info);
    }
  }
  mypage() {
    if ( this.info.type == false ) {
      this.router.navigate(['mypage/' + this.info.id]);
    } else {
      this.router.navigate(['mypageTeacher/' + this.info.id]);
    }
  }
  modal(){
    const dialogRef = this.dialog.open(ReadyComponent);
  }
  signin(){
    this.closeBox();
    const dialogRef2 = this.sign_in.open(LoginComponent);
  }
  signout() {
    this.closeBox();
    this.auth.signout();
  }
  searchBox(){
    var box1 = document.getElementsByClassName('searchBox')[0] as HTMLElement;
    var box2 = document.getElementsByClassName('menuBox')[0] as HTMLElement;
    box1.style.display = 'block';
    box2.style.display = 'none';
  }
  closeBox(){
    this.search = 0;
  }
  menuBox(){
    var box1 = document.getElementsByClassName('searchBox')[0] as HTMLElement;
    var box2 = document.getElementsByClassName('menuBox')[0] as HTMLElement;
    box1.style.display = 'none';
    box2.style.display = 'block';
  }
  allFind(e:Event){
    var tag = e.target as HTMLElement;
    if(tag.classList.contains('searchButton')){
      var value = (document.getElementsByClassName('searchInput')[0] as HTMLInputElement).value;
      if( value == ''){
        document.location.href = 'allLive';
      }
      else{
        document.location.href = 'allLive/search/'+value;
      }
    }
    else {
      var value = tag.textContent;
      document.location.href = 'allLive';
    }
  }
  mfd(e:Event){
    var tag = e.target as HTMLElement;
    let text = tag.textContent;
    var bigCategory = tag.closest('.content').getElementsByClassName('headName')[0] as HTMLElement;
    if(bigCategory.classList.contains('allLive')){
      this.router.navigate(['/allLive/search/',text]);
    }
    else if (bigCategory.classList.contains('preopen')){
      this.router.navigate(['/preopen/search/',text]);
    }
  }
  boxPosition(){
    var menu = document.getElementsByClassName('menu')[0] as HTMLElement;
    var menuBox = document.getElementsByClassName('menuBox')[0] as HTMLElement;
    var menuPos = menu.getBoundingClientRect().x;
    var search = document.getElementsByClassName('search')[0] as HTMLElement;
    var searchBox = document.getElementsByClassName('searchBox')[0] as HTMLElement;
    var searchPos = search.getBoundingClientRect().x;

    menuBox.style.left = menuPos - 940 + 60 +'px';
    searchBox.style.left = searchPos - 790 + 60 +'px';
  }
  enterkey() {
  }
  HyperLink(loc){
    location.href = './' + loc;
  }
  clickMenu(){
    this.sidenav.toggle();
  }
  whenScroll(){
    if(window.scrollY > 60){
      this.topNav = true;
    }
    else {
      this.topNav = false;
    }
  }
  searchOn() {
    this.search = 1;
  }
  searchOff(e:Event){
    var clickTag = e.target as HTMLElement;
    var searchBox = document.getElementsByClassName('searchBox')[0] as HTMLElement;
    var searchInput = document.getElementsByClassName('searchInput')[0] as HTMLElement;
    if(clickTag == searchBox || clickTag == searchInput ) {
      this.search = 1;
    }
    else {
      this.search = 0;
    }
  }
  back(){
    history.back();
  }
}
