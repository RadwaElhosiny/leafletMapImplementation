import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {LoginHttpService} from "../../../core/http/login/login-http.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private loginHttpService: LoginHttpService) { }

  private getUsersLoginData(): Observable<any> {
    return this.loginHttpService.getUsersLoginData();
  }

  public login(loginData: {email: string, password: string}): Promise<number | null> {
    let userId = null;
    return new Promise<number | null>((resolve => {
      this.getUsersLoginData().subscribe((usersData) => {
        for (let i = 0; i < usersData.length; i++) {
          if (loginData.email === usersData[i].email && loginData.password === usersData[i].password) {
            userId = usersData[i].id;
            break;
          }
          else {
            userId = null;
          }
        }
        resolve(userId);
      });
    }));
  }

  public createAccessToken() {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const lengthOfCode = 40;
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
