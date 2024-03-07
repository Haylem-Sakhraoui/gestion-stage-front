import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class AccueilComponent {


  constructor(private http: HttpClient, private router: Router,private authService: AuthService,) { }
  logout() {
    this.authService.logout();
  }

}
