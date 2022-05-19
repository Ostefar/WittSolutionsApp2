import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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


  constructor(public fb: FormBuilder, private userService: UserService, private http: HttpClient, private notifyService: NotificationService) {
   
  }
  private createForm() { 
  this.addUserForm = this.fb.group({
    FirstName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    LastName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    UserName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    Password: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    Phone: new FormControl( [Validators.required, Validators.minLength(1), Validators.maxLength(8)]),
    Email: new FormControl( '' , [Validators.required, Validators.email]),
    Address_id: new FormControl([Validators.required, Validators.minLength(1), Validators.maxLength(2)]),
  });
  }


  ngOnInit(): void
  {
    this.createForm();
  }


  onSubmit()
  {
    if (this.addUserForm.valid) {
      this.userService.post(this.addUserForm.value)
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
    //this.reload();
  }

  reload() {
    setTimeout(function () { location.reload(); }, 2000);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess("New user created", "Success!")
  }

  showToasterError() {
    this.notifyService.showError("Something is wrong", "Error!")
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

