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

  constructor(private offreService: OffreService, private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.offreService.getStageList().subscribe(data => {
      this.offres = data; // Directly store the data in the local array
    });
  }

  onClickPostuler() {
    this.router.navigate(['/uploadcv']); 
  }

  likeOffre(idStage: number) {
    this.offreService.likeStage(idStage).subscribe(() => {
      // Find the offer and increment its like count
      const offre = this.offres.find(o => o.idStage === idStage);
      if (offre) offre.likes += 1;
    });
  }

  dislikeOffre(idStage: number) {
    this.offreService.dislikeStage(idStage).subscribe(() => {
      // Find the offer and increment its dislike count
      const offre = this.offres.find(o => o.idStage=== idStage);
      if (offre) offre.dislikes += 1;
    });
  }
}
