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
  registerRequest: RegisterRequest; 
  authResponse: AuthenticationResponse = {};
  message = '';
  constructor(private authService: AuthService, private router: Router) {
    this.registerRequest = {
      email: '',
      password: '',
    };
  }
  
  ngOnInit(): void {
  }
  register() {
    this.message = '';
    this.authService.addUser(this.registerRequest)
      .subscribe({
        next: (response) => {
          if (response) {
            this.authResponse = response;
          } else {
            // inform the user
            this.message = 'Account created successfully\nYou will be redirected to the Login page in 3 seconds';
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 4200)
          }
        }
      });
    }

}
