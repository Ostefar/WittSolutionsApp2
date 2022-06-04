import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  id = localStorage.getItem("token");

  constructor(private translate: TranslateService, private fb: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {
    console.log(this.id)
  }

  // id er bruger id'et fra login.
  /* brug det til at hente data fra users array, til at display på profilesiden. */
  

  GetAllUsers() {
    this.userService.getAll().subscribe((data: User[]) => {
      this.users = data;
      console.log(this.users)
    })
  }


}
