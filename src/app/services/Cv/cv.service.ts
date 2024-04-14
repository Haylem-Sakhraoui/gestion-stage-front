import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { Cvstage } from 'src/app/models/cvstage';
import { Offre } from 'src/app/models/offre';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private apiUrl = 'http://localhost:8075/stage/cv/upload';
  constructor(private http: HttpClient) {}
  public saveCv(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData).pipe(
      tap(() => {
        this.SendEmail().subscribe(
          () => console.log("Email sent successfully"),
          error => console.log("Error sending email:", error)
        );
      })
    );
  }
  
  private SendEmail(): Observable<any> { 
      return this.http.post<any>("http://localhost:8089/stage/send-email", {});
    }
  
  
getCvList(): Observable<Cvstage[]> {
  return this.http.get<Cvstage[]>(` http://localhost:8075/stage/cv/cvs`);
}




downloadCV(id: number): Observable<Blob> {
  const url = `http://localhost:8075/stage/cv/cv/${id}/pdf`;
  return this.http.get(url, { responseType: 'blob' }).pipe(
    catchError(error => {
      console.error('Error downloading the CV', error);
      return throwError(error);
    })
  );
}

checkCvMatch(cvId: number): Observable<boolean> {
  const matchUrl = `http://localhost:8075/stage/offre/match/${cvId}`;
  return this.http.get<Offre[]>(matchUrl).pipe(
    map(offres => offres.length > 0), // If there are any offers, then it's a match
    catchError(error => {
      console.error('Error checking match:', error);
      return of(false); // Return false in case of error
    })
  );
}
}


