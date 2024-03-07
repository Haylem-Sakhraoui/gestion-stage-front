import { Component, OnInit } from '@angular/core';
import { RegisterRequest } from '../models/Register_request';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { AuthenticationResponse } from '../models/authentication_response';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent  {
  // registerRequest: RegisterRequest; 
  registerRequest: RegisterRequest = { firstname: '', lastname: '', email: '', password: '', role: '' };

  authResponse: AuthenticationResponse = {};
  message = '';
  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
  }
  addUser() {
    this.message = '';
    this.authService.addUser(this.registerRequest)
      .subscribe(
        (response) => {
          console.log('User added successfully:', response);
          // You can add further logic here, such as displaying a success message or redirecting to another page
        },
        (error) => {
          console.error('Error adding user:', error);
          // Handle error appropriately, e.g., display an error message to the user
        }
      );
    }

}
