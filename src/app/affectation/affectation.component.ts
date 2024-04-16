import { Component, OnInit } from '@angular/core';

import { Affectation } from './affectation';
import { AffectationserviceService } from './affectationservice.service.spec';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css']
})
export class AffectationComponent implements OnInit {
  public affectation: Affectation = new Affectation();
  constructor(private affrctationService: AffectationserviceService) {}
  ngOnInit(): void { }
  public saveData(): void {
    this.affrctationService.saveaffectation(this.affectation).subscribe((response: any) => {
       console.log('Response from server:', response);
    }, (error) => {
       console.error('Error:', error);
    });
}

}
