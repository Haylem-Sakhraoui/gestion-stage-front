import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Cvstage } from 'src/app/models/cvstage';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private apiUrl = 'http://localhost:8089/stage/stage/upload';
  constructor(private http: HttpClient) {}
  public saveCv(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData).pipe(
      tap(() => {
        this.SendEmail().subscribe(
          () => console.log("Email sent successfully"),
          error => console.log("Error sending email:", error)
        );
      })
    );
  }
  
  private SendEmail(): Observable<any> { 
      return this.http.post<any>("http://localhost:8089/stage/send-email", {});
    }
  
  getCvList(): Observable<Cvstage[]> {
    return this.http.get<Cvstage[]>("http://localhost:8089/stage/stage/getAllCV")
}
}
