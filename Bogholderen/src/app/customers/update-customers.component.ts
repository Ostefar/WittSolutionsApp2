import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { CustomerService } from '../service/customer.service';
import { NotificationService } from '../service/notification-service';
import { Customer } from './Customer';

@Component({
  selector: 'app-customers',
  templateUrl: './update-customers.component.html',
  styleUrls: ['./update-customers.component.css']
})
export class UpdateCustomersComponent implements OnInit
{
  id!: number;
  customer!: Customer;
  updateCustomerForm!: FormGroup;


  constructor(public fb: FormBuilder, private customerService: CustomerService, private http: HttpClient, private notifyService: NotificationService, private route: ActivatedRoute, private router: Router, private translate: TranslateService) {
   
  }
  private updateForm() { 
    this.updateCustomerForm = this.fb.group({
    Id: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    CompanyName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    WebsiteUrl: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(75)]),
    ContactPersonName: new FormControl('', [Validators.required]),
    Phone: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    VatNumber: new FormControl('', [Validators.required]),
    AddressLine1: new FormControl("",[Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
    AddressLine2: new FormControl("",[Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
    Country: new FormControl("",[Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
    City: new FormControl("",[Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
    ZipCode: new FormControl("",[Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
  });
  }


  ngOnInit(): void
  {
    this.updateForm();
    this.getById()
    
  }

  getById() {
    this.id = this.route.snapshot.params['id'];

    this.customerService.getById(this.id).subscribe((data: Customer) => {
      this.customer = data;
      this.updateCustomerForm.setValue({
        Id: this.id,
        CompanyName: this.customer.companyName,
        WebsiteUrl: this.customer.websiteUrl,
        ContactPersonName: this.customer.contactPersonName,
        Phone: this.customer.phone,
        Email: this.customer.email,
        VatNumber: this.customer.vatNumber,
        AddressLine1: this.customer.addressLine1,
        AddressLine2: this.customer.addressLine2,
        Country: this.customer.country,
        City: this.customer.city,
        ZipCode: this.customer.zipCode,
        
      });
    });
     
  }


  onSubmit()
  {
    if (this.updateCustomerForm.valid) {
      this.customerService.update(this.id, this.updateCustomerForm.value)
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
    setTimeout( () => { this.router.navigateByUrl('/customers-overview'); }, 2000);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess(this.translate.instant("success.employeeupdated"), this.translate.instant("success.success"))
  }

  showToasterError() {
    this.notifyService.showError(this.translate.instant("error.errormessage"), this.translate.instant("error.error"))
  }


  get companyName() { return this.updateCustomerForm.get("CompanyName"); }

  get websiteUrl() { return this.updateCustomerForm.get("WebsiteUrl"); }

  get contactPersonName() { return this.updateCustomerForm.get("ContactPersonName"); }

  get phone() { return this.updateCustomerForm.get("Phone"); }

  get email() { return this.updateCustomerForm.get("Email"); }

  get vatNumber() { return this.updateCustomerForm.get("VatNumber"); }

  get addressLine1() { return this.updateCustomerForm.get("AddressLine1"); }

  get addressLine2() { return this.updateCustomerForm.get("AddressLine2"); }

  get country() { return this.updateCustomerForm.get("Country"); }

  get city() { return this.updateCustomerForm.get("City"); }

  get zipCode() { return this.updateCustomerForm.get("ZipCode"); }

}


 
