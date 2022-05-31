import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Customer } from '../customers/Customer';
import { Employee } from '../employees/Employee';
import { NotificationService } from '../service/notification-service';
import { ProjectService } from '../service/project.service';
import { Hours } from './Hours';
import { Project } from './Project';

@Component({

  selector: 'app-projects',
  templateUrl: './registrate-hours.component.html',
  styleUrls: ['./registrate-hours.component.css']
})
export class RegistrateHoursComponent implements OnInit
{
  registrateHoursForm!: FormGroup;
  id!: number;
  hours!: Hours;

todaysDate = new Date();
  dd = String(this.todaysDate.getDate()).padStart(2, '0');
  mm = String(this.todaysDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.todaysDate.getFullYear();

today = this.mm + '-' + this.dd + '-' + this.yyyy;
 
  constructor(public fb: FormBuilder, private projectService: ProjectService, private http: HttpClient, private notifyService: NotificationService, private route: ActivatedRoute, private router: Router, private translate: TranslateService) {
   
  }

  private registrationForm() { 
    this.registrateHoursForm = this.fb.group({
    HoursToRegistrate: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]),
    RegistrationDate: new FormControl('', [Validators.required]),
    Note: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]),
    ProjectId: new FormControl(''),
  });
  }


  ngOnInit(): void {
    this.today
    this.setDateAndId();
    this.registrationForm();
    console.log("this is me:" + this.registrateHoursForm);
  }


  onSubmit()
  {
    if (this.registrateHoursForm.valid) {
      this.projectService.create(this.registrateHoursForm.value)
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

  setDateAndId() {
    this.id = this.route.snapshot.params['id'];
  this.projectService.getById(this.id).subscribe((data: Hours) => {
      this.hours = data;

    this.registrateHoursForm.setValue({
      HoursToRegistrate: '',
      RegistrationDate: this.today,
      Note: '',
      ProjectId: this.id,
        
      });
    });
  }

  reload() {
    setTimeout(() => { this.router.navigateByUrl('/projects-overview'); }, 2000);
  }

  showToasterSuccess() {
    // not translated success.hoursregistrated
    this.notifyService.showSuccess(this.translate.instant("success.hoursregistrated"), this.translate.instant("success.success"))
  }

  showToasterError() {
    this.notifyService.showError(this.translate.instant("error.errormessage"), this.translate.instant("error.error"))
  }

  get hoursToRegistrate() { return this.registrateHoursForm.get("HoursToRegistrate"); }

  get registrationDate() { return this.registrateHoursForm.get("RegistrationDate"); }

  get note() { return this.registrateHoursForm.get("Note"); }

  get projectId() { return this.registrateHoursForm.get("ProjectId"); }


}
