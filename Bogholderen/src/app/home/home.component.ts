import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./../../styles.css']
})
export class HomeComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private translate: TranslateService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.UserLoginForm();

  }

  UserLoginForm() {
    this.loginForm = this.fb.group({
      UserName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
      Password: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    });
  }

  onSubmit() {

  }



  get userName() { return this.loginForm.get("UserName"); }

  get password() { return this.loginForm.get("Password"); }


}
