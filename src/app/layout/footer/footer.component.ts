import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonalInformationComponent } from '../../modal/personal-information/personal-information.component';
import { UsageRuleComponent } from '../../modal/usage-rule/usage-rule.component';
import { LoginComponent} from '../login/login.component';
import { AuthService } from '../../service/auth.service';
import { SidenavService} from '../../service/sidenav.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Output() navToggle = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private dialog:MatDialog,
    private sign_in:MatDialog,
    private dialog2:MatDialog,
    private auth: AuthService,
    private sidenav: SidenavService,

  ) {
    auth.Log.subscribe( () => {
      this.sign_check();
    })
   }

  ngOnInit(): void {
    this.sign_check();
  }


  sign = false;
  info;


  pir(){
    const dialogRef = this.dialog.open(PersonalInformationComponent);
  }
  usr(){
    const dialogRef2 = this.dialog.open(UsageRuleComponent);
  }
  signin(){
    this.closeBox();
    const dialogRef2 = this.sign_in.open(LoginComponent);
  }
  signout() {
    this.auth.signout();
    this.clickMenu();
  }
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
  closeBox(){
    // var box1 = document.getElementsByClassName('searchBox')[0] as HTMLElement;
    // box1.style.display = 'none';
  }
  clickMenu(){
    this.sidenav.toggle();
  }
  mypage() {
    if ( this.info.type == false ) {
      this.router.navigate(['mypage/' + this.info.id]);
    } else {
      this.router.navigate(['mypageTeacher/' + this.info.id]);
    }
    this.clickMenu();
  }
  mfd(e:Event){
    var tag = e.target as HTMLElement;
    let text = tag.textContent;
    var bigCategory = tag.closest('li') as HTMLElement;
    console.log(tag , bigCategory)
    if(bigCategory.classList.contains('allLive')){
      // this.router.navigate(['/allLive/search/',text]);
      location.href = './allLive/search/'+text;
    }
    else if (bigCategory.classList.contains('preopen')){
      // this.router.navigate(['/preopen/search/',text]);
      location.href = './preopen/search/'+text;
    }
  }
}
