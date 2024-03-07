import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { userService } from 'src/app/services/user.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent {

  constructor(private userService: userService) { }

  ngOnInit(): void {
    this.getstudentList();
    this.getsupervisorList();
    this.getserviceList();
    
  }

  studentList: User[] = []; 
  serviceList: User[] = []; 
  supervisorList: User[] = []; 

  getstudentList(): void {
    this.userService.retrieveStudents()
    .subscribe(
      (studentList) => {
        this.studentList = studentList;
        console.log('studentList fetched successfully:', studentList);
      },
      (error) => {
        console.error('Error fetching studentList:', error);
        // Handle error appropriately
      }
    );
  }

  getserviceList(): void {
    this.userService.retrieveService()
    .subscribe(
      (serviceList) => {
        this.serviceList = serviceList;
        console.log('studentList fetched successfully:', serviceList);
      },
      (error) => {
        console.error('Error fetching studentList:', error);
        // Handle error appropriately
      }
    );
  }

  getsupervisorList(): void {
    this.userService.retrieveSupervisors()
    .subscribe(
      (supervisorList) => {
        this.supervisorList = supervisorList;
        console.log('studentList fetched successfully:', supervisorList);
      },
      (error) => {
        console.error('Error fetching studentList:', error);
        // Handle error appropriately
      }
    );
  }
  toggleList(id: string): void {
    const list = document.getElementById(id);
    if (list) {
        list.classList.toggle('hidden');
    }
}
// enbale():void{
//   this.userService.enableUser(this.userService.user.email as string).subscribe((res:any)=>{
//     this.ngOnInit()
//   }),

// }

}
