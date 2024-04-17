import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Offre } from 'src/app/models/offre';
import { AuthService } from '../auth/auth.service';
import { userService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class OffreService {
  private apiUrl = 'http://localhost:8075/stage/votes'
  private _refresh$ = new Subject<void>();
 
  constructor(private http: HttpClient , private authService: AuthService ,private userservice: userService) { }
  
  /*AddStage(offre: any): Observable<any> {
    // Assuming you have access to user authentication information
    const currentUser = this.userservice.getCurrentUser(); // Implement this function to get the current user

    // Associate the user with the offre object
    offre.user = currentUser;

    return this.http.post<any>('http://localhost:8075/stage/offre/add', offre);
  }*/
  
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();  // Retrieve the token from AuthService
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  likeStage(idStage: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post(`http://localhost:8075/stage/votes/like?idStage=${idStage}`, {}, { headers });
  }
  
  dislikeStage(idStage: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post(`http://localhost:8075/stage/votes/dislike?idStage=${idStage}`, {}, { headers });
  }
  addStage(offreData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>('http://localhost:8075/stage/offre/addStage', offreData, { headers });
  }
  
  
  getStageList(): Observable<Offre[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Offre[]>("http://localhost:8075/stage/offre/getAll")
}

  

  
getOffers(typeStage: string): Observable<Offre[]> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  
  const url = "http://localhost:8075/stage/offre/gettype?typeStage=${typeStage}";
 
  return this.http.get<Offre[]>(url);
}
}

