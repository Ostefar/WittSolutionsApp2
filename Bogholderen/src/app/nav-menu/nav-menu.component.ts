import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../service/login-service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  isLoggedIn = false;



  constructor(private translate: TranslateService, private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
    this.toggleLogOutBtn();

  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  logOut(): void {
    this.loginService.logOut();
    this.router.navigateByUrl("/login");
  }
  toggleLogOutBtn() {
    if (localStorage.getItem("token") != null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
}
