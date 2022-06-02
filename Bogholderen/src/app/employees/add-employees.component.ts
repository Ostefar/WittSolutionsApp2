import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../service/notification-service';
import { EmployeeService } from '../service/employee.service';
import { Employee } from './Employee';

@Component({
  selector: 'app-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent implements OnInit
{
  employees: Employee[] = [];
  employeeList: any = [];
  addEmployeeForm!: FormGroup;


  constructor(public fb: FormBuilder, private employeeService: EmployeeService, private http: HttpClient, private notifyService: NotificationService, private router: Router, private translate: TranslateService) {
   
  }
  private createForm() { 
  this.addEmployeeForm = this.fb.group({
    FirstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(2), Validators.maxLength(50)]),
    LastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(2), Validators.maxLength(50)]),
    Phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8), Validators.maxLength(8)]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    JobTitle: new FormControl(''),
    BirthDate: new FormControl('', [Validators.required]),
    HiringDate: new FormControl('', [Validators.required]),
    BirthDateString: new FormControl(''),
    HiringDateString: new FormControl(''),
    Salary: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    VacationDays: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    VacationDaysLeft: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    SickDays: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    AddressLine1: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(65)]),
    AddressLine2: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(65)]),
    Country: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(1), Validators.maxLength(40)]),
    City: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(2), Validators.maxLength(40)]),
    ZipCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(4), Validators.maxLength(4)]),
  });
  }


  ngOnInit(): void
  {
    this.createForm();
  }


  onSubmit()
  {
    if (this.addEmployeeForm.valid) {
      this.employeeService.create(this.addEmployeeForm.value)
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
    setTimeout(() => { this.router.navigateByUrl('/employees-overview'); }, 2000);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess(this.translate.instant("success.employeecreated"), this.translate.instant("success.success"))
  }

  showToasterError() {
    this.notifyService.showError(this.translate.instant("error.errormessage"), this.translate.instant("error.error"))
  }

  get firstName() { return this.addEmployeeForm.get("FirstName"); }

  get lastName() { return this.addEmployeeForm.get("LastName"); }

  get phone() { return this.addEmployeeForm.get("Phone"); }

  get email() { return this.addEmployeeForm.get("Email"); }

  get jobTitle() { return this.addEmployeeForm.get("JobTitle"); }

  get birthDate() { return this.addEmployeeForm.get("BirthDate"); }

  get hiringDate() { return this.addEmployeeForm.get("HiringDate"); }

  get salary() { return this.addEmployeeForm.get("Salary"); }

  get vacationDays() { return this.addEmployeeForm.get("VacationDays"); }

  get vacationDaysLeft() { return this.addEmployeeForm.get("VacationDaysLeft"); }

  get sickDays() { return this.addEmployeeForm.get("SickDays"); }

  get addressLine1() { return this.addEmployeeForm.get("AddressLine1"); }

  get addressLine2() { return this.addEmployeeForm.get("AddressLine2"); }

  get country() { return this.addEmployeeForm.get("Country"); }

  get city() { return this.addEmployeeForm.get("City"); }

  get zipCode() { return this.addEmployeeForm.get("ZipCode"); }
}
