import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../service/user.service';
import { User } from '../users/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  users: User[] = [];
  user!: User;
  //id collected from user login token and parsed back to int
  idString = localStorage.getItem("token");
  id!: number;

  //fields to hold user data
  firstname!: string;
  lastname!: string;
  username!: string;
  password!: string;
  phone!: number;
  email!: string;
  addressline1!: string;
  addressline2!: string;
  country!: string;
  city!: string;
  zipcode!: string;
 

  constructor(private translate: TranslateService, private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.idString != null) {
      this.id = parseInt(this.idString);
    }
    this.getById();
    this.GetCurrentUserInfo();
  }

  getById() {
    this.userService.getById(this.id).subscribe((data: User) => {
      this.user = data;
      this.firstname = this.user.firstName,
      this.lastname = this.user.lastName,
      this.username = this.user.userName,
      this.phone = this.user.phone,
      this.email = this.user.email,
      this.addressline1 = this.user.addressLine1,
      this.addressline2 = this.user.addressLine2,
      this.country = this.user.country,
      this.city = this.user.city,
      this.zipcode = this.user.zipCode
    });

  }

  GetCurrentUserInfo() {
    if (this.id != null) {
      if (this.users.find(x => x.id == this.id)){
        var test = this.users.find(x => x.id === this.id)?.firstName;

      }
    }
  }


}
