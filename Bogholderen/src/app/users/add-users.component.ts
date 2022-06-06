import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../service/notification-service';
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


  constructor(public fb: FormBuilder, private userService: UserService, private http: HttpClient, private notifyService: NotificationService, private router: Router, private translate: TranslateService) {
   
  }
  private createForm() { 
  this.addUserForm = this.fb.group({
    FirstName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    LastName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    UserName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    Password: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    Phone: new FormControl( [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
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
    if (this.addUserForm.valid) {
      this.userService.create(this.addUserForm.value)
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
    setTimeout(() => { this.router.navigateByUrl('/users-overview'); }, 2000);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess(this.translate.instant("success.usercreated"), this.translate.instant("success.success"))
  }

  showToasterError() {
    this.notifyService.showError(this.translate.instant("error.errormessage"), this.translate.instant("error.error"))
  }

  get firstName() { return this.addUserForm.get("FirstName"); }

  get lastName() { return this.addUserForm.get("LastName"); }

  get userName() { return this.addUserForm.get("UserName"); }

  get password() { return this.addUserForm.get("Password"); }

  get phone() { return this.addUserForm.get("Phone"); }

  get email() { return this.addUserForm.get("Email"); }

  get addressLine1() { return this.addUserForm.get("AddressLine1"); }

  get addressLine2() { return this.addUserForm.get("AddressLine2"); }

  get country() { return this.addUserForm.get("Country"); }

  get city() { return this.addUserForm.get("City"); }

  get zipCode() { return this.addUserForm.get("ZipCode"); }
}
