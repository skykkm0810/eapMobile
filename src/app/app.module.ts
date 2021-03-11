import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCarouselModule } from '@ngmodule/material-carousel';


import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { MainComponent } from './page/main/main.component';
import { TopComponent } from './layout/top/top.component';
import { FooterComponent } from './layout/footer/footer.component';
import { JoinComponent } from './page/join/join.component';
import { EnrollClassComponent } from './page/enroll-class/enroll-class.component';
import { DetailComponent } from './page/detail/detail.component';
import { MypageComponent } from './page/mypage/mypage.component';
import { FormsModule } from '@angular/forms';
import { EnrollListComponent } from './page/enroll-list/enroll-list.component';
import { MypageTeacherComponent } from './page/mypage-teacher/mypage-teacher.component';
import { AllLiveComponent } from './page/all-live/all-live.component';
import { LoginComponent } from './layout/login/login.component';
import { MaumdociComponent } from './page/maumdoci/maumdoci.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TodayLiveComponent } from './page/today-live/today-live.component';
import { AddressComponent } from './modal/address/address.component';
import { PersonalInformationComponent } from './modal/personal-information/personal-information.component';
import { UsageRuleComponent } from './modal/usage-rule/usage-rule.component';
import { PreopenComponent } from './page/preopen/preopen.component';
import { JoinTeacherComponent } from './page/join-teacher/join-teacher.component';
import { ReadyComponent } from './page/ready/ready.component';
import { TestPageComponent } from './page/test-page/test-page.component';
import { UserInfoComponent } from './modal/user-info/user-info.component';
import { BroadcastComponent } from './page/broadcast/broadcast.component';
import { LectureInfoListComponent } from './page/lecture-info-list/lecture-info-list.component';
import { SafePipe } from './pipe/safe.pipe';
import { RqstPersonalClassComponent } from './page/rqst-personal-class/rqst-personal-class.component';
import { RqstCompanyClassComponent } from './page/rqst-company-class/rqst-company-class.component';
import { InquireComponent } from './page/inquire/inquire.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TopComponent,
    FooterComponent,
    JoinComponent,
    EnrollClassComponent,
    DetailComponent,
    MypageComponent,
    EnrollListComponent,
    MypageTeacherComponent,
    AllLiveComponent,
    LoginComponent,
    MaumdociComponent,
    TodayLiveComponent,
    AddressComponent,
    PersonalInformationComponent,
    UsageRuleComponent,
    PreopenComponent,
    JoinTeacherComponent,
    ReadyComponent,
    TestPageComponent,
    UserInfoComponent,
    BroadcastComponent,
    LectureInfoListComponent,
    SafePipe,
    RqstPersonalClassComponent,
    RqstCompanyClassComponent,
    InquireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatRippleModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgbModule,
    MatCarouselModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
