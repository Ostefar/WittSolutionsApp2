import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { NbButtonModule, NbTabsetModule } from '@nebular/theme';
import { AddUsersComponent } from './users/add-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersOverviewComponent } from './users/users-overview.component';
import { ToastrModule } from 'ngx-toastr';
import { UpdateUsersComponent } from './users/update-users.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { EmployeesOverviewComponent } from './employees/employees-overview.component';
import { AddEmployeesComponent } from './employees/add-employees.component';
import { UpdateEmployeesComponent } from './employees/update-employees.component';
import { CustomersOverviewComponent } from './customers/customers-overview.component';
import { AddCustomersComponent } from './customers/add-customers.component';
import { UpdateCustomersComponent } from './customers/update-customers.component';
import { ProjectsOverviewComponent } from './projects/projects-overview.component';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AddUsersComponent,
    UsersOverviewComponent,
    EmployeesOverviewComponent,
    UpdateUsersComponent,
    AddEmployeesComponent,
    UpdateEmployeesComponent,
    CustomersOverviewComponent,
    AddCustomersComponent,
    UpdateCustomersComponent,
    ProjectsOverviewComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    NbButtonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    
    NbTabsetModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'users-overview', component: UsersOverviewComponent },
      { path: 'add-users', component: AddUsersComponent },
      { path: 'update-users/:id', component: UpdateUsersComponent },
      { path: 'employees-overview', component: EmployeesOverviewComponent },
      { path: 'add-employees', component: AddEmployeesComponent },
      { path: 'update-employees/:id', component: UpdateEmployeesComponent },
      { path: 'customers-overview', component: CustomersOverviewComponent },
      { path: 'add-customers', component: AddCustomersComponent },
      { path: 'update-customers/:id', component: UpdateCustomersComponent },
      { path: 'projects-overview', component: ProjectsOverviewComponent },

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT(ahead of time) compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
