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
    this.UserLoginForm();

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
        debugger
        this.loginService.login(this.formusername, this.formpassword)
          .pipe(first())
          .subscribe(
            data => {
              if (localStorage.getItem("token") != null) {
                this.showToasterSuccess();
                this.navigateHome();
              } else {
                this.showToasterError();
              }
            },
            error => {
              this.showToasterError();
              this.reload();

        });
      
      }
    }
  }

   /* if (this.loginForm.valid) {
      this.formusername = this.loginForm.get('UserName')?.value;
      this.formpassword = this.loginForm.get('Password')?.value;
      this.loginService.login(this.formusername, this.formpassword).subscribe((data) => {
        this.showToasterSuccess();
        this.navigateHome()
        console.log('Form submitted successfully');
      },
        (error: HttpErrorResponse) => {
          this.showToasterError();
          this.reload();
          console.log(error);
        });
    }*/
  
reload() {
  setTimeout(() => { this.router.navigateByUrl('/login'); }, 2000);
}

navigateHome() {
  setTimeout(() => { this.router.navigateByUrl('/'); }, 2000);
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
