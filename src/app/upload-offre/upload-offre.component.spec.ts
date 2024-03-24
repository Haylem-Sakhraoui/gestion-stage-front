import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadOffreComponent } from './upload-offre.component';

describe('UploadOffreComponent', () => {
  let component: UploadOffreComponent;
  let fixture: ComponentFixture<UploadOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadOffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
