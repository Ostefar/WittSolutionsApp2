import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HoursService } from '../service/hours.service';
import { NotificationService } from '../service/notification-service';
import { Hours } from './Hours';
import { Customer } from '../customers/Customer';
import { Employee } from '../employees/Employee';

@Component({
  selector: 'app-hours',
  templateUrl: './update-hours.component.html',
  styleUrls: ['./update-hours.component.css']
})
export class UpdateHoursComponent implements OnInit
{
  projectIdHolder!: number;
  id!: number;
  hours!: Hours;
  updateHoursForm!: FormGroup;
  customers: Customer[] = [];
  employees: Employee[] = [];


  constructor(public fb: FormBuilder, private hoursService: HoursService, private http: HttpClient, private notifyService: NotificationService, private route: ActivatedRoute, private router: Router, private translate: TranslateService) {
   
  }
  private updateForm() { 
    this.updateHoursForm = this.fb.group({
      Id: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
      HoursToRegistrate: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]),
      RegistrationDate: new FormControl('', [Validators.required]),
      Note: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]),
      ProjectId: new FormControl(''),
      CustomerId: new FormControl(''),
      EmployeeId: new FormControl(''),
      RegistrationDateString: new FormControl(''),
  });
  }


  ngOnInit(): void
  {
    this.updateForm();
    this.getById()
    
  }

  getById() {
    this.id = this.route.snapshot.params['id'];

    this.hoursService.getById(this.id).subscribe((data: Hours) => {
      this.hours = data;
      this.updateHoursForm.setValue({
        Id: this.id,
        HoursToRegistrate: this.hours.hoursToRegistrate,
        RegistrationDate: this.hours.registrationDateString,
        Note: this.hours.note,
        ProjectId: this.hours.projectId,
        CustomerId: this.hours.customerId,
        EmployeeId: this.hours.employeeId,
        RegistrationDateString: "",
        
      });
      this.projectIdHolder = this.hours.projectId;
    });
  }


  onSubmit()
  {
    if (this.updateHoursForm.valid) {
      this.hoursService.update(this.id, this.updateHoursForm.value)
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
    setTimeout(() => { this.router.navigateByUrl('/registrate-hours/' + this.projectIdHolder); }, 2000);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess(this.translate.instant("success.projectupdated"), this.translate.instant("success.success"))
  }

  showToasterError() {
    this.notifyService.showError(this.translate.instant("error.errormessage"), this.translate.instant("error.error"))
  }


  get hoursToRegistrate() { return this.updateHoursForm.get("HoursToRegistrate"); }

  get registrationDate() { return this.updateHoursForm.get("RegistrationDate"); }

  get note() { return this.updateHoursForm.get("Note"); }

  get projectId() { return this.updateHoursForm.get("ProjectId"); }
}


 
