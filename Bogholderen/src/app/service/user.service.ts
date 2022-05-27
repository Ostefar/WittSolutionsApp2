import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import { User } from "../users/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Api url for localhost
  readonly APIUrl = "user";
  //api url for azure hosting
  //private readonly APIUrl = "https://wittsolutionsapp2.azurewebsites.net/api/user";


  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.APIUrl + '/ViewUsers')
  }

  create(payload: User) {
    return this.http.post<User>(this.APIUrl + '/CreateUsers', payload
    );
  }

  delete(id: number) {
    return this.http.delete(this.APIUrl + '/DeleteUser' + id)
  }


  getById(id: number): Observable<any> {
    return this.http.get<User>(this.APIUrl + '/GetUserBy' + id)
  }

  update(id: number, payload: User) {
    return this.http.put<User>(this.APIUrl + '/UpdateUser' + id, payload);

  }
}
