import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { userService } from '../user.service';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})

export class SettingComponent implements OnInit {
  user: User = {} as User;

  ngOnInit(): void {
    this.getUserInformation();

  };

  // ...

  constructor(private userService: userService, private router: Router) { }

  getUserInformation() {
    this.userService.retrieveUserConnected(this.userService.getToken())
      .subscribe((res: any) => {
        console.log('User connected:', res);
        this.user = res;
      }, (err: any) => {
        console.log('Error:', err);
      });
  }



  redirectToResetPassword() {
    this.router.navigate(['/reset-password']); // Assuming '/reset-password' is the route for the reset password page
  }
}

