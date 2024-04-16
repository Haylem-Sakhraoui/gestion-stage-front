import { Injectable } from '@angular/core';
import { Affectation } from './affectation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AffectationserviceService {

    private apiUrl = 'http://localhost:8089/stage/Assignment/assignment';
  
    constructor(private http: HttpClient) {}
  
    public saveaffectation(affectation: Affectation): Observable<any> {
      return this.http.post<any>(this.apiUrl, affectation);
    }}