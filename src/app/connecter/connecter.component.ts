import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { AuthenticationRequest } from '../models/authentication_request';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-connecter',
  templateUrl: './connecter.component.html',
  styleUrls: ['./connecter.component.css']
})
export class ConnecterComponent {

  constructor(private authService: AuthService, private router: Router) { }

  login(body: any) {
    const { email, password } = body.value;
    this.authService.login({ email, password }).subscribe((res: any) => {
      console.log("response", res);
      console.log("Message ==> ", res.body.message);
      if (res.body.status == 200) {
        localStorage.setItem('logged', "true");
        console.log(res.body.token);
        this.authService.setToken(res.body.body.token);
        this.authService.retrieveUserConnected(res.body.body.token)
        console.log('test after login')
        this.router.navigate(['/accueil']);
      }
    });


  }
}
