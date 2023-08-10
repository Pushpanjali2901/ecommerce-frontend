import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  register(registerForm: NgForm) {
    console.log(registerForm.value);
    this.userService.register(registerForm.value).subscribe(
      (resp) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
