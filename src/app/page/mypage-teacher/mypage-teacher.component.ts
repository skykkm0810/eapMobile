import { Component, ElementRef, OnInit, Renderer2, ViewChild, ɵɵresolveBody } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SocketioService } from '../../service/socketio.service';
import {MatSnackBar} from '@angular/material/snack-bar';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressComponent } from '../../modal/address/address.component';
import { UserInfoComponent } from '../../modal/user-info/user-info.component';
import { Agreement, INTERESTS, react, cause, Banks, selAccountType, selCollStat, selGender, selLevel } from '../../interface/interface';
import { PhxChannelService } from 'src/app/service/phx-channel.service';
import { AuthService } from 'src/app/service/auth.service';
import { Environment } from 'src/app/environment/environment';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { postcode } from 'src/assets/js/postcode.js';


@Component({
  selector: 'app-mypage-teacher',
  templateUrl: './mypage-teacher.component.html',
  styleUrls: ['./mypage-teacher.component.css']
})
export class MypageTeacherComponent implements OnInit {

  constructor(
    private router : Router,
    private snackBar: MatSnackBar,
    public userInfo:MatDialog,
    private phxChannel: PhxChannelService,
    private auth: AuthService,
    private uploader: FileUploadService,
    private renderer: Renderer2,
    

  ) {
    uploader.Resp.subscribe( data => {
      console.log(data);
      this.info.file = data;
    })
    phxChannel.Inst.subscribe( data => {
      console.log(data);
      this.info = {
        id: data.id,
        instId: data.inst.id,
        name: data.name,
        birth: data.birth,
        gender: data.gender,
        contact: data.contact,
        addr: data.addr,
        accType: data.inst.accType,
        bankName: data.inst.bankName,
        subaddr: data.subaddr,
        companyId: 0,
        reg: data.inst.reg,
        email: data.email,
        bankAcc: data.inst.bankAcc,
        career: data.inst.career,
        file: data.inst.file,
      };
      this.edus = data.grads;
      this.careers = data.cars;
      this.certs = data.certs;

      for ( let j = 0; j < data.causes.length; j++ ) {
        for ( let i = 0; i < this.cause.length; i++ ) {
          if (this.cause[i].name == data.causes[j].name) {
            this.cause[i] = data.causes[j];
          }
        }
      }
      for ( let j = 0; j < data.reacts.length; j++ ) {
        for ( let i = 0; i < this.react.length; i++ ) {
          if (this.react[i].name == data.reacts[j].name) {
            this.react[i] = data.reacts[j];
          }
        }
      }
      let today = new Date();
      this.lecture_end = [];
      this.lecture_yet = [];
      let lts = data.lectures.filter( el => el.inst != null );
      lts.forEach( el => {
        console.log(el);
        let idx = el.currs.length - 1;
        if( el.currs.length > 0 ) {
          if( el.currs[idx].date == null ) {
            this.lecture_yet.push(el);
          } else {
            let day = new Date(el.currs[idx].date).getTime()
            let firstday = new Date(el.currs[0].date).getTime()
            if( day + 1800000 > today.getTime()) {
              // 진행 예정 , 진행 중
              el.processText = '진행 예정';
              if(firstday < today.getTime()){
                el.processText = '진행 중';
              }
              // 버튼 생성
              for(var i=0; i< el.currs.length; i++){
                var time = new Date(el.currs[i].date).getTime();
                if(time - today.getTime() < 1800000){
                  if( el.currs[i].zoom == true ) {
                    if((today.getTime() - time) < 1800000) {
                      el.currs[i].set = true;
                    } else {
                      el.currs[i].set = false;
                    }
                  } else {
                    el.currs[i].set = false;
                  }
                  // el.currs[i].set = true;
                }
                else {
                  el.currs[i].set = false;
                }
              }
              this.lecture_yet.push(el);
            } else {
              this.lecture_end.push(el);
            }
          }
        } else {
          el.processText = '진행 예정';
          this.lecture_yet.push(el);
        }
      })
      console.log( this.lecture_yet, this.lecture_end );
      // console.log(data);
      // console.log(this.info);
    })
  }

  ngOnInit(): void {
    this.uploader.listen( document.getElementById('file') );
    this.info = JSON.parse(this.auth.getUserData());
    console.log(this.info);
    this.phxChannel.get('inst', this.info);
  }
  @ViewChild('daum_popup', { read: ElementRef, static: true }) popup: ElementRef;


  info: any = {
    uname: '',
    pwd: '',
    name: '',
    gender: '',
    contact: '',
    addr: '',
    accType: '',
    bankName: '',
    companyId: 0,
    bankAcc: '',
    career: '',
    passed: false,
    type: true,
    file: 'unknown.jpg',
  }
  lecture_end = [];
  lecture_yet = [];
  
  eduFace: any = { level: '', coll: '', dep: '', grad: null, status: '' };
  certFace: any = { agency: '', name: '', level: '', code: '', date: null };
  careerFace: any = { start: null, end: null, name: '', form: '', count: null };
  edus: any[] = [];
  certs: any[] = [];
  careers: any[] = [];

  cause = cause;
  react = react;
  filePath = Environment.filePath;

  

  banks = Banks;
  genders = selGender;
  accTypes = selAccountType;
  levels = selLevel;
  collStat = selCollStat;
  pwdRule:any = {
    word:'',
    color:'',
  }
  pwdChk:any = {
    correct:null,
    word:'',
    color:'',
  };

  changePassword(e:Event){
    var button =(e.target as HTMLElement);
    console.log(button)
    var password = button.closest('div').getElementsByTagName('input')[0] as HTMLInputElement;
    console.log(password)
    if(confirm('비밀번호를 변경하시겠습니까?')){
      password.style.display ='block';
      button.style.display = 'none';
    }
  }
  showPicture(event : Event){
    var reader = new FileReader();
    var imgBox = document.getElementsByClassName('fakeUpload')[0] as HTMLElement;
    console.log(imgBox);
    var file = (event.target as HTMLInputElement).files[0];
    imgBox.style.background = 'no-repeat center center / contain';
    reader.onload = function(e){
      imgBox.style.backgroundImage ='url('+reader.result+')';
      imgBox.innerHTML = "";
    }
    reader.readAsDataURL(file);
  }
  tabclick(a:Event){
    var thistab = a.target as HTMLElement;
    var tabs = document.querySelectorAll('.tabBox li');
    var contents = document.querySelectorAll('.tabContentBox');
    for(var i=0; i<tabs.length; i++){
      tabs[i].classList.remove('on')
      contents[i].classList.remove('hidden')
      contents[i].classList.add('hidden')
      if(thistab == tabs[i]){
        contents[i].classList.remove('hidden')
      }
    }
    thistab.classList.add('on')
  }
  nextBtn(b:Event){
    var mother = (b.target as HTMLElement).closest('.tabContentBox')
    var contents = document.querySelectorAll('.tabContentBox');
    var tabs = document.querySelectorAll('.tabBox li');
    for(var i=0; i<contents.length; i++){
      tabs[i].classList.remove('on')
      contents[i].classList.remove('hidden')
      contents[i].classList.add('hidden')
    }
    for(var i=0; i<contents.length; i++){
      if(contents[i] == mother){
        tabs[i+1].classList.add('on')
        contents[i+1].classList.remove('hidden')
      }
    }
  }
  educhk(m:Event){
    var thischk = m.target as HTMLInputElement;
    var fakeBox = thischk.closest('.chkBox') as HTMLElement;
    var inputText = thischk.closest('div')?.querySelector('input[type="text"]') as HTMLInputElement;
    if(thischk.checked == true){
      fakeBox.classList.add('checked')
      inputText.disabled = false;
    }
    else{
      fakeBox.classList.remove('checked');
      inputText.disabled = true;
    }
  }
  showStudent(e:Event){
    var showStudent = (e.target as HTMLElement);
    var innerCard = showStudent.closest('.innerCard') as HTMLElement;
    var listTable = innerCard.getElementsByClassName('studentList')[0] as HTMLElement;
    listTable.classList.remove('hidden');
  }
  hideStudent(e:Event){
    var hideStudent = (e.target as HTMLElement);
    var innerCard = hideStudent.closest('.innerCard') as HTMLElement;
    var listTable = innerCard.getElementsByClassName('studentList')[0] as HTMLElement;
    listTable.classList.add('hidden');
  }

  addEdu() {
    if( this.edus.length < 3 ) {
      this.edus.push({ level: '', coll: '', dep: '', grad: null, status: '' });
    }
  }
  addcer() {
    this.certs.push({ agency: '', name: '', level: '', code: '', date: null });
  }
  addcar() {
    this.careers.push({ start: null, end: null, name: '', form: '', count: null });
  }
  removeEdu(value: any){
    const index: number = this.edus.indexOf(value);
    this.edus.splice(index, 1);
  }
  removeCer(value:any){
    const index: number = this.certs.indexOf(value);
    this.certs.splice(index, 1);
  }
  removeCar(value:any){
    const index: number = this.careers.indexOf(value);
    this.careers.splice(index, 1);
  }
  // showadd(obj){
  //   const dialogRef = this.dialog.open(AddressComponent);
  // }
  openSnakbar(text , btn){
    this.snackBar.open(text,btn, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snack-bar',
    })

  }
  click() {
    if ( this.info.pwd == undefined || this.info.pwd == '' ) {
      delete this.info.pwd;
    } else {
      if(this.info.pwd.length > 20 || this.info.pwd.length< 8 ){
        alert('비밀번호는 8자리 이상, 20자리 이하로 만들어야 합니다.');
        return;
      }
    }
    if(this.info.file == '' || !this.info.name || !this.info.birth || !this.info.contact || !this.info.addr || !this.info.subaddr || !this.info.email || !this.info.gender || !this.info.accType || !this.info.bankName || !this.info.bankAcc || !this.info.reg) {
      this.openSnakbar('필수 항목을 입력해주세요','닫기');
      // alert('필수 항목을 입력해주세요');
    } else {
      this.info.edus = this.edus;
      this.info.certs = this.certs;
      this.info.careers = this.careers;
      const cau = this.cause.filter( data => data.completed == true );
      const rea = this.react.filter( data => data.completed == true );
      this.info.cause = cau;
      this.info.react = rea;
      console.log(this.info);
      this.phxChannel.up('inst', this.info);
      alert('변경이 완료되었습니다.')
      location.reload();
    }
  }
  changePw() {
    var pwdchkTag = document.getElementsByClassName('pwdChkPart')[0] as HTMLElement;
    var pwdtag = document.getElementsByClassName('pwdParts')[0] as HTMLElement;
    var thisButton = document.getElementsByClassName('changePwd')[0] as HTMLElement;
    if( thisButton.classList.contains('tryToChange')){
      pwdtag.hidden = false;
      pwdchkTag.hidden = false;
      thisButton.classList.remove('tryToChange');
      thisButton.classList.add('changeCancel');
      thisButton.textContent ='변경 취소';
    }
    else {
      pwdtag.hidden = true;
      (pwdtag.getElementsByTagName('input')[0] as HTMLInputElement).value = '';
      pwdchkTag.hidden = true;
      (pwdchkTag.getElementsByTagName('input')[0] as HTMLInputElement).value = '';
      thisButton.classList.remove('changeCancel');
      thisButton.classList.add('tryToChange');
      thisButton.textContent ='비밀번호 변경';
    }
  }
  passChk() {
    if(this.pwdChk.correct == this.info.pwd){
      this.pwdChk.word = '비밀번호가 일치합니다.';
      this.pwdChk.color = 'green';
    }
    else{
      this.pwdChk.word = '비밀번호가 일치하지 않습니다.';
      this.pwdChk.color = 'red';
    }
  }
  pwdLength(e:Event){
    var input = (e.target) as HTMLInputElement;
    if(input.value.length < 8 || input.value.length > 20) {
      this.pwdRule.word = '비밀번호는 8자리 이상, 20자리 이하 이어야 합니다.';
      this.pwdRule.color = 'red';
    }
    else{
      this.pwdRule.word = '사용가능한 비밀번호 입니다.';
      this.pwdRule.color = 'green';
    }
    console.log(this.pwdRule.word)
  }
  addr() {
    postcode( this.renderer, this.popup.nativeElement, data => {
      this.info.addr = `(${data.zonecode}) ${data.roadAddress}`;
    })
  }
  close() {
    this.renderer.setStyle(this.popup.nativeElement, 'display', 'none');
  }
  popupRemove(e:Event){
    var thisClickTag = e.target as HTMLElement;
    var basicInfo = document.getElementsByClassName('basicInfo')[0] as HTMLElement;
    var outside = document.getElementsByClassName('wrap')[0] as HTMLElement;
    if(thisClickTag == outside || thisClickTag == basicInfo ){
        this.close();
    }
  }
  warning = 0;
  infoShow(info) {
    if(this.warning == 0){
      if(
        confirm(`개인의 신원정보를 업무 외 용도로 이용하거나 , 제 3자에 노출할 경우 개인정보법에 의거하여 처벌받을 수 있음을 알려드립니다.\n 상세정보를 확인하시겠습니까?`)
      ){
        this.warning = 1;
        const userInfo = this.userInfo.open(UserInfoComponent,{
          data:{data:info}
        });
      }
      else{
        return;
      }
    }
    else{
      const userInfo = this.userInfo.open(UserInfoComponent,{
        data:{data:info}
      });
    }
    
  }
  goLive(id) {
    if(confirm('라이브 수업을 시작하시겠습니까?')){
      this.router.navigate(['/broadcast/'+id]);
    }
  }
}
