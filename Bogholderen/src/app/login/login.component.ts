import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { LoginService } from '../service/login-service';
import { NotificationService } from '../service/notification-service';
import { UserService } from '../service/user.service';
import { User } from '../users/User';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  users: User[] = [];
  isLoggedIn = false;
  formusername!: string;
  formpassword!: string;

  constructor(private translate: TranslateService, private fb: FormBuilder, private userService: UserService, private loginService: LoginService, private notifyService: NotificationService, private router: Router) {
  }

  ngOnInit() {
    this.GetAllUsers();
    this.UserLoginForm();
    console.log(this.users)

  }

  UserLoginForm() {
    this.loginForm = this.fb.group({
      UserName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      Password: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    });
  }

  GetAllUsers() {
    this.userService.getAll().subscribe((data: User[]) => {
      this.users = data;
      console.log(this.users)
    })
  }

  onSubmit() {
    {
      if (this.loginForm.valid) {
        this.formusername = this.loginForm.get('UserName')?.value;
        this.formpassword = this.loginForm.get('Password')?.value;

        if (this.users.find(x => x.userName === this.formusername && x.password === this.formpassword)) {
          var userId = this.users.find(x => x.userName === this.formusername)?.id;
          localStorage.setItem("token", "" + userId);
          this.showToasterSuccess();
          this.navigateToProfile();
          console.log("this user exist")
        } else {
          this.showToasterError();
          this.reload();
        }
      }
    }
  }
  
  reload() {
  setTimeout(() => { this.router.navigateByUrl('/'); }, 1900);
  setTimeout(() => { this.router.navigateByUrl('/login'); }, 2000);
}

navigateToProfile() {
  setTimeout(() => { this.router.navigateByUrl('/profile'); }, 2000); 
}


showToasterSuccess() {
  this.notifyService.showSuccess(this.translate.instant("success.loggedin"), this.translate.instant("success.success"))
}

showToasterError() {
  this.notifyService.showError(this.translate.instant("error.wrongcredentials"), this.translate.instant("error.error"))
}



  get userName() { return this.loginForm.get("UserName"); }

  get password() { return this.loginForm.get("Password"); }


}
