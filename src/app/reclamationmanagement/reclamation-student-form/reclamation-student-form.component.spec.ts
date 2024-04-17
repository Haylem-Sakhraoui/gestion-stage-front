import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationStudentFormComponent } from './reclamation-student-form.component';

describe('ReclamationStudentFormComponent', () => {
  let component: ReclamationStudentFormComponent;
  let fixture: ComponentFixture<ReclamationStudentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamationStudentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamationStudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
