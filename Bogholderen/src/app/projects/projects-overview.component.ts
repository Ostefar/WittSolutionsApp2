import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../service/project.service';
import { Project } from './Project';
import { Router } from '@angular/router';
import { NotificationService } from '../service/notification-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects-overview.component.html',
  styleUrls: ['./projects-overview.component.css']
})
export class ProjectsOverviewComponent implements OnInit {

  //to hold employees info from db
  projects: Project[] = [];

  constructor(public fb: FormBuilder, private projectService: ProjectService, private http: HttpClient, private router: Router, private notifyService: NotificationService, private translate: TranslateService) {

  }

  ngOnInit(): void
  {
    this.GetAllProjects();

  }

  GetAllProjects() {
    this.projectService.getAll().subscribe((data: Project[]) => {
      this.projects = data;
      console.log(this.projects)
    })
  }

  DeleteProject(id: number)
  {
    this.projectService.delete(id).subscribe(res => {
      this.showToasterSuccess();
      console.log('Project deleted successfully!');
    })
    this.reload();
  }

  reload() {
    setTimeout(() => { this.router.navigateByUrl('/'); }, 1900);
    setTimeout(() => { this.router.navigateByUrl('/projects-overview'); }, 2000);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess(this.translate.instant("success.projectdeleted"), this.translate.instant("success.success"))
  }

  showToasterError() {
      this.notifyService.showError(this.translate.instant("error.errormessage"), this.translate.instant("error.error"))
  }
}

