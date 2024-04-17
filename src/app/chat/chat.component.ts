import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../services/chat.service';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/User'; // Import de la classe User depuis le fichier de modèle
import { userService } from '../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  currentUserFirstName: string = '';
  currentUserLastName: string = '';
  value: string | undefined;

  constructor(public chatService: ChatService, public authService: AuthService,public userService : userService) {}

  ngOnInit(): void {
    this.chatService.conversation.subscribe((val) => this.messages = this.messages.concat(val));
    // Utilisation de la classe User pour définir le type de l'utilisateur
   this.getUserInformation();
  
  }
  user: User = {} as User;
  getUserInformation() {
    this.userService.retrieveUserConnected(this.userService.getToken())
      .subscribe((res: any) => {
        console.log('User connected:', res);
        this.user = res;
      }, (err: any) => {
        console.log('Error:', err);
      });
  }
  sendMessage() {
    this.chatService.getBotAnswer(this.value);
    this.value = '';
  }

  logout() {
    this.authService.logout();
  }
}
