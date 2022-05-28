import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../service/customer.service';
import { Customer } from './Customer';
import { Router } from '@angular/router';
import { NotificationService } from '../service/notification-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers-overview.component.html',
  styleUrls: ['./customers-overview.component.css']
})
export class CustomersOverviewComponent implements OnInit {

  //to hold customers info from db
  customers: Customer[] = [];

  constructor(public fb: FormBuilder, private customerService: CustomerService, private http: HttpClient, private router: Router, private notifyService: NotificationService, private translate: TranslateService) {

  }

  ngOnInit(): void
  {
    this.GetAllCustomers();

  }

  GetAllCustomers() {
    this.customerService.getAll().subscribe((data: Customer[]) => {
      this.customers = data;
      console.log(this.customers)
    })
  }

  DeleteCustomer(id: number)
  {
    this.customerService.delete(id).subscribe(res => {
      this.showToasterSuccess();
      console.log('Customer deleted successfully!');
    })
    this.reload();
  }

  reload() {
    setTimeout(() => { this.router.navigateByUrl('/'); }, 1900);
    setTimeout(() => { this.router.navigateByUrl('/customers-overview'); }, 2000);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess(this.translate.instant("success.customerdeleted"), this.translate.instant("success.success"))
  }

  showToasterError() {
      this.notifyService.showError(this.translate.instant("error.errormessage"), this.translate.instant("error.error"))
  }
}

