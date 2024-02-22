import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
// import { AuthenticationResponse } from '../models/authentication_response';
// import { AuthenticationRequest } from '../models/authentication_request';

@Component({
  selector: 'app-connecter',
  templateUrl: './connecter.component.html',
  styleUrls: ['./connecter.component.css']
})
export class ConnecterComponent {

constructor(
private authService: AuthService,
private router: Router
) {}

login(body:any){
  this.authService.login(body.value.email,body.value.password).subscribe( (res :any) => {

    if(res.status ==200){
      this.authService.setToken(res.token)
      this.authService.retrieveUserConnected(res.token).subscribe((res:any)=>{
        this.authService.setRole(res.role);
        this.router.navigate(['/layouts/home']);
      });
    }
    
  })
}

}
