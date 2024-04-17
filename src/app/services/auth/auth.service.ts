import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private User :any;
  //private readonly baseUrl:string=environment.url+"user/"
  private readonly baseUrl:string="http://localhost:8075/stage/user"
  private readonly baseUrl2:string="http://localhost:8075/stage/api/v1/auth/"

  token:string = ''; // Assign an initial value of an empty string to the 'token' property.
  public loggedUser:string = ''; // Assign an initial value of an empty string to the 'loggedUser' property.
  public isloggedIn: Boolean = false;
  public roles: string[] = [];
  private helper = new JwtHelperService();

  constructor(private router: Router,
    private httpClient : HttpClient
    ) { }

  public login(user : User){
    return this.httpClient.post(this.baseUrl2+"authenticate",user,{observe:'response'});
  }

  public addUser(data :any) {
    return this.httpClient.post(this.baseUrl+"/adminaddUser",data);

  }
  saveToken(token:string){
    localStorage.setItem('token',token);
    this.token = token;
    this.isloggedIn = true; 
    this.decodeJWT(); 
  }
  
  decodeJWT()
  {   if (this.token == undefined)
            return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
}

  public disableUser(email:string){
    const tokenUser = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenUser}`);
    return this.httpClient.put(`${this.baseUrl}disableUser/${email}`,null, { headers });
  }

  public enableUser(email:string){
    const tokenUser = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenUser}`);
    return this.httpClient.put(`${this.baseUrl}enableUser/${email}`,null, { headers });
  }


  public forgetPassword(email:string){
    const body ={email : email}
    return this.httpClient.post(this.baseUrl+"forgetPassword",body);
  }

  public resetPassword(data :any){
    return this.httpClient.post(this.baseUrl+"resetPassword",data);
  }

  public emailConfirmation(token :any){
    return this.httpClient.get(`${this.baseUrl}confirmMail/${token}`);
  }

  isTokenExpired(): Boolean
  {
    return  this.helper.isTokenExpired(this.token);
  }

  setLoggedUserFromLocalStorage(login : string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    this.getUserRoles(login);
  }

  getUserRoles(login :string){    
    
  }

  public retrieveUserConnected(token: string):void {
    const header= new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const user = this.httpClient.get(`${this.baseUrl}/currentUser`,{
      headers:header
    }).subscribe((user: any) => {

      this.User = user;
      console.log("retrieve User connected ", user);
    });

   console.log(user)

    
  }

  getCurrentUser() {
    // Get the token from local storage
    const token = localStorage.getItem('token');

    // Prepare the headers with Authorization token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Make the HTTP GET request to retrieve the current user
    return this.httpClient.get(`${this.baseUrl}/currentUser/${token}`, { headers });
  }
  public retrieveUser(email: any) {
    const tokenUser = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenUser}`);
    return this.httpClient.get(`${this.baseUrl}/RetrieveUser/${email}`, { headers });
  }

  public retrieveUsers() : Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl+"/all");
  }


  public deleteUser(email:string) {
    const tokenUser = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenUser}`);
    return this.httpClient.delete(`${this.baseUrl}"/deleteUser/{email}"${email}`, { headers });

  }

  // public editUser(data:any,email:string){
  //   const tokenUser = this.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenUser}`);
  //   return this.httpClient.put(`${this.baseUrl}editUser/${email}`,data, { headers });
  // }



  // public changePassword(data:any){
  //   const tokenUser = this.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenUser}`);
  //   return this.httpClient.post(this.baseUrl+"changePassword",data, { headers });
  // }



  // public ValidateToken(token: string,email:string) {
  //   return this.httpClient.get(`${this.baseUrl}validateToken/${email}/${token}`);
  // }

  public roleMatch(allowedRoles :any): boolean {
    let isMatch = false;
    const userRole = this.getRole() as string;
    if (userRole != null) {
      for (let i = 0; i < allowedRoles.length; i++) {
        if (allowedRoles[i] == userRole ) {
          isMatch = true;
          return isMatch;
        }
      }
      return isMatch;
    }
    return isMatch;
  }

  public setRole(role : string) {
    localStorage.setItem('role',role);
  }

  public getRole(): string {
    return JSON.parse(JSON.stringify(localStorage.getItem('role')));
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('token', jwtToken);
  }

  public getToken(): string {
    return JSON.parse(JSON.stringify(localStorage.getItem('token')));
  }

  public clear() {
    localStorage.clear();
  }

  public  isLoggedIn() : Observable <boolean> {
    return new Observable<boolean>(observer => { 
      this.isLoggedIn().subscribe((res: any) => { 
        if (res.status == 200) {
          observer.next(true);
        } else {
          observer.next(false);
        }
      });
    });
  }


}
