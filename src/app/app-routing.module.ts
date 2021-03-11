import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TAGS } from './interface/interface';

import {LoginComponent} from './layout/login/login.component';
import {MainComponent} from './page/main/main.component';
import {JoinComponent} from './page/join/join.component';
import {EnrollClassComponent} from './page/enroll-class/enroll-class.component';
import {EnrollListComponent} from './page/enroll-list/enroll-list.component';
import {MypageComponent} from './page/mypage/mypage.component';
import {MypageTeacherComponent} from './page/mypage-teacher/mypage-teacher.component';
import {DetailComponent} from './page/detail/detail.component';
import {AllLiveComponent} from './page/all-live/all-live.component';
import {TodayLiveComponent} from './page/today-live/today-live.component';
import {MaumdociComponent} from './page/maumdoci/maumdoci.component';
import {PreopenComponent} from './page/preopen/preopen.component';
import {JoinTeacherComponent} from './page/join-teacher/join-teacher.component';
import {TestPageComponent} from './page/test-page/test-page.component';
import {BroadcastComponent} from './page/broadcast/broadcast.component';
import {LectureInfoListComponent} from './page/lecture-info-list/lecture-info-list.component';
import {RqstCompanyClassComponent} from './page/rqst-company-class/rqst-company-class.component';
import {RqstPersonalClassComponent} from './page/rqst-personal-class/rqst-personal-class.component';
import {InquireComponent} from './page/inquire/inquire.component';

const routes: Routes = [
  { path: TAGS.MAIN, component: MainComponent },
  { path: TAGS.LOGIN, component: LoginComponent },
  { path: TAGS.JOIN, component: JoinComponent },
  { path: TAGS.ENROLLCLASS, component: EnrollClassComponent },
  { path: TAGS.ENROLLLIST, component: EnrollListComponent },
  { path: TAGS.DETAIL, component: DetailComponent },
  { path: TAGS.MYPAGE, component: MypageComponent },
  { path: TAGS.MYPAGETEACHER, component: MypageTeacherComponent },
  { path: TAGS.ALLLIVE, component: AllLiveComponent },
  { path: TAGS.ALLLIVE2, component: AllLiveComponent },
  { path: TAGS.TODAYLIVE, component: TodayLiveComponent },
  { path: TAGS.MAUM, component: MaumdociComponent },
  { path: TAGS.PREOPEN, component: PreopenComponent },
  { path: TAGS.PREOPEN2, component: PreopenComponent },
  { path: TAGS.JOINTEACHER, component: JoinTeacherComponent },
  { path: TAGS.TESTPAGE, component: TestPageComponent },
  { path: TAGS.BROADCAST, component: BroadcastComponent },
  { path: TAGS.LECTUREINFOLIST, component: LectureInfoListComponent },
  { path: TAGS.RQSTPSNCLASS, component: RqstCompanyClassComponent },
  { path: TAGS.RQSTCPNCLASS, component: RqstPersonalClassComponent },
  { path: TAGS.INQUIRE, component: InquireComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
