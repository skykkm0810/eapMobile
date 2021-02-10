import { Component, ElementRef, OnInit, Renderer2, ViewChild, ɵɵresolveBody } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { Agreement, INTERESTS, react, cause, Banks, selAccountType, selCollStat, selGender, selLevel } from '../../interface/interface';
import { PhxChannelService } from '../../service/phx-channel.service';
import { SocketioService } from '../../service/socketio.service';
import { postcode } from 'src/assets/js/postcode.js';
import { MatDialog } from '@angular/material/dialog';
import { AddressComponent } from '../../modal/address/address.component';
import { FileUploadService } from '../../service/file-upload.service';
import { Environment } from 'src/app/environment/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-join-teacher',
  templateUrl: './join-teacher.component.html',
  styleUrls: ['./join-teacher.component.css']
})
export class JoinTeacherComponent implements OnInit {

  constructor(
    private phxChannel: PhxChannelService,
    private router: Router,
    private mailer: SocketioService,
    private auth: AuthService,
    public dialog:MatDialog,
    private renderer: Renderer2,
    private uploader: FileUploadService,
  ) {
    phxChannel.InstUp.subscribe( data => {
      // console.log(data);
      auth.setToken(data.body);
      window.location.href = '/';
    })
    phxChannel.Invalid.subscribe( data => {
      alert('아이디가 이미 존재합니다.')
    })
    uploader.Resp.subscribe( data => {
      this.info.file = data;
    })
  }

  ngOnInit(): void {
    this.uploader.listen( document.getElementById('file') );
  }

  agreement = Agreement;
  
  subscription: Subscription;
  
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

  filePath = Environment.filePath;
  interests = INTERESTS;
  emailCode : any = '초기값';
  companyCode : any = '초기값';
  eduFace: any = { level: '', coll: '', dep: '', grad: null, status: '' };
  certFace: any = { agency: '', name: '', level: '', code: '', date: null };
  careerFace: any = { start: null, end: null, name: '', form: '', count: null };
  edus: any[] = [];
  certs: any[] = [];
  careers: any[] = [];
  cause = cause;
  react = react;

  banks = Banks;
  genders = selGender;
  accTypes = selAccountType;
  levels = selLevel;
  collStat = selCollStat;
  @ViewChild('daum_popup', { read: ElementRef, static: true }) popup: ElementRef;
  
  showPicture(event : Event){
    console.log();
    var reader = new FileReader();
    var imgBox = document.getElementsByClassName('fakeUpload')[0] as HTMLElement;
    var file = (event.target as HTMLInputElement).files[0];
    imgBox.style.background = 'no-repeat center center / contain';
    reader.onload = function(e){
      imgBox.style.backgroundImage ='url('+reader.result+')';
      imgBox.innerHTML = "";
    }
    reader.readAsDataURL(file);
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
  removeEdu(value){
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
  showadd(obj){
    const dialogRef = this.dialog.open(AddressComponent);
  }
  allchk(e:Event){
    var thischk = e.target as HTMLElement;
    var chkshow = document.querySelectorAll('.agreeBox div .agreeHole');
    if(thischk.classList.contains('checked')){
      thischk.classList.remove('checked')
      for(var i=0; i<chkshow.length; i++){
        chkshow[i].classList.remove('checked');
        (chkshow[i].closest('label').querySelector('input') as HTMLInputElement).checked = false;
      }
    }
    else{
      thischk.classList.add('checked')
      for(var i=0; i<chkshow.length; i++){
        chkshow[i].classList.remove('checked');
        chkshow[i].classList.add('checked');
        (chkshow[i].closest('label').querySelector('input') as HTMLInputElement).checked = true;
      }
    }
  }
  onechk(m:Event){
    var thischk = m.currentTarget as HTMLElement;
    m.preventDefault();
    var allchk = document.querySelector('.agreeBox .allAgree .agreeHole') as HTMLInputElement;
    allchk.classList.remove('checked')
    if(thischk.classList.contains('checked')){
      thischk.classList.remove('checked');
      (thischk.closest('label').querySelector('input') as HTMLInputElement).checked = false;
    }
    else{
      thischk.classList.add('checked');
      (thischk.querySelector('input') as HTMLInputElement).checked = true;
    }
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
  beforeNext1(a:Event){
    var mother = (a.target as HTMLElement).closest('.tabContentBox') as HTMLElement;
    var neccesary = mother.getElementsByClassName('neccesary');
    for(var i=0; i<neccesary.length; i++){
      if(neccesary[i].getElementsByTagName('input')[0].checked == false){
        alert('필수 항목은 모두 체크 하셔야 이용 가능합니다.');
        return;
      }
    }
    this.nextBtn(a);
  }
  clear(a:Event){
    var clearInput = (a.target as HTMLElement).closest('div').getElementsByClassName('neccesary')[0] as HTMLInputElement
    var clearBox = (a.target as HTMLElement).closest('div')
    if( clearBox.classList.contains('mailCertifi') ){
      if(clearInput.value == this.emailCode){
        clearInput.classList.add('clear');
        alert('인증되었습니다.');
      }
      else{
        alert('인증코드가 맞지 않습니다.');
      }
    }
    else if (clearBox.classList.contains('companyCode')){
      if(clearInput.value == this.companyCode){
        clearInput.classList.add('clear')
        alert('인증되었습니다.');
      }
      else{
        alert('인증코드가 맞지 않습니다.');
      }
    }
  }
  beforeNext2(a:Event){
    var mother = (a.target as HTMLElement).closest('.tabContentBox') as HTMLElement;
    var neccesary = mother.getElementsByClassName('neccesary');
    var inpputs = mother.getElementsByTagName('input');
    // for(var i=0; i<inpputs.length; i++){
    //   if(!neccesary[0].classList.contains('clear')){
    //     alert('이메일 코드 인증 확인이 필요합니다.');
    //     return;
    //   }
    //   else if (!neccesary[0].classList.contains('clear')){
    //     alert('회사 코드 인증 확인이 필요합니다.');
    //     return; 
    //   }

    //   if(inpputs[i].value == ""){
    //     alert('모든 필수항목이 채워져 있어야합니다.');
    //     return;
    //   }
    // }
    
    this.nextBtn(a);
  }

  event3: any;
  beforeNext3(a:Event){
    this.event3 = a;
    var mother = (a.target as HTMLElement).closest('.tabContentBox') as HTMLElement;
    var neccesary = mother.getElementsByTagName('input');
    for(var i=0; i<neccesary.length; i++){
      if((neccesary[i] as HTMLInputElement).value == ''){
        alert('모든 필수 항목을 채워주셔야 이용 가능합니다.');
        return;
      }
    }
    this.reg();
    this.nextBtn(a);
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
  prevBtn(b:Event){
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
        tabs[i-1].classList.add('on')
        contents[i-1].classList.remove('hidden')
      }
    }
  }
  interestChk(m:Event){
    var thischk = m.target as HTMLInputElement;
    var fakebox = (thischk.closest('label') as HTMLElement).querySelector('span');
    m.preventDefault();
    if(thischk.checked == true){
      fakebox.classList.remove('checking');
      fakebox.classList.add('checking');
    }
    else{
      fakebox.classList.remove('checking');
    }
  }

  reg() {
    if ( !this.info.uname || !this.info.pwd || !this.info.name || !this.info.gender || !this.info.contact ) {
      alert('필수 항목을 입력해주세요');
    } else {
      this.info.edus = this.edus;
      this.info.certs = this.certs;
      this.info.careers = this.careers;
      const cau = this.cause.filter( data => data.completed == true );
      const rea = this.react.filter( data => data.completed == true );
      this.info.cause = cau;
      this.info.react = rea;
      console.log(this.info);
      this.phxChannel.send('inst', this.info);
    }
  }

  nochild() {
    this.info.child = '';
  }
  nomerry(){
    this.info.merry = '';
  }

  send() {
    const code = Math.round(Math.random()*899999) + 100000;
    const msg = { to: this.info.email, code: code }
    this.emailCode = code;
    console.log(msg);
    this.mailer.mailSend(msg);
    alert('메일을 확인해주세요');
  }

  addr() {
    postcode( this.renderer, this.popup.nativeElement, data => {
      console.log(data);
      this.info.addr = `(${data.zonecode}) ${data.roadAddress}`;
      console.log(this.info);
    })
  }
  close() {
    this.renderer.setStyle(this.popup.nativeElement, 'display', 'none');
  }
}
