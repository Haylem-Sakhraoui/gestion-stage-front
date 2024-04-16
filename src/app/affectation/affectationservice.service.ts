import { Injectable } from '@angular/core';
import { Affectation } from './affectation';

@Injectable({
  providedIn: 'root'
})
export class AffectationserviceService {
  saveaffectation(affectation: Affectation) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
