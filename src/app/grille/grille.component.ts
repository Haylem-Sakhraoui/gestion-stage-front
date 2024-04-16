import { Component, OnInit } from '@angular/core';
import { GrilleService } from './grille-service.service';
import { Grille } from './grille';

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.css']
})
export class GrilleComponent implements OnInit {
  Grilles: Grille[] = [];
  globalNote: number = 0; // Variable pour stocker la note globale
  error: any;

  constructor(private grilleService: GrilleService) {}

  ngOnInit(): void {
    this.reloadData();
    this.calculateGlobalNote(); // Appeler la méthode pour calculer la note globale au chargement du composant
  }

  reloadData(): void {
    this.grilleService.getGrilleList()
      .subscribe(
        (data: Grille[]) => {
          this.Grilles = data;
        },
        (error) => {
          this.error = error;
        }
      );
  }

  // Méthode pour calculer la note globale
  calculateGlobalNote(): void {
    this.grilleService.calculateGlobalNote()
      .subscribe(
        (note: number) => {
          this.globalNote = note;
        },
        (error) => {
          console.error('Erreur lors du calcul de la note globale : ', error);
        }
      );
  }
}
