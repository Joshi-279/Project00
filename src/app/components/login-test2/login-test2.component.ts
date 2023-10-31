import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login/login-service.service';

@Component({
  selector: 'app-login-test2',
  templateUrl: './login-test2.component.html',
  styleUrls: ['./login-test2.component.css']
})
export class LoginTest2Component {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router:Router, private loginService:LoginServiceService) {

    }
    
    ngOnInit(): void {
      this.loginForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
      });
    }

    login() {
      this.loginService.login(this.loginForm);
    }
}
