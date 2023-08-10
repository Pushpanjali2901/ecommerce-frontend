import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Path_of_Api = "http://localhost:9009";
  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  )
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService) { }

  public register(registerData: NgForm) {
    return this.httpclient.post(this.Path_of_Api + '/registerNewUser', registerData);
  }

  public login(loginData:NgForm){
    return this.httpclient.post(this.Path_of_Api + "/authenticate", loginData, { headers: this.requestHeader});
  }

  public forUser(){
    return this.httpclient.get(this.Path_of_Api + "/forUser", {responseType: "text"});
  }

  public forAdmin(){
    return this.httpclient.get(this.Path_of_Api + "/Admin", {responseType: "text"});
  }

  public roleMatch(allowedRoles:any):boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }

}
