import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OffreService } from '../services/Offre/offre.service';

@Component({
  selector: 'app-upload-offre',
  templateUrl: './upload-offre.component.html',
  styleUrls: ['./upload-offre.component.css']
})
export class UploadOffreComponent {
  offreForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private offreService: OffreService,
              private router: Router) { }

  ngOnInit() {
    this.offreForm = this.formBuilder.group({
      typeStage: ['', [Validators.required, this.customValidator]],
      description: ['', [Validators.required, this.customValidator]],
      nbStagiaire: ['', [Validators.required, Validators.min(0)]],
      competence: ['', [Validators.required, this.customValidator]]
    });
  }

  get formControls() {
    return this.offreForm.controls;
  }

  save() {
    if (this.offreForm.invalid) {
      return;
    }
    const formValue = { ...this.offreForm.value };
    if (formValue.competence && typeof formValue.competence === 'string') {
      formValue.competence = formValue.competence.split(',').map((item: string) => item.trim());
    }
    this.offreService.addStage(formValue).subscribe(
      (data: any) => {
        console.log(data);
        this.gotoList();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/offre']);
  }

  customValidator(control: FormControl) {
    if (control.value && control.value.length < 2) {
      return { 'insufficientLength': true };
    }
    return null;
  }
}
