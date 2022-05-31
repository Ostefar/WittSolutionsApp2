import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from './User';
import { Router } from '@angular/router';
import { NotificationService } from '../service/notification-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-users',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./../../styles.css']
})
export class UsersOverviewComponent implements OnInit {

  users: User[] = [];

  constructor(public fb: FormBuilder, private userService: UserService, private http: HttpClient, private router: Router, private notifyService: NotificationService, private translate: TranslateService) {

  }

  ngOnInit(): void
  {
    this.GetAllUsers();

  }

  GetAllUsers() {
    this.userService.getAll().subscribe((data: User[]) => {
      this.users = data;
      console.log(this.users)
    })
  }

  DeleteUser(id: number)
  {
    this.userService.delete(id).subscribe(res => {
      this.showToasterSuccess();
      console.log('User deleted successfully!');
    })
    this.reload();
  }

  reload() {
    setTimeout(() => { this.router.navigateByUrl('/'); }, 1900);
    setTimeout(() => { this.router.navigateByUrl('/users-overview'); }, 2000);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess(this.translate.instant("success.userdeleted"), this.translate.instant("success.success"))
  }

  showToasterError() {
    this.notifyService.showError(this.translate.instant("error.errormessage"), this.translate.instant("error.error"))
  }

}

