import { Component, OnInit , AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PhxChannelService } from 'src/app/service/phx-channel.service';
import { MatCarouselSlide, MatCarouselSlideComponent } from '@ngmodule/material-carousel';
import { Environment } from 'src/app/environment/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnDestroy, AfterViewInit {

  constructor(
    private router: Router,
    private phxChannel: PhxChannelService,
  ) {
    phxChannel.LecturesToday.subscribe( data => {
      console.log(data.body)
      this.todayClass = data.body
      setInterval(()=>{
        for(var i=0; i<this.todayClass.length; i++){
        
          // 날짜 계산
          var liveTime = new Date(Date.parse(data.body[i].date)).getTime()/1000;
          var calTime = new Date((liveTime - new Date().getTime()/1000)*1000);
          
          let hours = Math.floor((Number(calTime) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let mins = Math.floor((Number(calTime) % (1000 * 60 * 60)) / (1000 * 60));
          let secs = Math.floor((Number(calTime) % (1000 * 60)) / 1000);
          var remain ='시작까지 '+hours+':'+mins+":"+secs;
          if(hours < 0 || mins <0 || secs < 0){
            remain = '종료됨'
            this.todayClass[i].remains = remain;
          }
          else{
            this.todayClass[i].remains = remain;
          }
        }
      },1000)
      
      for(var i=0; i<this.todayClass.length; i++){
        if ( this.todayClass[i].lecture[0].interests == '연애결혼' || this.todayClass[i].lecture[0].interests == '자녀양육' || this.todayClass[i].lecture[0].interests == '부부/가족관계' || this.todayClass[i].lecture[0].interests == '인생 2막' ) {
          this.todayClass[i].color = '#DD5E5E';
        } else if ( this.todayClass[i].lecture[0].interests == '대인관계' || this.todayClass[i].lecture[0].interests == '커뮤니케이션' || this.todayClass[i].lecture[0].interests == '리더십' || this.todayClass[i].lecture[0].interests == '조직적응' ) {
          this.todayClass[i].color = '#3EB3E7';
        } else if ( this.todayClass[i].lecture[0].interests == '명상요가' || this.todayClass[i].lecture[0].interests == '몸마음건강' || this.todayClass[i].lecture[0].interests == '예술 치유' || this.todayClass[i].lecture[0].interests == '힐링 DIY' ) {
          this.todayClass[i].color = '#0AD1D1';
        } else if ( this.todayClass[i].lecture[0].interests == '자기 이해' || this.todayClass[i].lecture[0].interests == '심리 특강' ) {
          this.todayClass[i].color = '#B775EF';
        }
        // this.todayClass[i].color = '#66cccc';
      }
      console.log(this.todayClass)
    })
    phxChannel.Lectures.subscribe( data => {
      // console.log(data);

    })

    phxChannel.LectureControled.subscribe( data => {
      console.log(data.body);
      // 메인
      if ( data.body.main1.length > 0 ) {
        this.mainClass.push(data.body.main1);
      }
      if ( data.body.main2.length > 0 ) {
        this.mainClass.push(data.body.main2);
      }
      var mainLength = this.mainClass.length;
      for(var i=0; i<mainLength; i++){
        // 온도추가
        var degree = this.mainClass[i][0].receipts.length/this.mainClass[i][0].least *100;
        this.mainClass[i].push({deg:degree})
        // 남은날짜
        var liveTime = new Date(Date.parse(this.mainClass[i][0].dday)).getTime()/1000;
        var calTime = new Date((liveTime - new Date().getTime()/1000)*1000);
        let days = Math.floor(Number(calTime) / (1000 * 60 * 60 * 24));
        if(days >= 0){
          var remaindays = days+"일 남음";
        }
        else{
          var remaindays = '종료됨';
        }
        this.mainClass[i].push({remain:remaindays});
        

      }
      // 오픈 예정
      if ( data.body.open1.length > 0 ) {
        this.preopenClass.push(data.body.open1);
      }
      if ( data.body.open2.length > 0 ) {
        this.preopenClass.push(data.body.open2);
      }
      // top 라이브
      if ( data.body.top1.length > 0 ) {
        this.topClass.push({data:data.body.top1[0],idn:1})
      }
      if ( data.body.top2.length > 0 ) {
        this.topClass.push({data:data.body.top2[0],idn:2})
      }
      if ( data.body.top3.length > 0 ) {
        this.topClass.push({data:data.body.top3[0],idn:3})
      }
      if ( data.body.top4.length > 0 ) {
        this.topClass.push({data:data.body.top4[0],idn:4})
      }
      if ( data.body.top5.length > 0 ) {
        this.topClass.push({data:data.body.top5[0],idn:5})
      }
      if ( data.body.top6.length > 0 ) {
        this.topClass.push({data:data.body.top6[0],idn:6})
      }
      if ( data.body.top7.length > 0 ) {
        this.topClass.push({data:data.body.top7[0],idn:7})
      }
      if ( data.body.top8.length > 0 ) {
        this.topClass.push({data:data.body.top8[0],idn:8})
      }
      if ( data.body.top9.length > 0 ) {
        this.topClass.push({data:data.body.top9[0],idn:9})
      }
      if ( data.body.top10.length > 0 ) {
        this.topClass.push({data:data.body.top10[0],idn:10})
      }
      
      console.log(this.topClass)
    })

  }
  ngAfterViewInit(): void {
    var dot = document.getElementsByClassName('dot');
    var dotWrap = document.getElementsByClassName('dotWrap')[0] as HTMLElement;
    var wrapWidth = dot.length*16;
    dotWrap.style.left = 'calc(50% - '+(wrapWidth/2)+'px)';
    
    var tempBar = document.getElementsByClassName('tempDynamic');
    for(var i=0; i<tempBar.length; i++){
      var degree = tempBar[i].textContent
      if(degree !==''){
        if(Number(degree) > 100 ){
        (tempBar[i] as HTMLElement).style.width = 450 + 'px';
        }
        else{
          (tempBar[i] as HTMLElement).style.width = 4.5*Number(degree) + 'px';
        }
      }
    }

    this.int_remainTime = setInterval(()=>{
      // this.remainTime();
    },1000)

    this.remainDate();
    this.autoSlide = setInterval(()=>{this.slideLeft()},5000)

    this.phxChannel.gets('lecture:today', '');
    this.phxChannel.gets('lecture', '');
    this.phxChannel.gets('lecture:controled', '');
// 오늘라이브 없을시에
    var isthere = document.getElementsByClassName('isthere');
    var content = document.querySelectorAll('.today .content');

  }

  ngOnDestroy(): void {
    clearInterval(this.int_remainTime);
    clearInterval(this.autoSlide);
  }
  filePath = Environment.filePath;
  mainClass=[];
  preopenClass=[];
  topClass=[];
  todayClass=[{ remains: null, lecture: [{ open: false, id:null,name: '', inst: { name: '' }, thumbnail1: '', title: '', subtitle: '',interests:''}], date: null, color: '' ,open:undefined}];
  int_remainTime;

  
  // 마음도씨  fake data 
  dcs = [
    {time:'2월 12일 FRI - PM 3시 30분',time2:'2021-02-12 15:30', during: '90분',title : '바쁠수록 차분하게, 마음챙김 영상',img:"../../../assets/images/banner/yoga1.png", allRound:3, nowRound:1, degree : 80, text : '각종 가공 플라워를 이용한 힐링 프로그램'},
    {time:'2월 15일 MON - PM 3시 30분',time2:'2021-02-15 15:30', during: '90분',title : '바쁠수록 차분하게, 마음챙김 영상',img:"../../../assets/images/banner/yoga1.png", allRound:0, nowRound:0, degree : 80, text : '각종 가공 플라워를 이용한 힐링 프로그램'},
    {time:'2월 12일 FRI - PM 3시 30분',time2:'2021-02-12 15:30', during: '90분',title : '바쁠수록 차분하게, 마음챙김 영상',img:"../../../assets/images/banner/yoga1.png", allRound:3, nowRound:1, degree : 80, text : '각종 가공 플라워를 이용한 힐링 프로그램'},
    {time:'2월 15일 MON - PM 3시 30분',time2:'2021-02-15 15:30', during: '90분',title : '바쁠수록 차분하게, 마음챙김 영상',img:"../../../assets/images/banner/yoga1.png", allRound:0, nowRound:0, degree : 80, text : '각종 가공 플라워를 이용한 힐링 프로그램'},

  ]
   // 오픈예정  fake data 
   pre = [
    {time:'OPEN 예정 ',during: '90분',title : '바쁠수록 차분하게, 마음챙김 영상',img:"../../../assets/images/banner/open.png", degree : 80, text : '각종 가공 플라워를 이용한 힐링 프로그램'},
    {time:'OPEN 예정',during: '90분',title : '바쁠수록 차분하게, 마음챙김 영상',img:"../../../assets/images/banner/flower.png", degree : 80, text : '각종 가공 플라워를 이용한 힐링 프로그램'},
    {time:'OPEN 예정 ',during: '90분',title : '바쁠수록 차분하게, 마음챙김 영상',img:"../../../assets/images/banner/open.png", degree : 80, text : '각종 가공 플라워를 이용한 힐링 프로그램'},
    {time:'OPEN 예정',during: '90분',title : '바쁠수록 차분하게, 마음챙김 영상',img:"../../../assets/images/banner/flower.png", degree : 80, text : '각종 가공 플라워를 이용한 힐링 프로그램'},

  ]

  // 오늘의 라이브 fake data
  todayLive = [
    {time2:'2021-02-15 16:00',year:'2021',day:'15', monthName:'February',teacher:'황신혜' ,title : '바쁠수록 차분하게, 마음챙김 영상',tagimg:"../../../assets/images/icon/subject1.png", img:'../../../assets/images/banner/todayLive1.png', text : '바쁘고 복잡한 세상 속에서도 마음은 고요하게, 머리를 맑게',color:'#66cccc', thema:'힐링'},
    {time2:'2021-02-25 16:00',year:'2021',day:'25', monthName:'February',teacher:'김신혜' ,title : '바쁘니까 밤새도록, 마음상함 영상',tagimg:"../../../assets/images/icon/subject2.png", img:'../../../assets/images/banner/saveMental.png', text : '바쁘고 복잡한 세상 속에서도 마음은 고요하게, 머리를 맑게',color:'#B08FCC',thema:'인생여정'},
  ]
  // 이달의 TOp 라이브
  monthLive = [
    {number:1,img:'../../../assets/images/banner/list1.png',title:'꿀잠 프로젝트-솔솔', text:'생각 스위치 끄고, 쉼으로 충전하기'},
    {number:2,img:'../../../assets/images/banner/list2.png',title:'상자를 설득하는 말하기 스킬', text:'까칠한 상사를 내편으로 만드는 말습관'},
    {number:3,img:'../../../assets/images/banner/list3.png',title:'이움 홈트', text:'몸과 마음의 이완과 움직임을 통한 건강관리 홈 트레이닝'},
    {number:4,img:'../../../assets/images/banner/list4.png',title:'플라워 디퓨저', text:'각종 가공 플라워를 이용한 힐링 프로그램'},
    {number:5,img:'../../../assets/images/banner/list5.png',title:'컬러테라피', text:'컬러로 알아보는 나의 마음여행'},
    {number:6,img:'../../../assets/images/banner/list6.png',title:'꿀잠 프로젝트-솔솔', text:'생각 스위치 끄고, 쉼으로 충전하기'},
    {number:7,img:'../../../assets/images/banner/list7.png',title:'상자를 설득하는 말하기 스킬', text:'까칠한 상사를 내편으로 만드는 말습관'},
    {number:8,img:'../../../assets/images/banner/list8.png',title:'이움 홈트', text:'몸과 마음의 이완과 움직임을 통한 건강관리 홈 트레이닝'},
    {number:9,img:'../../../assets/images/banner/list9.png',title:'플라워 디퓨저', text:'각종 가공 플라워를 이용한 힐링 프로그램'},
    {number:10,img:'../../../assets/images/banner/list10.png',title:'컬러테라피', text:'컬러로 알아보는 나의 마음여행'},
  ]
//   .month .contentBox div:nth-child(1) .img {
//     background: url(../../../assets/images/banner/list1.png) no-repeat center center / cover;
// }
// .month .contentBox div:nth-child(2) .img {
//     background: url(../../../assets/images/banner/list2.png) no-repeat center center / cover;
// }
// .month .contentBox div:nth-child(3) .img {
//     background: url(../../../assets/images/banner/list3.png) no-repeat center center / cover;
// }
// .month .contentBox div:nth-child(4) .img {
//     background: url(../../../assets/images/banner/list4.png) no-repeat center center / cover;
// }
// .month .contentBox div:nth-child(5) .img {
//     background: url(../../../assets/images/banner/list5.png) no-repeat center center / cover;
// }

  // monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  callTime :any;
  remainDays : any;
  // 타이머 기준 시간 
  liveTime1 = new Date(Date.parse('2021-02-15 16:00')).getTime()/1000;
  liveTime2 = new Date(Date.parse('2021-02-20 16:00')).getTime()/1000;
  autoSlide;
  
  curIndex = 0;
  bannerCount = 0;
  bannerCount2 = 0;
  bannerCount3 = 0;

  slideLeft(){
    this.curIndex ++;
    var slideBody = document.getElementsByClassName('slideBody')[0] as HTMLElement;
    var slideList = slideBody.getElementsByTagName('li');
    var dot = document.getElementsByClassName('dot');
    if(this.curIndex == slideList.length){
      this.curIndex = 0;
      slideBody.style.marginLeft = '0';
      for(var i=0; i<dot.length;i++){
        dot[i].classList.remove('show')
      }
      dot[0].classList.add('show')
    }
    else{
      slideBody.style.transition = 'left , 0.5s';
      slideBody.style.marginLeft = -100*this.curIndex + '%';
      for(var i=0; i<dot.length;i++){
        dot[i].classList.remove('show')
      }
      dot[this.curIndex].classList.add('show')
    }
  }
  // 배너 슬라이드
  bannerSliderRight(){
    this.bannerCount ++;
    var bannerBody = document.querySelector('.nowlive .innerWrap .banner') as HTMLElement;
    var bannerList = bannerBody.getElementsByClassName('clive');
    if(this.bannerCount == bannerList.length){
      this.bannerCount = 0;
      bannerBody.style.marginLeft = '0';
    }
    else{
      bannerBody.style.transition = 'left , 0.5s';
      bannerBody.style.marginLeft = -100*this.bannerCount + '%';
    }
  }
  bannerSliderLeft(){
    var bannerBody = document.querySelector('.nowlive .innerWrap .banner') as HTMLElement;
    var bannerList = bannerBody.getElementsByClassName('clive');
    if(this.bannerCount == 0){
      this.bannerCount = bannerList.length - 1;
      bannerBody.style.transition = 'left , 0.5s';
      bannerBody.style.marginLeft = -100*this.bannerCount + '%';
    }
    else{
      this.bannerCount --;
      bannerBody.style.transition = 'left , 0.5s';
      bannerBody.style.marginLeft = -100*this.bannerCount + "%";
    }
  }
  bannerSliderRight2(){
    this.bannerCount2 ++;
    var bannerBody = document.querySelector('.preopen .innerWrap .banner') as HTMLElement;
    var bannerList = bannerBody.getElementsByClassName('pre');
    if(this.bannerCount2 == bannerList.length){
      this.bannerCount2 = 0;
      bannerBody.style.marginLeft = '0';
    }
    else{
      bannerBody.style.transition = 'left , 0.5s';
      bannerBody.style.marginLeft = -100*this.bannerCount2 + '%';
    }
  }
  bannerSliderLeft2(){
    
    var bannerBody = document.querySelector('.preopen .innerWrap .banner') as HTMLElement;
    var bannerList = bannerBody.getElementsByClassName('pre');
    if(this.bannerCount2 == 0){
      this.bannerCount2 = bannerList.length -1;
      bannerBody.style.transition = 'left , 0.5s';
      bannerBody.style.marginLeft = -100*this.bannerCount2 + '%';
    }
    else{
      this.bannerCount2 --;
      bannerBody.style.transition = 'left , 0.5s';
      bannerBody.style.marginLeft = -100*this.bannerCount2+ "%";
    }
  }
  bannerSliderRight3(){
    this.bannerCount3 ++;
    var bannerBody = document.querySelector('.today .innerWrap .banner') as HTMLElement;
    var bannerList = bannerBody.getElementsByClassName('isthere');
    if(this.bannerCount3 == bannerList.length){
      this.bannerCount3 = 0;
      bannerBody.style.marginLeft = '0';
    }
    else{
      bannerBody.style.transition = 'left , 0.5s';
      bannerBody.style.marginLeft = -100*this.bannerCount3 + '%';
    }
  }
  bannerSliderLeft3(){
    var bannerBody = document.querySelector('.today .innerWrap .banner') as HTMLElement;
    var bannerList = bannerBody.getElementsByClassName('isthere');
    if(this.bannerCount3 == 0){
      this.bannerCount3 = bannerList.length -1;
      bannerBody.style.transition = 'left , 0.5s';
      bannerBody.style.marginLeft = -100*this.bannerCount3 + '%';
    }
    else{
      this.bannerCount3 --;
      bannerBody.style.transition = 'left , 0.5s';
      bannerBody.style.marginLeft = -100*this.bannerCount3+ "%";
    }
  }
  dotClick(e:Event){
    var thisDot = e.target as HTMLElement;
    var idx:any ;
    var dot = document.getElementsByClassName('dot');
    for(var i=0; i<dot.length;i++){
      if( thisDot == dot[i]){
        idx = i;
      }
    }
    this.curIndex = idx - 1;
    clearInterval(this.autoSlide)
    this.slideLeft();
    this.autoSlide = setInterval(()=>{this.slideLeft()},5000)
  }

  
  remainDate(){
    var classdate = document.getElementsByClassName('classdate');
    var remainDays = document.getElementsByClassName('remainDays');
    var remain;

    for(var i =0; i<classdate.length; i++){
      var time = (classdate[i] as HTMLElement).textContent;
      var liveTime = new Date(Date.parse(time)).getTime()/1000;
      var calTime = new Date((liveTime - new Date().getTime()/1000)*1000);
      if (Number(calTime) >= 0) {
        let days = Math.floor(Number(calTime) / (1000 * 60 * 60 * 24));
        let hours = Math.floor((Number(calTime) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let mins = Math.floor((Number(calTime) % (1000 * 60 * 60)) / (1000 * 60));
        let secs = Math.floor((Number(calTime) % (1000 * 60)) / 1000);
        remainDays[i].textContent = days+"";
      }
    }
  }
  // remainTime(){
  //   var tlength = this.todayLive.length;
  //   for(var i =0; i<tlength; i++){
  //     var time = this.todayLive[i].time2;
  //     var remainTime = document.getElementsByClassName('time');
  //     var classYear = document.getElementsByClassName('year');
  //     var classDay = document.getElementsByClassName('day');
  //     classYear[i].textContent = new Date(this.todayLive[i].time2).getFullYear().toString();
  //     classDay[i].textContent = ('00'+new Date(this.todayLive[i].time2).getDate()).slice(-2);
  //     var liveTime = new Date(Date.parse(time)).getTime()/1000;
  //     var calTime = new Date((liveTime - new Date().getTime()/1000)*1000);
  //     if (Number(calTime) >= 0) {
  //       let days = Math.floor(Number(calTime) / (1000 * 60 * 60 * 24));
  //       let hours = Math.floor((Number(calTime) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //       let mins = Math.floor((Number(calTime) % (1000 * 60 * 60)) / (1000 * 60));
  //       let secs = Math.floor((Number(calTime) % (1000 * 60)) / 1000);
  //       remainTime[i].textContent = (days*24)+Number(('00'+hours).slice(-2))+":"+ 
  //       ('00'+mins).slice(-2)+":" +
  //       ('00'+secs).slice(-2);
  //     }
  //   }
  // }
}
