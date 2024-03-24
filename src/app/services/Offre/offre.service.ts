import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Offre } from 'src/app/models/offre';


@Injectable({
  providedIn: 'root'
})
export class OffreService {

  private _refresh$ = new Subject<void>();
 private baseURL = "http://localhost:8085/stage/offre/" ;
  constructor(private http: HttpClient) { }

 AddStage(Offre: Object): Observable<Object> {
    return this.http.post("http://localhost:8075/stage/offre/add", Offre);
  }
  getStageList(): Observable<Offre[]> {
    return this.http.get<Offre[]>("http://localhost:8075/stage/offre/getAll")
}
likeStage(idstage: number): Observable<any> {
 
  return this.http.post(`http://localhost:8075/stage/offre/${idstage}/like`, {});
}

dislikeStage(idstage: number): Observable<any> {
  const url = `${this.baseURL}${idstage}/dislike`; // Corrected URL
  return this.http.post(url, {});
}
getOffers(typeStage: string): Observable<Offre[]> {
  
  const url = `  http://localhost:8075/stage/offre/gettype?typeStage=${typeStage}`;
 
  return this.http.get<Offre[]>(url);
}
}

