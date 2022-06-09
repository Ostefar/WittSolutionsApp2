import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../service/notification-service';
import { Hours } from '../hours/Hours';
import { Price } from '../hours/Price';
import { HoursService } from '../service/hours.service';
import { Project } from '../projects/Project';
import { ProjectService } from '../service/project.service';
import { ExcelService } from '../service/excel.service';
import { Observable } from 'rxjs';

@Component({

  selector: 'app-projects',
  templateUrl: './registrate-hours.component.html',
  styleUrls: ['./registrate-hours.component.css']
})
export class RegistrateHoursComponent implements OnInit
{
  registrateHoursForm!: FormGroup;
  id!: number;
  project!: Project;
  hours: Hours[] = [];
  hoursPricing: Price[] = [];
  toggleRegistration = true;
  testInt = 2;
  hoursTotal!: number;
  hoursEst!: number;
  hourPrice!: number;
  projectPrice!: number;
  projectName!: string;
  CompanyName!: string;
  excel = [];


todaysDate = new Date();
  dd = String(this.todaysDate.getDate()).padStart(2, '0');
  mm = String(this.todaysDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.todaysDate.getFullYear();

today = this.yyyy + '-' + this.mm + '-' + this.dd;
 
  constructor(public fb: FormBuilder, private hoursService: HoursService, private projectService: ProjectService, private excelService: ExcelService, private http: HttpClient, private notifyService: NotificationService, private route: ActivatedRoute, private router: Router, private translate: TranslateService) {

  }

  exportHoursExcel(): void {
    this.excelService.exportAsExcelFile(this.hours, this.projectName + "_");
  }

  exportPriceExcel(): void {
    this.excelService.exportAsExcelFile(this.hoursPricing, this.projectName + "_");
  }


  private registrationForm() { 
    this.registrateHoursForm = this.fb.group({
      HoursToRegistrate: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(1), Validators.maxLength(2)]),
    RegistrationDate: new FormControl('', [Validators.required]),
    Note: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]),
    ProjectId: new FormControl(''),
    RegistrationDateString: new FormControl(''),
  });
  }

 
  ngOnInit(): void {
    this.today
    this.setDateAndId();
    this.registrationForm();
    this.GetAllRegistrations(this.id);

  }


  onSubmit()
  {
    if (this.registrateHoursForm.valid) {
      this.hoursService.create(this.registrateHoursForm.value)
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

  ToggleRegistration() {
    if (this.toggleRegistration == true) {
      this.toggleRegistration = false
    } else {
      this.toggleRegistration = true
    }
  }

  setDateAndId() {
      this.id = this.route.snapshot.params['id'];
      this.projectService.getById(this.id).subscribe((data: Project) => {
        this.project = data;
        this.hoursEst = this.project.estimatedHours
        this.hourPrice = this.project.hourPrice
        this.projectPrice = this.project.projectPrice
        this.projectName = this.project.projectName

    this.registrateHoursForm.setValue({
      HoursToRegistrate: "",
      RegistrationDate: this.today,
      RegistrationDateString: "",
      Note: '',
      ProjectId: this.id,
        
      });
    });
  }

  reload() {
    setTimeout(() => { this.router.navigateByUrl('/'); }, 1900);
    setTimeout(() => { this.router.navigateByUrl('/registrate-hours/' + this.id); }, 2000);
  }
  GetAllRegistrations(id: number) {
    this.hoursService.getAll(this.id).subscribe((data: Hours[]) => {
      this.hours = data;
      this.hoursTotal = this.hours.reduce((sum, current) => sum + current.hoursToRegistrate, 0);
      console.log(this.hours)
    })
  }

  DeleteRegistration(id: number) {
    this.hoursService.delete(id).subscribe(res => {
      this.showToasterSuccess();
      console.log('Project deleted successfully!');
    })
    this.reload();
  }

  showToasterSuccess() {
    this.notifyService.showSuccess(this.translate.instant("success.hoursregistrated"), this.translate.instant("success.success"))
  }

  showToasterSuccessOnDelete() {
    this.notifyService.showSuccess(this.translate.instant("success.hoursdeleted"), this.translate.instant("success.success"))
  }

  showToasterError() {
    this.notifyService.showError(this.translate.instant("error.errormessage"), this.translate.instant("error.error"))
  }

  get hoursToRegistrate() { return this.registrateHoursForm.get("HoursToRegistrate"); }

  get registrationDate() { return this.registrateHoursForm.get("RegistrationDate"); }

  get note() { return this.registrateHoursForm.get("Note"); }

  get projectId() { return this.registrateHoursForm.get("ProjectId"); }


}
