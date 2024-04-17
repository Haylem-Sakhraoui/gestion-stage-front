import { Component } from '@angular/core';
import { Reclamation, ReclamationWithUser, StatutReclamation } from '../../models/reclamation';
import { ReclamationService } from '../../services/reclamation.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { userService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reclamation-form',
  templateUrl: './reclamation-form.component.html',
  styleUrls: ['./reclamation-form.component.css']
})
export class ReclamationFormComponent {
 
  userIds: number[] = [];  
  reclamation: ReclamationWithUser = {
    idReclamation: 0,
    dateCreation: new Date(),
    statutReclamation: StatutReclamation.EnAttente,
    
      firstname: '',
      lastname: '',
      email: '',
      iduser: 0,
    
    description: ''
  
    // Initialize other properties as needed
  };

  constructor(private reclamationService: ReclamationService,  private authService : AuthService, private router: Router, private userService : userService) {

  }
  
  user: User = {} as User;
  getUserInformation() {
    this.userService.retrieveUserConnected(this.userService.getToken())
      .subscribe((res: any) => {
        console.log('User connected:', res);
        this.user = res;
      }, (err: any) => {
        console.log('Error:', err);
      });
  }
  
  ngOnInit(): void {
   this.getUserInformation();
  
  }


  onSubmit() {
    this.reclamationService.addReclamation(this.reclamation).subscribe(
      (response) => {
        console.log('Reclamation added successfully:', response);
        // Handle success, e.g., show a success message, navigate to another page, etc.
       // this.resetForm();
       this.router.navigate(['/reclamation']);
      },
      (error) => {
        console.error('Failed to add reclamation:', error);
        // Handle error, e.g., show an error message
      }
    );
  }

  
}
