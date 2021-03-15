import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonalInformationComponent } from '../../modal/personal-information/personal-information.component';
import { UsageRuleComponent } from '../../modal/usage-rule/usage-rule.component';
import { LoginComponent} from '../login/login.component';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private dialog:MatDialog,
    private sign_in:MatDialog,
    private dialog2:MatDialog,
    private auth: AuthService
  ) { }

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
}
