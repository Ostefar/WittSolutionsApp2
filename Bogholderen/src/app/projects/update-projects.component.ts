import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { ProjectService } from '../service/project.service';
import { NotificationService } from '../service/notification-service';
import { Project } from './Project';
import { Customer } from '../customers/Customer';
import { Employee } from '../employees/Employee';

@Component({
  selector: 'app-projects',
  templateUrl: './update-projects.component.html',
  styleUrls: ['./update-projects.component.css']
})
export class UpdateProjectsComponent implements OnInit
{
  id!: number;
  project!: Project;
  updateProjectForm!: FormGroup;
  customers: Customer[] = [];
  employees: Employee[] = [];


  constructor(public fb: FormBuilder, private projectService: ProjectService, private http: HttpClient, private notifyService: NotificationService, private route: ActivatedRoute, private router: Router, private translate: TranslateService) {
   
  }
  private updateForm() { 
    this.updateProjectForm = this.fb.group({
    Id: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
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
    this.updateForm();
    this.getById()
    
  }

  getById() {
    this.id = this.route.snapshot.params['id'];

    this.projectService.getById(this.id).subscribe((data: Project) => {
      this.project = data;
      this.updateProjectForm.setValue({
        Id: this.id,
        ProjectName: this.project.projectName,
        Note: this.project.note,
        StartDate: this.project.startDateString,
        DeadlineDate: this.project.deadlineDateString,
        EstimatedHours: this.project.estimatedHours,
        HourPrice: this.project.hourPrice,
        ProjectPrice: this.project.projectPrice,
        HoursSpend: this.project.hoursSpend,
        CustomerId: this.project.customerId,
        EmployeeId: this.project.employeeId,
        StartDateString: "0",
        DeadlineDateString: "0",

      });
    });
     
  }


  onSubmit()
  {
    if (this.updateProjectForm.valid) {
      this.projectService.update(this.id, this.updateProjectForm.value)
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
    setTimeout( () => { this.router.navigateByUrl('/projects-overview'); }, 2000);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess(this.translate.instant("success.projectupdated"), this.translate.instant("success.success"))
  }

  showToasterError() {
    this.notifyService.showError(this.translate.instant("error.errormessage"), this.translate.instant("error.error"))
  }


  get projectName() { return this.updateProjectForm.get("ProjectName"); }

  get note() { return this.updateProjectForm.get("Note"); }

  get startDate() { return this.updateProjectForm.get("StartDate"); }

  get deadlineDate() { return this.updateProjectForm.get("DeadlineDate"); }

  get estimatedHours() { return this.updateProjectForm.get("EstimatedHours"); }

  get hourPrice() { return this.updateProjectForm.get("HourPrice"); }

  get projectPrice() { return this.updateProjectForm.get("ProjectPrice"); }

  get hoursSpend() { return this.updateProjectForm.get("HoursSpend"); }

  get customerId() { return this.updateProjectForm.get("CustomerId"); }

  get employeeId() { return this.updateProjectForm.get("EmployeeId"); }

}


 
