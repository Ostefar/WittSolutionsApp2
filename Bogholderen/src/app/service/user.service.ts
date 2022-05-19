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
  //readonly APIUrl = "user";
  //api for azure hosting
  private readonly APIUrl: string = environment.baseApiUrl;


  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.APIUrl + '/ViewUsers') // skal nok være '/user/ViewUsers'
  }

  post(payload: User) {
    debugger
    return this.http.post<User>(
      this.APIUrl + '/CreateUsers',
      payload
    );
  }

  delete(id: number) {
    return this.http.delete(this.APIUrl + '/DeleteUser' + id)
  }

  /*getStudentList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Student');
  }
  addStudent(val: any) {
    return this.http.post(this.APIUrl + '/Student', val);
  }
  updateStudent(val: any) {
    return this.http.put(this.APIUrl + '/Student', val);
  }
  deleteStudent(id: any) {
    return this.http.delete(this.APIUrl + '/Student/' + id);
  }
  getDepartmentList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Department');
  }
  addDepartment(val: any) {
    return this.http.post(this.APIUrl + '/Department', val);
  }
  updateDepartment(val: any) {
    return this.http.put(this.APIUrl + '/Department', val);
  }
  deleteDepartment(id: any) {
    return this.http.delete(this.APIUrl + '/Department/' + id);*/
}
