import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // be aware!
  // hardcoded user credentials for now
  userName: string = "test"
  password: string = "kode"

  constructor() {

  }

  login(userName: string, password: string): Observable<any>{
    //replace with real call to database
    if (userName == this.userName && password == this.password) {
      localStorage.setItem("token", "loggedin");
      return of(new HttpResponse({ status: 200 }));
    } else {
      return of(new HttpResponse({ status: 401 }));
    }
  }

  logOut(): void {
    localStorage.removeItem("token");
  }

  checkUserLoggedIn(): boolean {
    if (localStorage.getItem("token") != null) {
      return true;
    } else {
      return false;
    }
  }
}
