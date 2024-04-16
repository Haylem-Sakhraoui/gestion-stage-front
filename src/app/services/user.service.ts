import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Userstat } from '../models/userStat';

@Injectable({
  providedIn: 'root'
})

export class userService {
  private User: any;
  //private readonly baseUrl:string=environment.url+"user/"
  private readonly baseUrl: string = "http://localhost:8075/stage/user"

  token: string = ''; // Assign an initial value of an empty string to the 'token' property.
  public loggedUser: string = ''; // Assign an initial value of an empty string to the 'loggedUser' property.
  public isloggedIn: Boolean = false;
  public roles: string[] = [];
  private helper = new JwtHelperService();

  constructor(private router: Router,
    private httpClient: HttpClient
  ) { }



  public addUser(data: any) {
    return this.httpClient.post(this.baseUrl + "/adminaddUser", data);

  }

public getUserStatistics(){
  return this.httpClient.get<Userstat[]>(this.baseUrl + "/stat");
}
  public disableUser(email: string) {
    const body = { email: email }
    return this.httpClient.put(this.baseUrl+ "/disableUser", body);
  }

  public enableUser(email: string) {
    const body = { email: email }
    return this.httpClient.put(this.baseUrl+ "/enableUser", body);
  }


  public forgetPassword(email: string) {
    const body = { email: email }
    return this.httpClient.post(this.baseUrl + "/forgetPassword", body);
  }

  public resetPassword(data: any) {
    return this.httpClient.post(this.baseUrl + "/resetPassword", data);
  }


  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }


  public retrieveUserConnected(token: string): Observable<any> {
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(`${this.baseUrl}/currentUser`, {
      headers: header
    }).pipe(
      tap((user: any) => {
        this.User = user;
        console.log("retrieve User connected ", user);
      })
    );
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

  public retrieveUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + "/all");
  }

  public retrieveStudents(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + "/student");
  }
  public retrieveSupervisors(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + "/supervisor");
  }
  public retrieveService(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + "/servicestage");
  }






  public deleteUser(email: string) {
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

  public roleMatch(allowedRoles: any): boolean {
    let isMatch = false;
    const userRole = this.getRole() as string;
    if (userRole != null) {
      for (let i = 0; i < allowedRoles.length; i++) {
        if (allowedRoles[i] == userRole) {
          isMatch = true;
          return isMatch;
        }
      }
      return isMatch;
    }
    return isMatch;
  }

  public setRole(role: string) {
    localStorage.setItem('role', role);
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

  public isLoggedIn(): Observable<boolean> {
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
