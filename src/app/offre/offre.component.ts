import { Component } from '@angular/core';
import { OffreService } from '../services/Offre/offre.service';
import { Offre } from '../models/offre';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent {
  offres: Offre[] = []; // Use a local array to store offers
  searchType: string = '';


  constructor(private offreService: OffreService, private router: Router) {}

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
        this.offres = data.sort((a, b) => b.likes - a.likes);
      });
    } else {
      // Otherwise, fetch all offers
      this.offreService.getStageList().subscribe(data => {
        this.offres = data.sort((a, b) => b.likes - a.likes);
      });
    }
  }

  likeOffre(idStage: number) {
    this.offreService.likeStage(idStage).subscribe(() => {
      // Increment likes count and resort the offers array
      const offre = this.offres.find(o => o.idStage === idStage);
      if (offre) {
        offre.likes += 1;
        this.offres.sort((a, b) => b.likes - a.likes);
      }
    });
  }

  dislikeOffre(idStage: number) {
    this.offreService.dislikeStage(idStage).subscribe(() => {
      // Increment dislikes count and resort the offers array
      const offre = this.offres.find(o => o.idStage === idStage);
      if (offre) {
        offre.dislikes += 1;
        this.offres.sort((a, b) => b.likes - a.likes);
      }
    });
  }
}
