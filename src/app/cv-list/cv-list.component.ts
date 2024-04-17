import { Component } from '@angular/core';
import { CvService } from '../services/Cv/cv.service';
import { Cvstage } from '../models/cvstage';
import { DomSanitizer } from '@angular/platform-browser';
import { catchError, forkJoin, map, of } from 'rxjs';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.css']
})
export class CvListComponent {
  cvs: Cvstage[] = [];

  constructor(
    private cvService: CvService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadAllCVs();
  }

  
 
  loadAllCVs(): void {
    this.cvService.getCvList().subscribe(data => {
      // Initialize each CV as not matching
      this.cvs = data.map(cv => ({ ...cv, isMatching: false }));
      // Check for matches for each CV
      const matchChecks$ = this.cvs.map(cv => 
        this.cvService.checkCvMatch(cv.idCv).pipe(
          catchError(() => of(false)), // Assume no match on error
          map(isMatching => ({ cvId: cv.idCv, isMatching }))
        )
      );

      forkJoin(matchChecks$).subscribe(results => {
        results.forEach(result => {
          const cv = this.cvs.find(cv => cv.idCv === result.cvId);
          if (cv) {
            cv.isMatching = result.isMatching;
          }
        });
      });
    }, error => console.error(error));
  }



  downloadCV(cv: Cvstage): void {
    console.log(cv); // Log the cv object to check if IdCv is present
    if (!cv || !cv.idCv) {
      console.error('CV ID is missing');
      return;
    }
    this.cvService.downloadCV(cv.idCv).subscribe(
      data => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const downloadURL = window.URL.createObjectURL(blob);
        window.open(downloadURL);
      },
      error => console.error(error)
    );
  }
}
