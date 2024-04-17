import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Journal } from './journal';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JournalserviceService {
  private apiUrl = 'http://localhost:8075/stage/Journal/Journal';

  constructor(private http: HttpClient, private authService: AuthService) {}

  public saveJournal(journal: Journal): Observable<any> {
    const token = localStorage.getItem('token');
  
    // Construire les en-têtes de la requête avec le token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.apiUrl, journal, { headers });
  }
}



