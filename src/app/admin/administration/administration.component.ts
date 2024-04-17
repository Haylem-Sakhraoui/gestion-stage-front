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
    
   this.getUserInformation();
    
  }

  studentList: User[] = []; 
  serviceList: User[] = []; 
  supervisorList: User[] = []; 
  user: User = {} as User;
  getUserInformation() {
    this.userService.retrieveUserConnected(this.userService.getToken())
      .subscribe((res: any) => {
        console.log('User connected:', res);
        this.user = res;
      }, (err: any) => {
        console.log('Error:', err);
      });
  }
  
  
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

disableUser(email: string): void {
  this.userService.disableUser(email).subscribe(
    () => {
      console.log('User disabled successfully');
      this.refreshUserLists();
    },
    (error) => {
      console.error('Error disabling user:', error);
      // Handle error appropriately
    }
  );
}

enableUser(email: string): void {
  this.userService.enableUser(email).subscribe(
    () => {
      console.log('User enabled successfully');
      this.refreshUserLists();
    },
    (error) => {
      console.error('Error enabling user:', error);
      // Handle error appropriately
    }
  );
}

private refreshUserLists(): void {
  this.getstudentList();
  this.getsupervisorList();
  this.getserviceList();
}


}
