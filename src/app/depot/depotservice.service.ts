import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Depot } from './depot';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepotserviceService {
  private apiUrl = 'http://localhost:8089/stage/submission/upload';

  constructor(private http: HttpClient) {}

 

 
  public saveDepot(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData, { observe: 'response' });
  }
}
