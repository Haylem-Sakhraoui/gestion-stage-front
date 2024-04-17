import { Component } from '@angular/core';
import { Cvstage } from '../models/cvstage';
import { CvService } from '../services/Cv/cv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cvstage',
  templateUrl: './cvstage.component.html',
  styleUrls: ['./cvstage.component.css']
})
export class CvstageComponent {
  public Cvstage:Cvstage = new Cvstage();

  constructor(private CvService: CvService, private router: Router) {}

  ngOnInit(): void {}

  public saveData(event: Event): void {
    const formData = new FormData();
    formData.append('file',this.Cvstage.CvFile, 'filename.pdf');
    formData.append('nom', this.Cvstage.nom  as string);
    formData.append('prenom', this.Cvstage.prenom  as string);
    formData.append('classe', this.Cvstage.classe  as string);

    this.CvService.saveCv(formData).subscribe(
      (response: any) => {
        console.log('Response from server:', response);
        this.gotoList();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  


  public handleFileInput(event: any): void {
    const file: File = event.target.files[0];
    this.Cvstage.CvFile = file;
  }
  gotoList() {
    this.router.navigate(['/CvList']);
  }

}

