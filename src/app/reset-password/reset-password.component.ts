import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userService } from 'src/app/services/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

   // Method to reset password
  email: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  showAlert: boolean = false;
  message: string = '';
   constructor(private userService: userService, private router:Router,private activated:ActivatedRoute) { }
   user: User = {} as User;
   ngOnInit(): void {
    this.getUserInformation();
    // this.activated.paramMap.subscribe((params) => {
    //   this.email = params.get('email') || '';
    //   this.token = params.get('token') || '';
    //  })
   }
 
   onSubmit() {
    const data = {
      email: this.email,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      confirmNewPassword: this.confirmNewPassword
    };

    this.userService.resetPassword(data).subscribe(
      (res: any) => {
        // Password reset successfully
        this.showAlert = true;
        this.message = 'Password reset successful!';
        // You can redirect the user to another page or perform any other action here
      },
      (error: any) => {
        // Handle error response
        this.showAlert = true;
        this.message = error.message || 'An error occurred while resetting password.';
      }
    );
  }

   getUserInformation() {
    this.userService.retrieveUserConnected(this.userService.getToken())
      .subscribe((res: any) => {
        console.log('User connected:', res);
        this.user = res;
      }, (err: any) => {
        console.log('Error:', err);
      });

}
}
