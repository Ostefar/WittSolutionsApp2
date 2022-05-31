import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Customer } from '../customers/Customer';
import { Employee } from '../employees/Employee';
import { NotificationService } from '../service/notification-service';
import { ProjectService } from '../service/project.service';
import { Project } from './Project';

@Component({
  selector: 'app-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.css']
})
export class AddProjectsComponent implements OnInit
{
  custId: any;
  companyName: any;
  Project: Project[] = [];
  projectList: any = [];
  addProjectForm!: FormGroup;
  customers: Customer[] = [];
  employees: Employee[] = [];


  constructor(public fb: FormBuilder, private projectService: ProjectService, private http: HttpClient, private notifyService: NotificationService, private router: Router, private translate: TranslateService) {
   
  }
  private createForm() { 
    this.addProjectForm = this.fb.group({
    ProjectName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
    Note: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]),
    StartDate: new FormControl('', [Validators.required]),
    DeadlineDate: new FormControl('', [Validators.required]),
    EstimatedHours: new FormControl('', [Validators.required]),
    HourPrice: new FormControl('', [Validators.required]),
    ProjectPrice: new FormControl('', [Validators.required]),
    HoursSpend: new FormControl('', [Validators.required]),
    EmployeeId: new FormControl('', [Validators.required]),
    CustomerId: new FormControl('', [Validators.required]),
    StartDateString: new FormControl(''),
    DeadlineDateString: new FormControl(''),
  
  });
  }


  ngOnInit(): void
  {
    this.getAllCustomers();
    this.getAllEmployees();
    this.createForm();
  }


  onSubmit()
  {
    if (this.addProjectForm.valid) {
      this.projectService.create(this.addProjectForm.value)
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

 getAllCustomers() {
    this.projectService.getCustomers().subscribe((data: Customer[]) => {
      this.customers = data;
      console.log(this.customers)
    })
  }
  getAllEmployees() {
    this.projectService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
      console.log(this.employees)
    })
  }


  reload() {
    setTimeout(() => { this.router.navigateByUrl('/projects-overview'); }, 2000);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess(this.translate.instant("success.projectcreated"), this.translate.instant("success.success"))
  }

  showToasterError() {
    this.notifyService.showError(this.translate.instant("error.errormessage"), this.translate.instant("error.error"))
  }

  get projectName() { return this.addProjectForm.get("ProjectName"); }

  get note() { return this.addProjectForm.get("Note"); }

  get startDate() { return this.addProjectForm.get("StartDate"); }

  get deadlineDate() { return this.addProjectForm.get("DeadlineDate"); }

  get estimatedHours() { return this.addProjectForm.get("EstimatedHours"); }

  get hourPrice() { return this.addProjectForm.get("HourPrice"); }

  get projectPrice() { return this.addProjectForm.get("ProjectPrice"); }

  get hoursSpend() { return this.addProjectForm.get("HoursSpend"); }

  get customerId() { return this.addProjectForm.get("CustomerId"); }

  get employeeId() { return this.addProjectForm.get("EmployeeId"); }

}
