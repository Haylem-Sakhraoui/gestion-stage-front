import { Component } from '@angular/core';
import { Cvstage } from '../models/cvstage';
import { CvService } from '../services/Cv/cv.service';

@Component({
  selector: 'app-cvstage',
  templateUrl: './cvstage.component.html',
  styleUrls: ['./cvstage.component.css']
})
export class CvstageComponent {
  public Cvstage:Cvstage = new Cvstage();

  constructor(private CvService: CvService) {}

  ngOnInit(): void {}

  public saveData(): void {
    const formData = new FormData();
    formData.append('file',this.Cvstage.CvFile, 'filename.pdf');
    formData.append('nom', this.Cvstage.Nom  as string);
    formData.append('prenom', this.Cvstage.Prenom  as string);
    formData.append('classe', this.Cvstage.Classe  as string);

    this.CvService.saveCv(formData).subscribe(
      (response: any) => {
        console.log('Response from server:', response);
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
}

