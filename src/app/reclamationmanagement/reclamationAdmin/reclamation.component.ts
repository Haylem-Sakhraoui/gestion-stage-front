import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ReclamationService } from '../../services/reclamation.service';
import { Reclamation, StatutReclamation } from '../../services/reclamation';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  reclamationArray: Reclamation[] = [];
  pages: Array<number> = [];
  itemsPerPage: number = 5;
  totalPages: number = 0;
  sortCriteria: number = 0;
  showNoItems: boolean = false;
  page: number = 0; // declare the 'page' property
  filter: boolean = false; 

  @Input() reclamation: Reclamation = {
    idReclamation: 0,
    dateCreation: new Date(),
    description: '',
    statutReclamation: StatutReclamation.EnAttente,
    firstname: '',
    lastname: '',
    email: '',
    iduser: 0,
  };

  constructor(private reclamationService: ReclamationService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.getAllReclamations();
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
