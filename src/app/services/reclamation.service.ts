// reclamation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Reclamation,StatutReclamation } from './reclamation';

@Injectable({
  providedIn: 'root',
})
export class ReclamationService {
  private apiServerUrl = 'http://localhost:8075/stage/reclamation';
constructor(private http: HttpClient) {}

public getAllReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.apiServerUrl + '/with-users');
  }

  public addReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(this.apiServerUrl + '/addReclamation', reclamation).pipe(
      tap(() => {
        this.SendEmail().subscribe(
          () => console.log("Email sent successfully"),
          error => console.error("Error sending mail:", error)
        );
      }),
      catchError((error: any) => {
        console.error("Error adding reclamation:", error);
        // Handle the error gracefully, you can log, show a message, etc.
        // Returning a default Reclamation object, adjust as needed
        return of({} as Reclamation);
      })
    );
  }
  
  deleteReclamation(idReclamation: number): Observable<void> {
    const url = `${this.apiServerUrl}/deleteRec/${idReclamation}`;
    return this.http.delete<void>(url);
  }
  public retrieveClaim(idReclamation:any):Observable<any>{
    
    return this.http.get(`${this.apiServerUrl}/retrieveClaim/${idReclamation}`);
  }
  public editClaimState(idReclamation:any,newClaimState:any):Observable<any>{
   
    return this.http.put(`${this.apiServerUrl}/editClaimState/${idReclamation}/${newClaimState}`,null);
  }

  public filteredClaims(sortCriteria:any,page :any){

    return this.http.get(`${this.apiServerUrl}filteredClaims/${sortCriteria}/${page}`);
  }

  public filteredClaimsByProject(sortCriteria:any,page :any){
    return this.http.get(`${this.apiServerUrl}getFilteredClaimsByProject/${sortCriteria}/${page}`);
  }
  private SendEmail(): Observable<any> { 
    return this.http.post<any>("/send-email", {});
  }

}
