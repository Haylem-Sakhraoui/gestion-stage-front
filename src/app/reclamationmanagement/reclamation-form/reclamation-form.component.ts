import { Component } from '@angular/core';
import { Reclamation, StatutReclamation } from '../../services/reclamation';
import { ReclamationService } from '../../services/reclamation.service';

@Component({
  selector: 'app-reclamation-form',
  templateUrl: './reclamation-form.component.html',
  styleUrls: ['./reclamation-form.component.css']
})
export class ReclamationFormComponent {
 
  userIds: number[] = [];  
  reclamation: Reclamation = {
    idReclamation: 0,
    dateCreation: new Date(),
    statutReclamation: StatutReclamation.EnAttente,
    firstname: '',
    lastname: '',
    email: '',
    description: '',
    iduser: 0,
    // Initialize other properties as needed
  };

  constructor(private reclamationService: ReclamationService) {

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
      description: '',
      iduser: 0,
      // Initialize other properties as needed
    };
  }
  
}
