import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { userService } from '../services/user.service';
import { User } from '../models/User';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class AccueilComponent {
  user: User = {} as User;

  constructor(private http: HttpClient, private router: Router,private authService: AuthService,private userService:userService) { }
  logout() {
    this.authService.logout();
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
