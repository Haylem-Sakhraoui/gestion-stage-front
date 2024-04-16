import { Injectable } from '@angular/core';
import { Demande } from './demande';

@Injectable({
  providedIn: 'root'
})
export class RequestserviceService {
  saveRequest(demande: Demande) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
