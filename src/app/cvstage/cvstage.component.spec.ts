import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvstageComponent } from './cvstage.component';

describe('CvstageComponent', () => {
  let component: CvstageComponent;
  let fixture: ComponentFixture<CvstageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvstageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvstageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
