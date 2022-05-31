import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Customer } from "../customers/Customer";

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  // Api url for localhost
  readonly APIUrl = "management";
  //api url for azure hosting
  //private readonly APIUrl = "https://wittsolutionsapp2.azurewebsites.net/api/management";


  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.APIUrl + '/ViewCustomers')
  }

  create(payload: Customer) {
    return this.http.post<Customer>(this.APIUrl + '/CreateCustomer', payload
    );
  }

  delete(id: number) {
    return this.http.delete(this.APIUrl + '/DeleteCustomer' + id)
  }


  getById(id: number): Observable<any> {
    return this.http.get<Customer>(this.APIUrl + '/GetCustomerBy' + id)
  }

  update(id: number, payload: Customer) {
    return this.http.put<Customer>(this.APIUrl + '/UpdateCustomer' + id, payload);

  }
}
