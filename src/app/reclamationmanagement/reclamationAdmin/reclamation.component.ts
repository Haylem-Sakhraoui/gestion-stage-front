import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ReclamationService } from '../../services/reclamation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Reclamation, StatutReclamation } from 'src/app/models/reclamation';
import { userService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
 filtername:string = '';
  reclamationArray: any;
 p:number = 1;
 itemsPerPage:number = 10;
 totalReclamation:any;
  selectedStatut: StatutReclamation | null = null;

  statutValues: StatutReclamation[] = Object.values(StatutReclamation)
  @Input() reclamation: Reclamation = {
    idReclamation: 0,
    dateCreation: new Date(),
    description: '',
    statutReclamation: StatutReclamation.EnAttente,
    user: {
      firstname: '',
      lastname: '',
      email: '',
      id: 0
    }
  };
  

  constructor(private userService : userService, private reclamationService: ReclamationService,private authService: AuthService, private fb: FormBuilder, private router: Router) {}
 
  ngOnInit() {
    this.getAllReclamations();
    this.loadReclamations();
    
   this.getUserInformation();
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
   loadReclamations(): void {
    if (this.selectedStatut) {
      this.reclamationService.getReclamationsByStatut(this.selectedStatut).subscribe(
        (reclamations) => {
          this.reclamationArray = reclamations.map((reclamation) => ({
            idReclamation: reclamation.idReclamation,
            dateCreation: reclamation.dateCreation,
            description: reclamation.description,
            statutReclamation: reclamation.statutReclamation,
            firstname: reclamation.user.firstname,
            lastname: reclamation.user.lastname,
            email: reclamation.user.email,
            iduser: reclamation.user.id,
          }));
        },
        (error) => {
          console.error('Error fetching reclamations:', error);
        }
      );
    } else {
      // Handle when no statut is selected (load all reclamations, or handle as per your requirements)
      this.reclamationService.getAllReclamations().subscribe(
        (reclamations) => {
          this.reclamationArray = reclamations;
        },
        (error) => {
          console.error('Error fetching all reclamations:', error);
        }
      );
    }
  }
  

  filterByStatut(event: any): void {
    const selectedValue = event.target.value;
    this.selectedStatut = selectedValue !== "" ? selectedValue as StatutReclamation : null;
    this.loadReclamations();
  }
  
  public getAllReclamations(): void {
    this.reclamationService.getAllReclamations().subscribe(
      (response: Reclamation[]) => {
        this.reclamationArray = response;
        this.totalReclamation = this.reclamationArray.length; // Met à jour le total des réclamations
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  getDetail(idReclamation: any): void {
    console.log("idReclamation", idReclamation);
    this.router.navigate(['/retrieveClaim', idReclamation]);
  }
  deleteReclamation(idReclamation: number): void {
    this.reclamationService.deleteReclamation(idReclamation).subscribe(
      () => {
        console.log('Réclamation supprimée avec succès.');
        // Ajoutez ici toute autre logique nécessaire après la suppression
        this.getAllReclamations(); // Rechargez la liste des réclamations après la suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression de la réclamation:', error);
        // Gérez l'erreur ici selon vos besoins
      }
    );
  }
}
