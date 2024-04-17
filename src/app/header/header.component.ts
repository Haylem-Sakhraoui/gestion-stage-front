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
  
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {}
  
  ngOnInit(): void {
    this.authService.retrieveUserConnected(this.authService.getToken()).subscribe((res: any) => {
      this.user = res;
   /*   this.initWebSocket();*/
    });
  }

  logout() {
    this.authService.logout();
  }
}
