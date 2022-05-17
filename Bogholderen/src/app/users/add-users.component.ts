import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit
{
  user: any;
  userList: any = [];
  addUserForm: FormGroup;


  constructor(public fb: FormBuilder, private userService: UserService, private http: HttpClient) {

    this.addUserForm = this.fb.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      userName: new FormControl(''),
      password: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      addressId: new FormControl(''),
    });
  }


  ngOnInit(): void
  {

  }


  onSubmit()
  {
    if (this.addUserForm.valid)
    {
      var formData: any = new FormData();
      formData.append("firstName", this.addUserForm.get('firstName')?.value);
      formData.append("lastName", this.addUserForm.get('lastName')?.value);
      formData.append("userName", this.addUserForm.get('userName')?.value);
      formData.append("password", this.addUserForm.get('password')?.value);
      formData.append("phone", this.addUserForm.get('phone')?.value);
      formData.append("email", this.addUserForm.get('email')?.value);
      formData.append("addressId", this.addUserForm.get('addressId')?.value);

      this.http.post('http://localhost:44459/add-users', formData).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )
      console.log(this.addUserForm.value);
    }
  }
}
