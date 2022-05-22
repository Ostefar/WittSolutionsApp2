import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NotificationService } from '../service/notification-service';
import { UserService } from '../service/user.service';
import { User } from './User';

@Component({
  selector: 'app-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./../../styles.css']
})
export class UpdateUsersComponent implements OnInit
{
  id!: number;
  user!: User;
  updateUserForm!: FormGroup;


  constructor(public fb: FormBuilder, private userService: UserService, private http: HttpClient, private notifyService: NotificationService, private route: ActivatedRoute, private router: Router) {
   
  }
  private updateForm() { 
    this.updateUserForm = this.fb.group({
    Id: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    FirstName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    LastName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    UserName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    Password: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    Phone: new FormControl( [Validators.required, Validators.minLength(1), Validators.maxLength(8)]),
    Email: new FormControl( '' , [Validators.required, Validators.email]),
    AddressLine1: new FormControl("",[Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
    AddressLine2: new FormControl("",[Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
    Country: new FormControl("",[Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
    City: new FormControl("",[Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
    ZipCode: new FormControl("",[Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
  });
  }


  ngOnInit(): void
  {
    this.updateForm();
    this.getById()
    
  }

  getById() {
    this.id = this.route.snapshot.params['id'];

    this.userService.getById(this.id).subscribe((data: User) => {
      this.user = data;
      this.updateUserForm.setValue({
        Id: this.id,
        FirstName: this.user.firstName,
        LastName: this.user.lastName,
        UserName: this.user.userName,
        Password: this.user.password,
        Phone: this.user.phone,
        Email: this.user.email,
        AddressLine1: this.user.addressLine1,
        AddressLine2: this.user.addressLine2,
        Country: this.user.country,
        City: this.user.city,
        ZipCode: this.user.zipCode,
        
      });
    });
     
  }


  onSubmit()
  {
    debugger
    if (this.updateUserForm.valid) {
      this.userService.update(this.id, this.updateUserForm.value)
        .subscribe(
          (data) => {
            this.showToasterSuccess();
            console.log('Form submitted successfully');
            console.log(this.updateUserForm.value)
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
    setTimeout( () => { this.router.navigateByUrl('/users-overview'); }, 2000);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess("User updated", "Success!")
  }

  showToasterError() {
    this.notifyService.showError("Something went wrong", "Error!")
  }

}


 
