import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from './User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.css']
})
export class UsersOverviewComponent implements OnInit {

  //to hold users info from db
  users: User[] = [];

  constructor(public fb: FormBuilder, private userService: UserService, private http: HttpClient, private router: Router) {

  }

  ngOnInit(): void
  {
    this.GetAllUsers();

  }

  GetAllUsers() {
    this.userService.getAll().subscribe((data: User[]) => {
      this.users = data;
      console.log(this.users);
    })
  }

  DeleteUser(id: any)
  {
  }

  UpdateUser()
  {
  }
}

