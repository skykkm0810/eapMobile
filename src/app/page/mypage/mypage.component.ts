import { getLocaleDateTimeFormat } from '@angular/common';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, Renderer2, ViewChild, ɵɵresolveBody } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Environment } from 'src/app/environment/environment';
import { INTERESTS } from 'src/app/interface/interface';
import { AuthService } from 'src/app/service/auth.service';
import { PhxChannelService } from 'src/app/service/phx-channel.service';
import { postcode } from 'src/assets/js/postcode.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {

  constructor(
    private phxChannel: PhxChannelService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private router: Router,

  ) {
    phxChannel.User.subscribe( data => {
      this.user = data;
      this.user.companyId = this.user.company.id;
      console.log(this.user);
      let ints = this.interests;
      for ( let j = 0; j < data.interests.length; j++ ) {
        for ( let i = 0; i < this.interests.length; i++ ) {
          if (this.interests[i].name == data.interests[j].name) {
            this.interests[i] = data.interests[j];
          }
        }
      }
    })
    phxChannel.Receipts.subscribe( data => {
      console.log(data.body);
      let today = new Date();
      this.receipt_end = [];
      this.receipt_yet = [];
      data.body.forEach( el => {
        let yet = false;
        // console.log(el);
        if( el.lecture.length > 0 ) {
          let idx = el.lecture[0].currs.length;
          // console.log(idx);
          for(var i =0; i<idx; i++){
              
            if( el.lecture[0].currs[i].date == null ) {
              yet = true;
              el.lecture[0].currs[i].set = false;
            } else {
              let day = new Date(el.lecture[0].currs[i].date).getTime();
              console.log(day)
              if( day + 1800000 > today.getTime()) {
                if( el.lecture[0].currs[i].zoom == true ) {
                  if((day - today.getTime()) < 1800000) {
                    el.lecture[0].currs[i].set = true;
                  } else {
                    el.lecture[0].currs[i].set = false;
                  }
                } else {
                  el.lecture[0].currs[i].set = false;
                }
                yet = true;
              } else {
                yet = false;
              }
            }
          }
        } else {
          yet = true;  
        }
        if( yet ) {
          this.receipt_yet.push(el);
        } else {
          this.receipt_end.push(el);
        }
      })
      console.log(this.receipt_yet, this.receipt_end);
    })
    phxChannel.UserUp.subscribe( () => {
      window.location.reload();
    })

  }

  ngOnInit(): void {
    this.cred = this.route.snapshot.params;
    this.interests = INTERESTS;
    this.user = {
      id: 0,
      pwd: '',
      name: '',
      contact: '',
      addr: '',
      subaddr: '',
      birth: '',
      gender: '',
      child: '',
      merry: '',
      companyId: 0,
      company: { name: '', id: 0 },
      part: '',
      rank: '',
      spot: '',
      email: '',
      interests: [],
    };
    this.user.id = JSON.parse(this.auth.getUserData()).id;
    if ( this.user.id != this.cred.id ) {
      alert('잘못된 접근경로입니다.');
      window.location.href="/";
    } else {
      this.phxChannel.get('user', this.user);
      this.phxChannel.gets('receipt', this.user);
    }

  }


  @ViewChild('daum_popup', { read: ElementRef, static: true }) popup: ElementRef;

  cred;
  user;
  info;
  // 페이크데이터
  fake = [
    {num : 1000, 
      date:'2021-03-10', 
      title:'글자가넘어가나요?글자가넘어가나요?글자가넘어가나요?글자가넘어가나요?', 
      que:'이러저러어쩌구저쩌구이러저러어쩌구저쩌구이러저러어쩌구저쩌구이러저러어쩌구저쩌구이러저러어쩌구저쩌구',
      answer:'답변했씁니다.',
      process:'처리중'
     },
     {num : 2000, 
      date:'2021-03-11', 
      title:'글자가넘어가나요?글자가넘어가나요?글자가넘어가나요?글자가넘어가나요?', 
      que:'이러저러어쩌구저쩌구이러저러어쩌구저쩌구이러저러어쩌구저쩌구이러저러어쩌구저쩌구이러저러어쩌구저쩌구',
      answer:'답변했씁니다.',
      process:'미확인'
     },
     {num : 3000, 
      date:'2021-03-10', 
      title:'글자가넘아글쎄가나오?글자가넘어가나요?글자가넘어가나요?', 
      que:'이러저러어쩌구저쩌구이쩌러거이러저러어쩌구저쩌구이쩌러거이러저러어쩌구저쩌구이쩌러거이러저러어쩌구저쩌구이쩌러거이러저러어쩌구저쩌구이쩌러거',
      answer:'답변했씁니다.',
      process:'처리완료'
     }
  ]
  receipt_end = [
    {
      date: null,
      lecture: [{
        id: null,
        currs: [{ id: null, set: false, date: null, dur: 0, stage: 1, title: ''}],
        title: '',
        thumbnail1: '',
      }]
    }
  ];
  receipt_yet = [
    {
      date: null,
      lecture: [{
        id: null,
        currs: [{ id: null, set: false, date: null, dur: 0, stage: 1, title: ''}],
        title: '',
        thumbnail1: '',
      }]
    }
  ];

  interests;
  filePath = Environment.filePath;
  pwdRule:any = {
    word:'',
    color:'',
  }
  pwdChk:any = {
    correct:null,
    word:'',
    color:'',
  };
  buttonON = 0;

  allchk(e:Event){
    var thischk = e.target as HTMLElement;
    var chkshow = document.querySelectorAll('.agreeBox div .agreeHole');
    if(thischk.classList.contains('checked')){
      thischk.classList.remove('checked')
      for(var i=0; i<chkshow.length; i++){
        chkshow[i].classList.remove('checked');
        (chkshow[i].querySelector('input') as HTMLInputElement).checked = false;
      }
    }
    else{
      thischk.classList.add('checked')
      for(var i=0; i<chkshow.length; i++){
        chkshow[i].classList.remove('checked');
        chkshow[i].classList.add('checked');
        (chkshow[i].querySelector('input') as HTMLInputElement).checked = true;
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
      (thischk.querySelector('input') as HTMLInputElement).checked = false;
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
  interestChk(m:Event){
    var thischk = m.currentTarget as HTMLElement;
    m.preventDefault();
    if(thischk.classList.contains('checking')){
      thischk.classList.remove('checking');
      (thischk.querySelector('input') as HTMLInputElement).checked = false;
    }
    else{
      thischk.classList.add('checking');
      (thischk.querySelector('input') as HTMLInputElement).checked = true;
    }
  }
  click() {
    if ( this.user.pwd == undefined || this.user.pwd == '' ) {
      delete this.user.pwd;
    } else {
      if(this.user.pwd.length > 20 || this.user.pwd.length< 8 ){
        alert('비밀번호는 8자리 이상, 20자리 이하로 만들어야 합니다.');
        return;
      }
    }
    const inter = this.interests.filter( data => data.completed == true );
    this.user.interests = inter;
    this.phxChannel.up('user', this.user);
  }

  check( el ) {
    el.completed = !el.completed;
    console.log(el);
  }
  nochild() {
    this.user.child = '';
  }
  nomerry(){
    this.user.merry = '';
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
    if(this.pwdChk.correct == this.user.pwd){
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
      this.user.addr = `(${data.zonecode}) ${data.roadAddress}`;
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
  goLive(id) {
    if(confirm('라이브 수업을 시작하시겠습니까?')){
      this.router.navigate(['/broadcast/'+id]);
    }
  }
  showInq(e:Event){
    let thisTag = e.target as HTMLElement;
    let viewBox = thisTag.closest('td').getElementsByClassName('inqBox')[0] as HTMLElement;
    console.log(viewBox)
    if(thisTag.classList.contains('rotate')){
      thisTag.classList.remove('rotate');
      viewBox.classList.add('hidden');
    }
    else {
      thisTag.classList.add('rotate');
      viewBox.classList.remove('hidden');
    }
  }
}
