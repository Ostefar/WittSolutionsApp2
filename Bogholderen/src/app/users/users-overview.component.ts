import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from './User';
import { Router } from '@angular/router';
import { NotificationService } from '../service/notification-service';

@Component({
  selector: 'app-users',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.css']
})
export class UsersOverviewComponent implements OnInit {

  //to hold users info from db
  users: User[] = [];

  constructor(public fb: FormBuilder, private userService: UserService, private http: HttpClient, private router: Router, private notifyService: NotificationService) {

  }

  ngOnInit(): void
  {
    this.GetAllUsers();

  }

  GetAllUsers() {
    this.userService.getAll().subscribe((data: User[]) => {
      this.users = data;
      //console.log(this.users);
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

  UpdateUser()
  {
  }

  reload() {
    setTimeout(function () { location.reload(); }, 2000);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess("User deleted", "Success!")
  }

  showToasterError() {
    this.notifyService.showError("Something went wrong", "Error!")
  }

  /*showToasterInfo() {
    this.notifyService.showInfo("This is info", "New user")
  }

  showToasterWarning() {
    this.notifyService.showWarning("This is warning", "New user")
  }*/
}

