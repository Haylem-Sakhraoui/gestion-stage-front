import { Component, OnInit } from '@angular/core';
import { Journal } from './journal';
import { JournalserviceService } from './journalservice.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {
  public journal: Journal = new Journal();
  constructor(private journalservice: JournalserviceService) {}
  ngOnInit(): void {}  
  public saveData(): void {
    this.journalservice.saveJournal(this.journal).subscribe((response: any) => {
       console.log('Response from server:', response);
    }, (error) => {
       console.error('Error:', error);
    });


}
}






