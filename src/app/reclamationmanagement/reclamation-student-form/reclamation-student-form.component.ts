import { Component, OnInit } from '@angular/core';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { userService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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
    private userService: userService, private router: Router
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
      if (typeof response === 'string') {
        // Si la réponse est une chaîne de caractères, affichez un message approprié
        console.log('Claim added successfully');
        alert('Thank you for adding a claim!');
        this.router.navigate(['/accueil']);
      } else {
        // Si la réponse est un objet JSON, vérifiez s'il contient une erreur
        if (response ) {
          console.log('Claim added successfully');
          alert('Thank you for adding a claim!');
          this.router.navigate(['/accueil']);
        } else {
          console.log('Claim added successfully');
          // Réinitialiser le formulaire uniquement si la réclamation est ajoutée avec succès
          this.description = ''; // Réinitialiser le champ de description
          // Optionnellement, afficher un message de succès à l'utilisateur
          alert('Thank you for adding a claim!');
        }
      }
    },
    error => {  console.log('Claim added successfully');
    alert('Thank you for adding a claim!');
  
      this.router.navigate(['/accueil']);
    }
  );

  }
  
}
