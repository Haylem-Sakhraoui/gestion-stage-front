import { Component } from '@angular/core';
import { Reclamation, ReclamationWithUser, StatutReclamation } from '../../models/reclamation';
import { ReclamationService } from '../../services/reclamation.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

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

  constructor(private reclamationService: ReclamationService,  private authService : AuthService, private router: Router) {

  }
  logout() {
    this.authService.logout();
  }
  // Dans ReclamationFormComponent
isNotAdmin(): boolean {
  return !this.authService.roleMatch(['Admin']);
}

  onSubmit() {
    this.reclamationService.addReclamation(this.reclamation).subscribe(
      (response) => {
        console.log('Reclamation added successfully:', response);
        // Handle success, e.g., show a success message, navigate to another page, etc.
        this.resetForm();
      },
      (error) => {
        console.error('Failed to add reclamation:', error);
        // Handle error, e.g., show an error message
      }
    );
  }

  resetForm() {
    this.reclamation = {
      idReclamation: 0,
      dateCreation: new Date(),
      statutReclamation: StatutReclamation.EnAttente,
   
        firstname: '',
        lastname: '',
        email: '',
        iduser: 0,
      
      description: '',
      
      // Initialize other properties as needed
    };
  }
  
}
