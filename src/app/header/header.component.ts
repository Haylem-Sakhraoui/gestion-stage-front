import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!: User; // Utilisation de "!" pour indiquer que user sera assigné avant utilisation
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {}
  
  ngOnInit(): void {
    this.authService.retrieveUserConnected(this.authService.getToken()).subscribe((res: any) => {
      this.user = res;

   /*   this.initWebSocket();*/
    });
    this.checkTokenAvailability();
  }
  checkTokenAvailability() {
    const token = localStorage.getItem('token'); // Supposons que le token soit stocké dans le stockage local

    // Vérifiez si le token est disponible
    if (token) {
        this.isLoggedIn = true;
    } else {
        this.isLoggedIn = false;
    }
}

logout() {
    // Code pour gérer la déconnexion de l'utilisateur
    // Par exemple, vous pouvez supprimer le token du stockage local
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.authService.logout();
}
/*
  logout() {
    this.authService.logout();
  }*/
  
}
