import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from 'src/app/environment/environment';
import { PhxChannelService } from 'src/app/service/phx-channel.service';
import { ActivatedRoute } from "@angular/router";
import { CATEGORY} from '../../interface/interface';

@Component({
  selector: 'app-all-live',
  templateUrl: './all-live.component.html',
  styleUrls: ['./all-live.component.css']
})
export class AllLiveComponent implements AfterViewInit {

  constructor(
    private phxChannel: PhxChannelService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    phxChannel.LectureOpen.subscribe( data => {
      console.log(data)
      this.all = [];
      this.info = [];
      let filtered;
      data.filter( dt => dt.currs.length > 0 )
      data.filter( dt => dt.currs[0].data != null )
      data.filter( dt => dt.dday != null )
      data.sort(function(a, b) {
        let rst = new Date(a.dday).getTime() - new Date(b.dday).getTime();
        return rst;
      })
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
        filtered = data.filter( data => data.title.toLowerCase().includes(this.search.text.toLowerCase()) )
      } else {
        filtered = data;
      }
      console.log(filtered);

      filtered.forEach( data => {
        // console.log(data);
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
      console.log(this.info);
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
      this.loaded = true;
    })
  }

  ngAfterViewInit() {
    
    this.phxChannel.gets('lecture:open', '');
    
    this.search = this.route.snapshot.params;
    this.route.params.subscribe( data => this.search = data )
    
  }
  routedata;
  search;
  color:'#000'
  title = '전체보기';
  selectedC : any;
  selectedSC : any;
  category = CATEGORY;
 
  filePath = Environment.filePath;
  loaded = false;
  info: any = [
    { currs: [{date: null, dur: null, stage: null}],
     subtitle: '', 
     interests: [{value: ''}], 
     thumbnail1: '', 
     limit: null, 
     degree: null,
     title: '', 
     process: '',
     categorycolor:'',
     remain:'',
     company:'',
     companys:[],
     color:'',
     maincategory:'',
     dday: '',
    }];
  all: any = [
    { currs: [{date: null, dur: null, stage: null}],
      subtitle: '', 
      interests: [{value: ''}], 
      thumbnail1: '', 
      limit: null, 
      degree: null,
      title: '', 
      process: '',
      categorycolor:'',
      remain:'',
      company:'',
      companys:[],
      color:'',
      maincategory:'',
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

    var lives = document.getElementsByClassName('designedBox');
    this.title = '전체보기';
    this.selectedC ='';
    this.selectedSC='';
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
