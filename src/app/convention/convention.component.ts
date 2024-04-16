import { Component, OnInit } from '@angular/core';
import { Convention } from './convention';
import { AssignmentServiceService } from './assignment-service.service';

@Component({
  selector: 'app-convention',
  templateUrl: './convention.component.html',
  styleUrls: ['./convention.component.css']
})
export class ConventionComponent implements OnInit {
  public  convention: Convention = new Convention();
  constructor(private assignmentService: AssignmentServiceService) {}
  ngOnInit(): void { }
  public saveData(): void {
    this.assignmentService.saveconvention(this.convention).subscribe((response: any) => {
       console.log('Response from server:', response);
    }, (error) => {
       console.error('Error:', error);
    });
}

}