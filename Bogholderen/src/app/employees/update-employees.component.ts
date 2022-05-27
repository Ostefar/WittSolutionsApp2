import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { EmployeeService } from '../service/employee.service';
import { NotificationService } from '../service/notification-service';
import { Employee } from './Employee';

@Component({
  selector: 'app-employees',
  templateUrl: './update-employees.component.html',
  styleUrls: ['./update-employees.component.css']
})
export class UpdateEmployeesComponent implements OnInit
{
  id!: number;
  employee!: Employee;
  updateEmployeeForm!: FormGroup;


  constructor(public fb: FormBuilder, private employeeService: EmployeeService, private http: HttpClient, private notifyService: NotificationService, private route: ActivatedRoute, private router: Router, private translate: TranslateService) {
   
  }
  private updateForm() { 
    this.updateEmployeeForm = this.fb.group({
    Id: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    FirstName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    LastName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
    Phone: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    JobTitle: new FormControl(''),
    BirthDate: new FormControl('', [Validators.required]),
    HiringDate: new FormControl('', [Validators.required]),
    BirthDateString: new FormControl(''),
    HiringDateString: new FormControl(''),
    Salary: new FormControl('', [Validators.required]),
    VacationDays: new FormControl('', [Validators.required]),
    VacationDaysLeft: new FormControl('', [Validators.required]),
    SickDays: new FormControl('', [Validators.required]),
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

    this.employeeService.getById(this.id).subscribe((data: Employee) => {
      this.employee = data;
      this.updateEmployeeForm.setValue({
        Id: this.id,
        FirstName: this.employee.firstName,
        LastName: this.employee.lastName,
        Phone: this.employee.phone,
        Email: this.employee.email,
        JobTitle: this.employee.jobTitle,
        BirthDate: this.employee.birthDateString,
        HiringDate: this.employee.hiringDateString,
        BirthDateString: "0",
        HiringDateString: "0",
        Salary: this.employee.salary,
        VacationDays: this.employee.vacationDays,
        VacationDaysLeft: this.employee.vacationDaysLeft,
        SickDays: this.employee.sickDays,
        AddressLine1: this.employee.addressLine1,
        AddressLine2: this.employee.addressLine2,
        Country: this.employee.country,
        City: this.employee.city,
        ZipCode: this.employee.zipCode,
        
      });
    });
     
  }


  onSubmit()
  {
    if (this.updateEmployeeForm.valid) {
      this.employeeService.update(this.id, this.updateEmployeeForm.value)
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

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    } else {
      return new Date("0000-01-01")
    }
  }

  reload() {
    setTimeout( () => { this.router.navigateByUrl('/employees-overview'); }, 2000);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess(this.translate.instant("success.employeeupdated"), this.translate.instant("success.success"))
  }

  showToasterError() {
    this.notifyService.showError(this.translate.instant("error.errormessage"), this.translate.instant("error.error"))
  }


  get firstName() { return this.updateEmployeeForm.get("FirstName"); }

  get lastName() { return this.updateEmployeeForm.get("LastName"); }

  get phone() { return this.updateEmployeeForm.get("Phone"); }

  get email() { return this.updateEmployeeForm.get("Email"); }

  get jobTitle() { return this.updateEmployeeForm.get("JobTitle"); }

  get birthDate() { return this.updateEmployeeForm.get("BirthDate"); }

  get hiringDate() { return this.updateEmployeeForm.get("HiringDate"); }

  get salary() { return this.updateEmployeeForm.get("Salary"); }

  get vacationDays() { return this.updateEmployeeForm.get("VacationDay"); }

  get vacationDaysLeft() { return this.updateEmployeeForm.get("VacationDaysLeft"); }

  get sickDays() { return this.updateEmployeeForm.get("SickDays"); }

  get addressLine1() { return this.updateEmployeeForm.get("AddressLine1"); }

  get addressLine2() { return this.updateEmployeeForm.get("AddressLine2"); }

  get country() { return this.updateEmployeeForm.get("Country"); }

  get city() { return this.updateEmployeeForm.get("City"); }

  get zipCode() { return this.updateEmployeeForm.get("ZipCode"); }

}


 
