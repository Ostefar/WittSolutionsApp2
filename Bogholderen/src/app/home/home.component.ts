import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../service/user.service';
import { User } from '../users/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginForm!: FormGroup;
  users: User[] = [];
  isLoggedIn = false;

  constructor(private translate: TranslateService, private fb: FormBuilder, private userService: UserService) {
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
    if (this.loginForm.valid) {
      this.userService.getAll().subscribe((data: User[]) => {
        this.users = data;
        for (let user of this.users) {
          if (user.userName === this.loginForm.value) {
            console.log("Wuhuu")
          } else {
            console.log("You shall not enter here")
          }
        }
      })
    }
  }



  get userName() { return this.loginForm.get("UserName"); }

  get password() { return this.loginForm.get("Password"); }


}
