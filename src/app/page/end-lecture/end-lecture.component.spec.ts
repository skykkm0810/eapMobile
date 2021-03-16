import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndLectureComponent } from './end-lecture.component';

describe('EndLectureComponent', () => {
  let component: EndLectureComponent;
  let fixture: ComponentFixture<EndLectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndLectureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
