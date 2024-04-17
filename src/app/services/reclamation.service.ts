// reclamation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,of, throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AddReclamationRequest, Reclamation,ReclamationWithUser,StatutReclamation } from '../models/reclamation';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReclamationService {
  private apiServerUrl = 'http://localhost:8075/stage/reclamation';
  private apiUrl = 'http://localhost:8075/stage/reclamation/addClaim';
constructor(private http : HttpClient, private authService : AuthService) { }

public getAllReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.apiServerUrl + '/with-users');
  }

  public addReclamation(reclamation: ReclamationWithUser): Observable<Reclamation> {
    return this.http.post<Reclamation>(this.apiServerUrl + '/addReclamation', reclamation);
     
  }
  
  
  addClaim(description: string): Observable<any> {
    // Récupérer le token JWT depuis le local storage ou un autre endroit où vous l'avez stocké
    const token = localStorage.getItem('token');

    // Construire les en-têtes de la requête avec le token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Envoyer la requête POST avec les en-têtes appropriés
    return this.http.post<any>(this.apiUrl, { description }, { headers });
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
  getReclamationsByStatut(statut: StatutReclamation): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.apiServerUrl}/byStatut/${statut}`);
  }

}
