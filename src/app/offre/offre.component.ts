import { Component } from '@angular/core';
import { OffreService } from '../services/Offre/offre.service';
import { Offre } from '../models/offre';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent {
  offres: Offre[] = []; // Use a local array to store offers
  searchType: string = '';
  
  
  constructor(private offreService: OffreService,private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  onClickPostuler() {
    this.router.navigate(['/uploadcv']); 
  }

  reloadData() {
    if (this.searchType) {
      // If search type is provided, fetch offers by type
      this.offreService.getOffers(this.searchType).subscribe(data => {
        this.offres = data;
      });
    } else {
      // Otherwise, fetch all offers
      this.offreService.getStageList().subscribe(data => {
        this.offres = data;
      });
    }
    
    }
    likeStage(idStage: number): void {
      this.offreService.likeStage(idStage).subscribe({
        next: (response) => console.log('Voted like successfully.'),
        error: (error) => console.error('Error voting like:', error)
      });
    }
  
    dislikeStage(idStage: number): void {
      this.offreService.dislikeStage(idStage).subscribe({
        next: (response) => console.log('Voted dislike successfully.'),
        error: (error) => console.error('Error voting dislike:', error)
      });
    }
}
  

