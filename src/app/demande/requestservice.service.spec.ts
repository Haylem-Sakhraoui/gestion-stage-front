import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Demande } from './demande';

@Injectable({
  providedIn: 'root'
})
export class RequestserviceService {
  private apiUrl = 'http://localhost:8089/stage/api/request/add';
  private emailUrl = 'http://localhost:8089/send-email';

  constructor(private http: HttpClient) {}

  

  saveRequest(demande: Demande): Observable<any> {
    return this.http.post<any>(this.apiUrl, demande)
      .pipe(
        tap(() => {
          this.sendEmail().subscribe(
            () => console.log('Email sent successfully'), 
            error => console.error('Error sending email:', error)
          );
        })
      );}
      private sendEmail(): Observable<any> {
        return this.http.post<any>(this.emailUrl, {});
      }
}