import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Stage } from '../models/stage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  private _refresh$ = new Subject<void>();
 private URL = "hhttp://localhost:8075/stage/offre/" ;
  constructor(private http: HttpClient) { }

 
  getStageList(): Observable<Stage[]> {
    return this.http.get<Stage[]>("http://localhost:8075/stage/offre/getAll");
  }
 
}
