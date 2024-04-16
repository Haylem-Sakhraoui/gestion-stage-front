import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grille } from './grille';

@Injectable({
  providedIn: 'root',
})
export class GrilleService {
  constructor(private http: HttpClient) {}

  getGrilleList(): Observable<Grille[]> {
    const url = 'http://localhost:8089/stage/Grille/getall'; 
    return this.http.get<Grille[]>(url);
  }

  calculateGlobalNote(): Observable<number> {
    const url = 'http://localhost:8089/stage/Grille/calculateGlobalNote'; 
    return this.http.post<number>(url, {});
  }
}
