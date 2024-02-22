import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private User :any;
  //private readonly baseUrl:string=environment.url+"user/"
  private readonly baseUrl:string="http://localhost:8075/stage/user/"
  private readonly baseUrl2:string="http://localhost:8075/stage//api/v1/auth/"

  constructor(
    private httpClient : HttpClient
    ) { }

  public login(email:string , password:string){
    const body ={email : email, password: password}
    return this.httpClient.post(this.baseUrl2+"authenticate",body);
  }

  // public forgetPassword(email:string){
  //   const body ={email : email}
  //   return this.httpClient.post(this.baseUrl+"forgetPassword",body);
  // }

  // public resetPassword(data :any){
  //   return this.httpClient.post(this.baseUrl+"resetPassword",data);
  // }

  // public emailConfirmation(token :any){
  //   return this.httpClient.get(`${this.baseUrl}confirmMail/${token}`);
  // }

  public isTokenExpired(token :any){
    return this.httpClient.get(`${this.baseUrl}isTokenExpired/${token}`);
  }

  public retrieveUserConnected(token: string) {
    const tokenUser = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenUser}`);

    return this.httpClient.get(`${this.baseUrl}userConnected/${token}`, { headers });
  }
  public retrieveUser(email: any) {
    const tokenUser = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenUser}`);
    return this.httpClient.get(`${this.baseUrl}RetrieveUser/${email}`, { headers });
  }

  public retrieveUsers(page: any) {
    const tokenUser = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenUser}`);
    return this.httpClient.get(`${this.baseUrl}RetrieveAdmins/${page}`, { headers });
  }



  public addUser(data :any) {
    const tokenUser = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenUser}`);
    return this.httpClient.post(`${this.baseUrl2}register`,data, { headers });

  }


  // public deleteUser(email:string) {
  //   const tokenUser = this.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenUser}`);
  //   return this.httpClient.delete(`${this.baseUrl}"/deleteUser/{email}"${email}`, { headers });

  // }

  // public editUser(data:any,email:string){
  //   const tokenUser = this.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenUser}`);
  //   return this.httpClient.put(`${this.baseUrl}editUser/${email}`,data, { headers });
  // }

  // public disableUser(email:string){
  //   const tokenUser = this.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenUser}`);
  //   return this.httpClient.put(`${this.baseUrl}disableUser/${email}`,null, { headers });
  // }

  // public enableUser(email:string){
  //   const tokenUser = this.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenUser}`);
  //   return this.httpClient.put(`${this.baseUrl}enableUser/${email}`,null, { headers });
  // }


  // public changePassword(data:any){
  //   const tokenUser = this.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenUser}`);
  //   return this.httpClient.post(this.baseUrl+"changePassword",data, { headers });
  // }



  // public ValidateToken(token: string,email:string) {
  //   return this.httpClient.get(`${this.baseUrl}validateToken/${email}/${token}`);
  // }

  // public roleMatch(allowedRoles :any): boolean {
  //   let isMatch = false;
  //   const userRole = this.getRole() as string;
  //   if (userRole != null) {
  //     for (let i = 0; i < allowedRoles.length; i++) {
  //       if (allowedRoles[i] == userRole ) {
  //         isMatch = true;
  //         return isMatch;
  //       }
  //     }
  //     return isMatch;
  //   }
  //   return isMatch;
  // }


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

  // public clear() {
  //   localStorage.clear();
  // }

  // public isLoggedIn() {
  //   return this.getRole() && this.getToken();
  // }


}
