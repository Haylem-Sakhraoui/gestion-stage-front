import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Convention } from './convention';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentServiceService {

  private apiUrl = 'http://localhost:8075/stage/Agreement/agreements';
  
  constructor(private http : HttpClient, private authService : AuthService) {}

  public saveconvention(convention: Convention): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.apiUrl, convention,{ headers });
  }}

 
    