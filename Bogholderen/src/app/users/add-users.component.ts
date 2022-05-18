import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from './User';

@Component({
  selector: 'app-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit
{
  users: User[] = [];
  userList: any = [];
  addUserForm!: FormGroup;


  constructor(public fb: FormBuilder, private userService: UserService, private http: HttpClient) {
   
  }
  private createForm() { 
  this.addUserForm = this.fb.group({
    Id: new FormControl(''),
    FirstName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    LastName: new FormControl(''),
    UserName: new FormControl(''),
    Password: new FormControl(''),
    Phone: new FormControl(''),
    Email: new FormControl(''),
    AddressId: new FormControl(''),
  });
  }


  ngOnInit(): void
  {
    this.createForm();
  }


  onSubmit()
  {
    debugger
    this.userService.post(this.addUserForm.value)
      .subscribe(
        (data) => {
          console.log('Form submitted successfully');
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }
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

