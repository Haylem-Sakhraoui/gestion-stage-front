import { Component, OnInit } from '@angular/core';
import { Demande } from './demande';
import { RequestserviceService } from './requestservice.service.spec';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  

  public demande: Demande = new Demande();

  constructor(private requestService: RequestserviceService) {}

  ngOnInit(): void {}

  public saveData(): void {
     this.requestService.saveRequest(this.demande).subscribe((response: any) => {
        console.log('Response from server:', response);
     }, (error) => {
        console.error('Error:', error);
     });
  }
}
