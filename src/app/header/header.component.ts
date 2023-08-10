import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../_service/user-auth.service';
import { UserService } from '../_service/user.service';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService,
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

  public logout(){
    this.userAuthService.clear();
    this.router.navigate(['/']);
  }

  public isAdmin(){
    return this.userAuthService.isAdmin();
  }

  public isUser(){
    return this.userAuthService.isUser();
  }

}
