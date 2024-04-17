import { Component, OnInit } from '@angular/core';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { userService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reclamation-student-form',
  templateUrl: './reclamation-student-form.component.html',
  styleUrls: ['./reclamation-student-form.component.css']
})
export class ReclamationStudentFormComponent implements OnInit {
  description: string = '';
  user: User = {} as User;
  successMessage: string = '';

  constructor(
    private reclamationService: ReclamationService,
    private authService: AuthService,
    private userService: userService
  ) {}

  ngOnInit(): void {
    this.getUserInformation();
  }

  getUserInformation(): void {
    this.userService.retrieveUserConnected(this.userService.getToken())
      .subscribe(
        (res: any) => {
          console.log('User connected:', res);
          this.user = res;
        },
        (err: any) => {
          console.log('Error:', err);
        }
      );
  }

  onSubmit(): void {
    if (!this.description) {
      console.error('Description cannot be empty');
      return;
    }
  
    this.reclamationService.addClaim(this.description)
      .subscribe(
        response => {
          console.log(response);
          // Check if the response is valid JSON
          if (response && response.error) {
            console.error('Error adding claim:', response.error);
          } else {
            console.log('Claim added successfully');
            // Reset the form only if the claim is successfully added
            this.description = ''; // Reset the description field
            // Optionally, display a success message to the user
            alert('Thank you for adding a claim!');
          }
        },
        error => {
          console.error('Error adding claim:', error);
        }
      );
  }
  
}
