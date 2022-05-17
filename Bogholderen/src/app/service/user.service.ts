import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly APIUrl = "http://localhost:44459/add-users";

  constructor(private http: HttpClient) { }

  addUser(val: any) {
    return this.http.post(this.APIUrl + '/User', val);
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
