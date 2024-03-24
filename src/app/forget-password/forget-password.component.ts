import { Component } from '@angular/core';
import { userService } from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  mailSent : boolean = false;
  showAlert : boolean = false;
  message : string = '';
  showSpinner: boolean = false;
  ngOnInit(): void {
  }

  submit(body:any){
    this.showSpinner= true;
    this.userService.forgetPassword(body.email).subscribe((res: any)=>{
      if(res.status == 200){
        this.showSpinner= false;
        this.mailSent = true ;
        this.showAlert = false;
      }
      else {
        this.showAlert= true
        this.message= res.message;
        this.showSpinner= false;
      }


    })
  }
  constructor(private userService: userService, private router: Router) { }

  redirectToLoginPage() {
    this.router.navigate(['/login']);
  }

}
