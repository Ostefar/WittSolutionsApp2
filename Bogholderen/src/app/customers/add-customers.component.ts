import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../service/notification-service';
import { CustomerService } from '../service/customer.service';
import { Customer } from './Customer';

@Component({
  selector: 'app-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.css']
})
export class AddCustomersComponent implements OnInit
{
  customers: Customer[] = [];
  customerList: any = [];
  addCustomerForm!: FormGroup;


  constructor(public fb: FormBuilder, private customerService: CustomerService, private http: HttpClient, private notifyService: NotificationService, private router: Router, private translate: TranslateService) {
   
  }
  private createForm() { 
  this.addCustomerForm = this.fb.group({
    CompanyName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    WebsiteUrl: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(75)]),
    ContactPersonName: new FormControl('', [Validators.required]),
    Phone: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    VatNumber: new FormControl('', [Validators.required]),
    AddressLine1: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
    AddressLine2: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
    Country: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
    City: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
    ZipCode: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
  });
  }


  ngOnInit(): void
  {
    this.createForm();
  }


  onSubmit()
  {
    if (this.addCustomerForm.valid) {
      this.customerService.create(this.addCustomerForm.value)
        .subscribe(
          (data) => {
            this.showToasterSuccess();
            console.log('Form submitted successfully');
          },
          (error: HttpErrorResponse) => {
            this.showToasterError();
            console.log(error);
          }
      );

    } else {
      this.showToasterError();
    }
    this.reload();
  }

  reload() {
    setTimeout(() => { this.router.navigateByUrl('/customers-overview'); }, 2000);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess(this.translate.instant("success.customercreated"), this.translate.instant("success.success"))
  }

  showToasterError() {
    this.notifyService.showError(this.translate.instant("error.errormessage"), this.translate.instant("error.error"))
  }

  get companyName() { return this.addCustomerForm.get("CompanyName"); }

  get websiteUrl() { return this.addCustomerForm.get("WebsiteUrl"); }

  get contactPersonName() { return this.addCustomerForm.get("ContactPersonName"); }

  get phone() { return this.addCustomerForm.get("Phone"); }

  get email() { return this.addCustomerForm.get("Email"); }

  get vatNumber() { return this.addCustomerForm.get("VatNumber"); }

  get addressLine1() { return this.addCustomerForm.get("AddressLine1"); }

  get addressLine2() { return this.addCustomerForm.get("AddressLine2"); }

  get country() { return this.addCustomerForm.get("Country"); }

  get city() { return this.addCustomerForm.get("City"); }

  get zipCode() { return this.addCustomerForm.get("ZipCode"); }
}
