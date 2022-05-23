import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Employee } from "../employees/Employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // Api url for localhost
  readonly APIUrl = "employee";
  //api url for azure hosting
  //private readonly APIUrl = "https://wittsolutionsapp2.azurewebsites.net/api/employee";


  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.APIUrl + '/ViewEmployees')
  }

  create(payload: Employee) {
    return this.http.post<Employee>(this.APIUrl + '/CreateEmployee', payload
    );
  }

  delete(id: number) {
    return this.http.delete(this.APIUrl + '/DeleteEmployee' + id)
  }


  getById(id: number): Observable<any> {
    return this.http.get<Employee>(this.APIUrl + '/GetEmployeeBy' + id)
  }

  update(id: number, payload: Employee) {
    return this.http.put<Employee>(this.APIUrl + '/UpdateEmployee' + id, payload);

  }
}
