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
  reclamationArray: any;
  pages: Array<number> = [];
  itemsPerPage: number = 5;
  totalPages: number = 0;
  sortCriteria: number = 0;
  showNoItems: boolean = false;
  page: number = 0; // declare the 'page' property
  filter: boolean = false; 
  
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
  logout() {
    this.authService.logout();
  }
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
       
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddReclamation(addForm: NgForm): void {
    this.reclamationService.addReclamation(addForm.value).subscribe(
      (response: Reclamation) => {
        console.log(response);
        this.getAllReclamations();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  // ... (your existing code)
  selectedCriteria(event :any){
    this.showNoItems =false;
    this.filter = true;
    this.page = 0 ;
    this.sortCriteria = event.target.value ;
    this.getFilteredClaims();
    console.log("event",event.target.value);
  }

  getFilteredClaims(){
      this.reclamationService.filteredClaimsByProject(this.sortCriteria,this.page).subscribe((res:any)=>{
        this.reclamationArray = res.content;
        this.pages =new Array(res.totalPages);
        if(this.reclamationArray.length == 0){
          this.showNoItems =true;
        }
      })
  }

  setPage(i:any , event:any){
    event.preventDefault();
    this.page = i;
    if(this.filter){
      this.getFilteredClaims()
    }else{
      this.getAllReclamations();
    }

  }
  setNextPage(event:any){
    if(this.page < this.pages.length -1){
      event.preventDefault();
      this.page = this.page +1 ;
      if(this.filter){
        this.getFilteredClaims()
      }else{
        this.getAllReclamations();
      }
    }
  }

  setPreviousPage(event:any){
    if(this.page > 0){
      event.preventDefault();
      this.page = this.page -1 ;
      if(this.filter){
        this.getFilteredClaims()
      }else{
        this.getAllReclamations();
      }
    }
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
