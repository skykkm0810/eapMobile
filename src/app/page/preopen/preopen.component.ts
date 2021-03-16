import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from 'src/app/environment/environment';
import { PhxChannelService } from 'src/app/service/phx-channel.service';
import { CATEGORY} from '../../interface/interface'
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-preopen',
  templateUrl: './preopen.component.html',
  styleUrls: ['./preopen.component.css']
})
export class PreopenComponent  {

  constructor(
    private phxChannel: PhxChannelService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    phxChannel.LectureClose.subscribe( data => {
      console.log(data)
      this.all = [];
      this.info = [];
      let filtered;
      this.title = this.search.text;
      if( this.search.text === '인생여정' ) {
        filtered = data.filter( data => data.interests.includes("연애결혼") || data.interests.includes("자녀양육") || data.interests.includes("부부/가족관계") || data.interests.includes("인생 2막") )
      } 
      else if( this.search.text === '사회생활' ) {
        filtered = data.filter( data => data.interests.includes("대인관계") || data.interests.includes("커뮤니케이션") || data.interests.includes("리더십") || data.interests.includes("조직적응") )
      }
      else if( this.search.text === '힐링' ) {
        filtered = data.filter( data => data.interests.includes("명상요가") || data.interests.includes("몸마음건강") || data.interests.includes("예술 치유") || data.interests.includes("힐링 DIY") )
      }
      else if( this.search.text === '심리' ) {
        filtered = data.filter( data => data.interests.includes("자기 이해") || data.interests.includes("심리 특강") )
      } 
      else if( this.search.text ) {
        filtered = data.filter( data => data.title.includes(this.search.text) )
      } else {
        filtered = data;
      }
      console.log(filtered);
      filtered.forEach( data => {
        // 프로세스
        let time = new Date().getTime();
        let datatime = new Date(data.dday).getTime();
        if( datatime > time ){
          data.process = new Date(data.dday).getMonth() + 1 + '월' + new Date(data.dday).getDate() + '일 ' + new Date(data.dday).getHours() + ':' + new Date(data.dday).getMinutes();
          if(data.dday == null){
            data.process = 'OPEN 예정';
          }
        }
        else {
          data.process = '종료';
        }
        // 온도
        if(data.least == null || data.least == undefined){
          data.degree = '0';
        }
        else{
          data.degree = Math.floor(data.receipts.length/data.least * 100);
        }
        // 남은 날짜
        var liveTime = new Date(Date.parse(data.dday)).getTime()/1000;
        var calTime = new Date((liveTime - new Date().getTime()/1000)*1000);
        if (Number(calTime) >= 0) {
          let days = Math.floor(Number(calTime) / (1000 * 60 * 60 * 24));
          data.remain = days + '일 남음'
        }
        else{
          data.remain = '종료'
        }
        // 카테고리
        if ( data.interests == '연애결혼' || data.interests == '자녀양육' || data.interests == '부부/가족관계' || data.interests == '인생 2막' ) {
          data.color = '#DD5E5E'; data.maincategory = '인생여정';
        } else if ( data.interests == '대인관계' || data.interests == '커뮤니케이션' || data.interests == '리더십' || data.interests == '조직적응' ) {
          data.color = '#3EB3E7'; data.maincategory = '사회생활';
        } else if ( data.interests == '명상요가' || data.interests == '몸마음건강' || data.interests == '예술 치유' || data.interests == '힐링 DIY' ) {
          data.color = '#0AD1D1'; data.maincategory = '힐링';
        } else if ( data.interests == '자기 이해' || data.interests == '심리 특강' ) {
          data.color = '#B775EF'; data.maincategory = '심리';
        }
        this.info.push(data);
      })
      data.forEach( data => {
        // 프로세스
        let time = new Date().getTime();
        let datatime = new Date(data.dday).getTime();
        if( datatime > time ){
          data.process = new Date(data.dday).getMonth() + 1 + '월' + new Date(data.dday).getDate() + '일 ' + new Date(data.dday).getHours() + ':' + new Date(data.dday).getMinutes();
          if(data.dday == null){
            data.process = 'OPEN 예정';
          }
        }
        else {
          data.process = '종료';
        }
        // 온도
        if(data.least == null || data.least == undefined){
          data.degree = '0';
        }
        else{
          data.degree = Math.floor(data.receipts.length/data.least * 100);
        }
        // 남은 날짜
        var liveTime = new Date(Date.parse(data.dday)).getTime()/1000;
        var calTime = new Date((liveTime - new Date().getTime()/1000)*1000);
        if (Number(calTime) >= 0) {
          let days = Math.floor(Number(calTime) / (1000 * 60 * 60 * 24));
          data.remain = days + '일 남음'
        }
        else{
          data.remain = '종료'
        }
        // 카테고리
        if ( data.interests == '연애결혼' || data.interests == '자녀양육' || data.interests == '부부/가족관계' || data.interests == '인생 2막' ) {
          data.color = '#DD5E5E'; data.maincategory = '인생여정';
        } else if ( data.interests == '대인관계' || data.interests == '커뮤니케이션' || data.interests == '리더십' || data.interests == '조직적응' ) {
          data.color = '#3EB3E7'; data.maincategory = '사회생활';
        } else if ( data.interests == '명상요가' || data.interests == '몸마음건강' || data.interests == '예술 치유' || data.interests == '힐링 DIY' ) {
          data.color = '#0AD1D1'; data.maincategory = '힐링';
        } else if ( data.interests == '자기 이해' || data.interests == '심리 특강' ) {
          data.color = '#B775EF'; data.maincategory = '심리';
        }
        this.all.push(data);
      })
      console.log(this.info);
      this.loaded = true;
      // this.info = [];
      // data.forEach( d => {
      //   if ( d.interests == '연애결혼' || d.interests == '자녀양육' || d.interests == '부부/가족관계' || d.interests == '인생 2막' ) {
      //     d.color = '#DD5E5E'; d.maincategory = '인생여정';
      //   } else if ( d.interests == '대인관계' || d.interests == '커뮤니케이션' || d.interests == '리더십' || d.interests == '조직적응' ) {
      //     d.color = '#3EB3E7'; d.maincategory = '사회생활';
      //   } else if ( d.interests == '명상요가' || d.interests == '몸 마음 건강' || d.interests == '예술 치유' || d.interests == '힐링DIY' ) {
      //     d.color = '#0AD1D1'; d.maincategory = '힐링';
      //   } else if ( d.interests == '자기 이해' || d.interests == '심리특강' ) {
      //     d.color = '#B775EF'; d.maincategory = '심리';
      //   }
      //   this.info.push(d);
      // })
      // console.log(data)
    })
  }

  ngAfterViewInit() {
    this.phxChannel.gets('lecture:close', '');

    var tempBar = document.getElementsByClassName('tempDynamic');
    for(var i=0; i<tempBar.length; i++){
      var degree = tempBar[i].textContent
      if(degree !==''){
        (tempBar[i] as HTMLElement).style.width = 3*Number(degree) + 'px';
      }
    }
    
    var process = document.getElementsByClassName('process');
    for(var i=0; i<process.length; i++){
      if(process[i].textContent == '종료'){
        (process[i] as HTMLElement).style.color = '#2d6c6e';
        (process[i] as HTMLElement).style.borderColor = '#2d6c6e';
      }
    }
    this.phxChannel.gets('lecture:open', '');
    
    this.search = this.route.snapshot.params;
    console.log(this.search)
  }
  
  title = '전체보기';
  // 카테고리
  category = CATEGORY;
  // 강의 
  class = [
    // {process:'진행중',remain:'',openDay:'2021-02-22',degree:100 ,color:"#DD5E5E",category:'연애·결혼',title:'플라워디퓨저' , img:'assets/images/banner/week1.png', text:'각종 가공 플라워를 이용한 힐링 프로그램'},
    // {process:'진행중',remain:'',openDay:'2021-02-22',degree:80 ,color:"#00C6C6",category:'부부·가족',title:'글자를 늘려보려고 길게 적어보았습니다.' , img:'assets/images/banner/week2.png', text:'각종 가공의 그것들을 이용한 어쩃든 무엇을 하는 프로그램'},
    // {process:'진행중',degree:50 ,color:"#954FD0",category:'인생 2막',title:'두줄 까지는 안전한가요? 세줄은 좀 힘들어 보이는데' , img:'assets/images/banner/week3.png', text:'글자길이'},
    {process:'OPEN 예정',hashTag:[{tag:'#스트레칭'},{tag:'#심리안정'},{tag:'#릴렉스'}],color:"#DD5E5E",maincategory:'인생여정',subcategory:'연애·결혼',title:'플라워디퓨저' , img:'assets/images/banner/week1.png', text:'각종 가공 플라워를 이용한 힐링 프로그램'},
    {process:'OPEN 예정',hashTag:[{tag:'#스트레칭'},{tag:'#심리안정'},{tag:'#릴렉스'}],color:"#00C6C6",maincategory:'인생여정',subcategory:'부부·가족',title:'글자를 늘려보려고 길게 적어보았습니다.' , img:'assets/images/banner/week2.png', text:'각종 가공의 그것들을 이용한 어쩃든 무엇을 하는 프로그램'},
    {process:'OPEN 예정',remain:'',openDay:'2021-02-22',hashTag:[{tag:'#스트레칭'},{tag:'#심리안정'},{tag:'#릴렉스'}],color:"#954FD0",maincategory:'인생여정',subcategory:'인생 2막',title:'두줄 까지는 안전한가요? 세줄은 좀 힘들어 보이는데' , img:'assets/images/banner/week3.png', text:'글자길이'},
  ]
  selectedC : any;
  selectedSC : any;

  search;
  all;
  filePath = Environment.filePath;
  loaded = false;
  info = [
    { currs: [{date: null, dur: null, stage: null}],
     subtitle: '', 
     interests: '', 
     thumbnail1: '', 
     limit: null, 
     degree: null,
     title: '', 
     id: '',
     categorycolor:'',
     color: '',
     maincategory:'',
     hash:'',
    }];
  
  onselect(c){
    this.info = this.all;
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
    this.info = this.all;
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
