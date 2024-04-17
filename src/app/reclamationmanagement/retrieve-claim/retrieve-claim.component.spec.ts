import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrieveClaimComponent } from './retrieve-claim.component';

describe('RetrieveClaimComponent', () => {
  let component: RetrieveClaimComponent;
  let fixture: ComponentFixture<RetrieveClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetrieveClaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetrieveClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
