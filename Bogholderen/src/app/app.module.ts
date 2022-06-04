import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { NbButtonModule, NbLayoutComponent, NbTabsetModule } from '@nebular/theme';
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
import { AddProjectsComponent } from './projects/add-projects.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { UpdateProjectsComponent } from './projects/update-projects.component';
import { ManagementOverviewComponent } from './management/management-overview.component';
import { RegistrateHoursComponent } from './hours/registrate-hours.component';
import { UpdateHoursComponent } from './hours/update-hours.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuardGuard } from './authentication-guard.guard';



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
    AddProjectsComponent,
    UpdateProjectsComponent,
    ManagementOverviewComponent,
    RegistrateHoursComponent,
    UpdateHoursComponent,
    LoginComponent,
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
    DropDownListModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthenticationGuardGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'users-overview', component: UsersOverviewComponent, canActivate: [AuthenticationGuardGuard]},
      { path: 'add-users', component: AddUsersComponent, canActivate: [AuthenticationGuardGuard]},
      { path: 'update-users/:id', component: UpdateUsersComponent, canActivate: [AuthenticationGuardGuard]},
      { path: 'employees-overview', component: EmployeesOverviewComponent, canActivate: [AuthenticationGuardGuard] },
      { path: 'add-employees', component: AddEmployeesComponent, canActivate: [AuthenticationGuardGuard] },
      { path: 'update-employees/:id', component: UpdateEmployeesComponent, canActivate: [AuthenticationGuardGuard]},
      { path: 'customers-overview', component: CustomersOverviewComponent, canActivate: [AuthenticationGuardGuard]},
      { path: 'add-customers', component: AddCustomersComponent, canActivate: [AuthenticationGuardGuard]},
      { path: 'update-customers/:id', component: UpdateCustomersComponent, canActivate: [AuthenticationGuardGuard]},
      { path: 'projects-overview', component: ProjectsOverviewComponent, canActivate: [AuthenticationGuardGuard]},
      { path: 'add-projects', component: AddProjectsComponent, canActivate: [AuthenticationGuardGuard] },
      { path: 'update-projects/:id', component: UpdateProjectsComponent, canActivate: [AuthenticationGuardGuard]},
      { path: 'management-overview', component: ManagementOverviewComponent, canActivate: [AuthenticationGuardGuard] },
      { path: 'registrate-hours/:id', component: RegistrateHoursComponent, canActivate: [AuthenticationGuardGuard]},
      { path: 'update-hours/:id', component: UpdateHoursComponent, canActivate: [AuthenticationGuardGuard] },

    ]),
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT(ahead of time) compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
