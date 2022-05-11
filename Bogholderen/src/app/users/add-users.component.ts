import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit
{

  constructor()
  {
  }


  ngOnInit()
  {

  }

  addUserForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    userName: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    addressId: new FormControl(''),
  });

  onSubmit()
  {
    console.warn(this.addUserForm.value);
  }
}
