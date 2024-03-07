import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  user: User = {} as User;
  titleModel: string = "";
  firstName: string = "";
  lastName: string = "";
  headerTitle: string = "User List: View and Manage Your Account Members!";
  descriptionHeader: string = "Welcome to the \"User List\" page.\n" +
    "Here, you can view all the users associated with your account.";
  imageUrl: string = "./assets/img/icons/spot-illustrations/corner-4.png";
  page: number = 0;
  pages: Array<number> = [];

  showNoItems: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  setPage(i:any , event:any){
    event.preventDefault();
    this.page = i;
    this.getUsers();
  }
  setNextPage(event:any){
    if(this.page < this.pages.length -1){
      event.preventDefault();
      this.page = this.page +1 ;
      this.getUsers();
    }
  }

  setPreviousPage(event:any){
    if(this.page > 0){
      event.preventDefault();
      this.page = this.page -1 ;
      this.getUsers();
    }
  }

  users: User[] = []; // Declare the UsersList property

  getUsers(): void {
    this.authService.retrieveUsers()
    .subscribe(
      (users) => {
        this.users = users;
        console.log('Users fetched successfully:', users);
      },
      (error) => {
        console.error('Error fetching users:', error);
        // Handle error appropriately
      }
    );
  }

  getUser(u: User) {
      this.user = u;
      this.firstName = u.firstname || '';
      this.lastName = u.lastname || '';
      if(u.enabled == true){
        this.titleModel = "Disable";
      }else{
        this.titleModel = "Enable";
      }
  }


  disableUser() {
    if (this.user.email) {
      this.authService.disableUser(this.user.email as string).subscribe((res:any)=>{
        this.ngOnInit()
      });
    }
  }

  enableUser() {
    if (this.user.email) {
      this.authService.enableUser(this.user.email as string).subscribe((res:any)=>{
        this.ngOnInit()
      });
    }
  }


}
