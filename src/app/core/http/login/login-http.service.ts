import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginHttpService {

  constructor(private http: HttpClient) { }

  public getUsersLoginData(): Observable<any> {
    return this.http.get('./assets/files/users-data.json');
  }
}
