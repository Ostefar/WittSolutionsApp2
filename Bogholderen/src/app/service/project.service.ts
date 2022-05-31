import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Project } from "../projects/Project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  // Api url for localhost
  readonly APIUrl = "project";
  //api url for azure hosting
  //private readonly APIUrl = "https://wittsolutionsapp2.azurewebsites.net/api/project";


  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.APIUrl + '/ViewProjects')
  }

  getCustomers(): Observable<any> {
    return this.http.get(this.APIUrl + '/GetAllCustomerNames')
  }
  getEmployees(): Observable<any> {
    return this.http.get(this.APIUrl + '/GetAllEmployeeNames')
  }
  getProjects(): Observable<any> {
    return this.http.get(this.APIUrl + '/GetAllProjectNames')
  }

  create(payload: Project) {
    return this.http.post<Project>(this.APIUrl + '/CreateProject', payload
    );
  }

  delete(id: number) {
    return this.http.delete(this.APIUrl + '/DeleteProject' + id)
  }


  getById(id: number): Observable<any> {
    return this.http.get<Project>(this.APIUrl + '/GetProjectBy' + id)
  }

  update(id: number, payload: Project) {
    return this.http.put<Project>(this.APIUrl + '/UpdateProject' + id, payload);

  }
}
