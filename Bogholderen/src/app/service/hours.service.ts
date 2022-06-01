import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Hours } from "../hours/Hours";
import { Project } from "../projects/Project";

@Injectable({
  providedIn: 'root'
})
export class HoursService {
  // Api url for localhost
  readonly APIUrl = "hours";
  //api url for azure hosting
  //private readonly APIUrl = "https://wittsolutionsapp2.azurewebsites.net/api/hours";


  constructor(private http: HttpClient) { }

  create(payload: Hours) {
    return this.http.post<Hours>(this.APIUrl + '/RegistrateHours', payload
    );
  }
  getAll(id: number): Observable<any> {
    return this.http.get(this.APIUrl + '/ViewHours' + id)
  }

  delete(id: number) {
    return this.http.delete(this.APIUrl + '/DeleteRegistration' + id)
  }

  getById(id: number): Observable<any> {
    return this.http.get<Hours>(this.APIUrl + '/GetHoursById' + id)
  }

  update(id: number, payload: Hours) {
    return this.http.put<Hours>(this.APIUrl + '/UpdateHours' + id, payload);
  }
}
