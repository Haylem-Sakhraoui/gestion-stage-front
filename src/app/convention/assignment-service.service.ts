import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Convention } from './convention';

@Injectable({
  providedIn: 'root'
})
export class AssignmentServiceService {

  private apiUrl = 'http://localhost:8089/stage/Agreement/agreements';
  
  constructor(private http: HttpClient) {}

  public saveconvention(convention: Convention): Observable<any> {
    return this.http.post<any>(this.apiUrl, convention);
  }}