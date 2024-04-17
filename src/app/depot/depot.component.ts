import { Component, OnInit } from '@angular/core';
import { Depot } from './depot';
import { DepotserviceService } from './depotservice.service';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.css']
})
export class DepotComponent implements OnInit {
  public depot: Depot = new Depot();
  public plagiarismScore: number | undefined;

  constructor(private depotService: DepotserviceService) {}

  ngOnInit(): void {}

  public handleFileInput(event: any): void {
    const file: File = event.target.files[0];
    this.depot.pdfFile = file;
  }

  public saveData(): void {
    const formData = new FormData();
    formData.append('file', this.depot.pdfFile, this.depot.pdfFile.name);
    formData.append('report', this.depot.report);

    this.depotService.saveDepot(formData).subscribe(
      (response) => {
        if (response.body && response.body.plagiarismScore !== undefined) {
          this.plagiarismScore = response.body.plagiarismScore;
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
