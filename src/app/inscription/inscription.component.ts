import { Component, NgModule, OnInit } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and Validators
import { RegisterRequest } from '../models/Register_request';

import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { AuthenticationResponse } from '../models/authentication_response';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  registerRequest: FormGroup = new FormGroup({});
  authResponse: AuthenticationResponse = {};
  message = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerRequest = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      studentClass: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required]
    });
  }

  get f() { return this.registerRequest.controls; }

  addUser() {
    this.message = '';
    const formData = {
      firstname: this.registerRequest.value.firstname,
      lastname: this.registerRequest.value.lastname,
      email: this.registerRequest.value.email,
      studentClass: this.registerRequest.value.studentClass,
      password: this.registerRequest.value.password,
      role: this.registerRequest.value.role
    };

    this.authService.addUser(formData)
      .subscribe(
        (response) => {
          console.log('User added successfully:', response);
          this.router.navigate([this.router.url]);
          // You can add further logic here, such as displaying a success message or redirecting to another page
        },
        (error) => {
          console.error('Error adding user:', error);
          // Handle error appropriately, e.g., display an error message to the user
        }
      );
      
  }
}
