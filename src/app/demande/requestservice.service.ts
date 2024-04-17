import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demande } from './demande';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequestserviceService {
  private apiUrl = 'http://localhost:8075/stage/request/add';

  constructor(private http: HttpClient, private authService: AuthService) {}

  saveRequest(demande: Demande): Observable<any> {
    const token = localStorage.getItem('token');
    
    // Construire les en-têtes de la requête avec le token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Envoyer l'objet demande comme corps de la requête
    return this.http.post<any>(this.apiUrl, demande, { headers });
  }
}
