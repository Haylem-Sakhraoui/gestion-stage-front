import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-retrieve-claim',
  templateUrl: './retrieve-claim.component.html',
  styleUrls: ['./retrieve-claim.component.css']
})
export class RetrieveClaimComponent implements OnInit {
  idReclamation: string | null = null;
  reclamation: any;
  selected: string = '';
  statusList: any[] = [];
  showFormEditStatusClaim: boolean = false;

  statusFormControl = new FormControl('', Validators.required);

  constructor(
    private reclamationService: ReclamationService,
    private router: Router,
    private activated: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activated.paramMap.subscribe((params) => {
      this.idReclamation = params.get('id');

      if (this.idReclamation) {
        this.reclamationService.retrieveClaim(this.idReclamation).subscribe(
          (res: any) => {
            console.log('res', res.body);
            this.reclamation = res.body;
            this.getStatus(this.reclamation.StatutReclamation);
          },
          (error: any) => {
            console.error('Error retrieving claim:', error);
            // Handle error - e.g., show a user-friendly message or redirect to an error page
            // You might want to use a notification service for better user feedback
          }
        );
      } else {
        console.error('id Reclamation is null or undefined');
        // Handle the case where idReclamation is not set
        // Example: Redirect to an error page or display a user-friendly message
        this.router.navigate(['/error']);
      }
    });
  }

  getStatus(statutReclamation: any): void {
    this.statusList = [
      { name: 'EN_ATTENTE' },
      { name: 'EN_COURS' },
      { name: 'RESOLUE' }
    ];

    if (statutReclamation) {
      const currentStatus = this.statusList.findIndex((item: { name: string }) => item.name === statutReclamation);
      if (currentStatus !== -1) {
        this.statusList.splice(currentStatus, 1);
      }
    }
  }

  showFormEditStatus(): void {
    this.showFormEditStatusClaim = true;
  }

  save(): void {
    console.log('this.selected', this.statusFormControl.value);
    console.log('this.reclamation', this.idReclamation);
    this.reclamationService.editClaimState(this.idReclamation, this.statusFormControl.value).subscribe(
      () => {
        this.router.navigate(['/reclamation']);
      },
      (error: any) => {
        console.error('Error updating claim state:', error);
        // Handle error - e.g., show a user-friendly message or redirect to an error page
        // You might want to use a notification service for better user feedback
      }
    );
  }
}
