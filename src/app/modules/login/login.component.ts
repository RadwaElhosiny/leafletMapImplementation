import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../shared/services/login/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  emailPattern = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$';
  errorMessage: string;
  isRemembered: string;
  constructor(private  fb: FormBuilder,
              private loginService: LoginService,
              private router: Router) {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      rememberMe: new FormControl(this.isRemembered)
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('rememberMe') == 'true') {
      this.loginForm.controls.rememberMe.setValue(localStorage.getItem('rememberMe'));
      this.isRemembered = localStorage.getItem('rememberMe');
    }
  }

  getRememberMeValue(event) {
    this.isRemembered = String(event.target.checked);
  }

  rememberMe() {
    if (this.isRemembered == 'true') {
      localStorage.setItem('access-token', this.loginService.createAccessToken());
    }
    else {
      sessionStorage.setItem('access-token', this.loginService.createAccessToken());
    }
    localStorage.setItem('rememberMe', String(this.isRemembered));
  }

  login(): void {
    this.loginService.login(this.loginForm.value)
      .then((result) => {
        if (result !== null) {
          this.rememberMe();
          this.router.navigate(['/map']);
          this.errorMessage = null;
        } else {
          this.errorMessage = 'Please enter correct email & password';
        }
      });
  }

}
