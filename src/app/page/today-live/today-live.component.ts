import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from 'src/app/environment/environment';
import { PhxChannelService } from 'src/app/service/phx-channel.service';
import { CATEGORY } from '../../interface/interface';

@Component({
  selector: 'app-today-live',
  templateUrl: './today-live.component.html',
  styleUrls: ['./today-live.component.css']
})
export class TodayLiveComponent implements AfterViewInit {

  constructor(
    private phxChannel: PhxChannelService,
    private router: Router
  ) {
    phxChannel.LecturesToday.subscribe( data => {
      this.info = [];
      console.log(data.body);
      data.body.forEach( el => {
        // let time = new Date().getTime();
        // if( el.lecture[0].currs.length > 0 ) {
        //   let datatime = new Date(el.lecture[0].currs[0].date).getTime();
        //   if( datatime > time ){
        //     el.process = '예정';
        //   } else {
        //     el.process = '진행';
        //   }
        // }
        // console.log(el)

        // 카테고리
        if ( el.lecture[0].interests == '연애결혼' || el.lecture[0].interests == '자녀양육' || el.lecture[0].interests == '부부/가족관계' || el.lecture[0].interests == '인생 2막' ) {
          el.lecture[0].color = '#DD5E5E'; el.lecture[0].maincategory = '인생여정';
        } else if ( el.lecture[0].interests == '대인관계' || el.lecture[0].interests == '커뮤니케이션' || el.lecture[0].interests == '리더십' || el.lecture[0].interests == '조직적응' ) {
          el.lecture[0].color = '#3EB3E7'; el.lecture[0].maincategory = '사회생활';
        } else if ( el.lecture[0].interests == '명상요가' || el.lecture[0].interests == '몸마음건강' || el.lecture[0].interests == '예술치유' || el.lecture[0].interests == '힐링 DIY' ) {
          el.lecture[0].color = '#0AD1D1'; el.lecture[0].maincategory = '힐링';
        } else if ( el.lecture[0].interests == '자기 이해' || el.lecture[0].interests == '심리 특강' ) {
          el.lecture[0].color = '#B775EF'; el.lecture[0].maincategory = '심리';
        }

        // 온도
        if(el.least == null || el.least == undefined){
          el.degree = '0';
        }
        else{
          el.degree = Math.floor(el.receipts.length/el.least * 100);
        }
        // 남은 날짜
        var liveTime = new Date(Date.parse(el.date)).getTime()/1000;
        var calTime = new Date((liveTime - new Date().getTime()/1000)*1000);
        if (Number(calTime) >= 0) {
          let hours = Math.floor((Number(calTime) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let mins = Math.floor((Number(calTime) % (1000 * 60 * 60)) / (1000 * 60));
  
          el.remain = hours+"시간 "+mins+'분 뒤 시작';
        }
        else{
          el.remain = '마감'
        }
        // 시작 시간
        var start = new Date(el.date)
        el.process = start;
        this.info.push(el);
      })
      console.log(this.info);
      this.loaded = true;
    })
  }

  ngAfterViewInit() {
    this.phxChannel.gets('lecture:today', '');
  }
  color:'#000'
  title = '전체보기';
  today = new Date();
  selectedC : any;
  selectedSC:any;
  category = CATEGORY;
  filePath = Environment.filePath;
  loaded = false;
  info = [{
    lecture: [{
      currs: [{date: null, dur: null, stage: null}],
      lecture:'',
      subtitle: '', 
      interests: [{value: ''}], 
      thumbnail1: '', 
      limit: null, 
      title: '',
      id: null,
      color:'',
      maincategory: '',
    }],
    process: '',
    categorycolor:'',
    company:'',
    remain:'',
    id: null,
    degree: null,
  }];
  onselect(c){
    this.selectedC = c;
    this.title = c.title;
    var lives = document.getElementsByClassName('designedBox');
    for(var i=0; i<lives.length; i++){
        (lives[i] as HTMLElement).style.display='none';
        if(lives[i].getElementsByClassName('maincategory')[0].textContent == c.title){
        (lives[i] as HTMLElement).style.display='block';
      }
    }
  }
  filter(sc){
    this.selectedSC = sc;
    var lives = document.querySelectorAll('.designedBox');
    for(var i=0; i<lives.length; i++){
      (lives[i] as HTMLElement).style.display='none';
      if(lives[i].getElementsByClassName('subcategory')[0].textContent == sc.subname){
      (lives[i] as HTMLElement).style.display='block';
      }
    }
  }

  detail( el ) {
    this.router.navigate(['detail/' + el.id])
  }
  reset(e:Event){
    var rotate = e.target as HTMLElement;
    rotate.classList.add('rotate');
    var lives = document.getElementsByClassName('designedBox');
    this.title = '전체보기';
    this.selectedC ='';
    this.selectedSC ='';
    for(var i=0; i<lives.length; i++){
      (lives[i] as HTMLElement).style.display='block';
    }
    var bigList = document.querySelectorAll('.bigList li');
    for(var i=0; i<bigList.length; i++){
      bigList[i].classList.remove('selected')
    }
    setTimeout(()=>{
      rotate.classList.remove('rotate');
    },1000)
  }

  

}
