import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../service/project.service';
import { Router } from '@angular/router';
import { NotificationService } from '../service/notification-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-management',
  templateUrl: './management-overview.component.html',
  styleUrls: ['./management-overview.component.css']
})
export class ManagementOverviewComponent implements OnInit {


  constructor(public fb: FormBuilder, private projectService: ProjectService, private http: HttpClient, private router: Router, private notifyService: NotificationService, private translate: TranslateService) {

  }

  ngOnInit(): void
  {
    

  }

  reload() {
    setTimeout(() => { this.router.navigateByUrl('/'); }, 1900);
    setTimeout(() => { this.router.navigateByUrl('/management-overview'); }, 2000);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess(this.translate.instant("success.projectdeleted"), this.translate.instant("success.success"))
  }

  showToasterError() {
      this.notifyService.showError(this.translate.instant("error.errormessage"), this.translate.instant("error.error"))
  }
}

