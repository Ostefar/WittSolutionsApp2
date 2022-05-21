import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../service/notification-service';
import { UserService } from '../service/user.service';
import { User } from './User';

@Component({
  selector: 'app-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./../../styles.css']
})
export class AddUsersComponent implements OnInit
{
  users: User[] = [];
  userList: any = [];
  addUserForm!: FormGroup;


  constructor(public fb: FormBuilder, private userService: UserService, private http: HttpClient, private notifyService: NotificationService, private router: Router) {
   
  }
  private createForm() { 
  this.addUserForm = this.fb.group({
    FirstName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    LastName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    UserName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    Password: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    Phone: new FormControl( [Validators.required, Validators.minLength(1), Validators.maxLength(8)]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    AddressLine1: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
    AddressLine2: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
    Country: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
    City: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
    ZipCode: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
  });
  }


  ngOnInit(): void
  {
    this.createForm();
  }


  onSubmit()
  {
    debugger
    if (this.addUserForm.valid) {
      this.userService.create(this.addUserForm.value)
        .subscribe(
          (data) => {
            this.showToasterSuccess();
            console.log('Form submitted successfully');
            console.log(this.addUserForm.value)
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
    setTimeout(() => { this.router.navigateByUrl('/users-overview'); }, 2000);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess("New user created", "Success!")
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


  

  /* get() {
    this.studentService.get()
      .subscribe({
        next: (data) => {
          this.students = data;
        },
        error: (err) => {
          console.log(err);
        }
      })
  } */

