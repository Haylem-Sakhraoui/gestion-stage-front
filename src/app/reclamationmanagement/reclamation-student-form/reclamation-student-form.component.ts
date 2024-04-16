import { ReclamationService } from 'src/app/services/reclamation.service';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { userService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-reclamation-student-form',
  templateUrl: './reclamation-student-form.component.html',
  styleUrls: ['./reclamation-student-form.component.css']
})
export class ReclamationStudentFormComponent {
  description: string = ''; // Initialiser à une chaîne vide
  

  constructor(private reclamationService: ReclamationService,private authService : AuthService,private userService: userService) { }
  logout() {
    this.authService.logout();
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
  onSubmit(): void {
    if (!this.description) {
      console.error('Description cannot be empty'); // Gérer le cas où la description est vide
      return;
    }

    this.reclamationService.addClaim(this.description)
      .subscribe(
        response => {
          console.log(response); // Gérer la réponse comme nécessaire
          // Réinitialiser le champ de description après une soumission réussie si nécessaire
          this.description = '';
        },
        error => {
          console.error('Error adding claim:', error); // Gérer les erreurs
        }
      );
  }
}
