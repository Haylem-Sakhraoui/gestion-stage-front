import { Injectable } from '@angular/core';
import { Affectation } from './affectation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AffectationserviceService {

    private apiUrl = 'http://localhost:8075/stage/Assignment/assignment';
  
    constructor(private http : HttpClient, private authService : AuthService) {}
  
    public saveaffectation(affectation: Affectation): Observable<any> {
          const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.post<any>(this.apiUrl, affectation,{ headers });
    }}
    
 