import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { Employee } from './Employee';
import { Router } from '@angular/router';
import { NotificationService } from '../service/notification-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-users',
  templateUrl: './employees-overview.component.html',
  styleUrls: ['./employees-overview.component.css']
})
export class EmployeesOverviewComponent implements OnInit {

  //to hold employees info from db
  employees: Employee[] = [];

  constructor(public fb: FormBuilder, private employeeService: EmployeeService, private http: HttpClient, private router: Router, private notifyService: NotificationService, private translate: TranslateService) {

  }

  ngOnInit(): void
  {
    this.GetAllEmployees();

  }

  GetAllEmployees() {
    this.employeeService.getAll().subscribe((data: Employee[]) => {
      this.employees = data;
      for (let employee of this.employees) {
        if (employee.jobTitle === 1) {
          employee.jobTitleString = "employees.consultent"
        } else if (employee.jobTitle === 2) {
          employee.jobTitleString = "employees.student"
        } else {
          employee.jobTitleString = "employees.fulltime"
        }
      }

      console.log(this.employees)
    })
  }

  DeleteEmployee(id: number)
  {
    this.employeeService.delete(id).subscribe(res => {
      this.showToasterSuccess();
      console.log('Employee deleted successfully!');
    })
    this.reload();
  }

  reload() {
    setTimeout(() => { this.router.navigateByUrl('/'); }, 1900);
    setTimeout(() => { this.router.navigateByUrl('/employees-overview'); }, 2000);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess(this.translate.instant("success.employeedeleted"), this.translate.instant("success.success"))
  }

  showToasterError() {
      this.notifyService.showError(this.translate.instant("error.errormessage"), this.translate.instant("error.error"))
  }
}

