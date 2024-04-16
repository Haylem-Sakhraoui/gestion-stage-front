import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Journal } from './journal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JournalserviceService {
  private apiUrl = 'http://localhost:8089/stage/Journal/Journal';

  constructor(private http: HttpClient) {}

  public saveJournal(journal: Journal): Observable<any> {
    return this.http.post<any>(this.apiUrl, journal);
  }
}
