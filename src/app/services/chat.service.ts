import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export class Message{
  
  constructor(public author:string, public content:string) {}
}
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }
  conversation = new Subject<Message[]>();
  messageMap:any = {
    "hi": "Hello! How can I assist you today?",
    "hello": "Hi there! How may I help you?",
    "hey": "Hey! What can I do for you?",
    
    "Is the stage service available?": "Yes, the stage service is available. How can I assist you?",
    "How can I apply for a stage?": "You can apply for a stage by visiting our website and filling out the application form. Do you need further assistance with the application process?",
    "What are the requirements for a stage?": "To qualify for a stage, you need to meet certain criteria such as being enrolled in a relevant program and having completed specific courses. Would you like more details on the requirements?",
    "What is the deadline for stage applications?": "The deadline for stage applications is [deadline date]. It's important to submit your application before this date. Do you have any other questions?",
    "How can I contact the stage service?": "You can contact the stage service by emailing [email address] or calling [phone number]. Feel free to reach out if you need assistance.",
    "Thank you for your help.": "You're welcome! If you have any more questions in the future, don't hesitate to ask. Have a great day!",
    "Do you have any general inquiries about our stage service?": "Sure, feel free to ask any questions you have about our stage service.",
    "What is the status of my stage application?": "To check the status of your stage application, please provide me with your application ID or relevant details.",
    "Are there any available positions for stages?": "Yes, we currently have several available positions for stages. Would you like more information about specific positions?",
    "What are the eligibility criteria for stages?": "To be eligible for a stage, you need to meet certain criteria such as being enrolled in a relevant program and having completed specific courses. Would you like more details?",
    "How can students contact the stage service?": "Students can contact the stage service by emailing [email address] or calling [phone number]. We're here to assist you!",
    "Thank you for your assistance.": "You're welcome! If you have any more questions or need further assistance, don't hesitate to contact us. Have a great day!",
  }
  getBotAnswer(msg:any){
    const userMessage = new Message('user',msg);
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot',this.getBotMessage(msg));
    setTimeout(()=>{
      this.conversation.next([botMessage])
    },1200); 
  }
  getBotMessage(question:string){
    let  answer = this.messageMap[question];
    return answer || this.messageMap['default']
  }
}
