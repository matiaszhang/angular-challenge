import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastService } from './../../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  email = '';
  password = '';

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  pwdFormControl = new FormControl('', [Validators.required]);

  constructor(@Inject('AuthService') private authService: any, private router: Router, private toastService: ToastService) {}

  ngOnInit(): void {}

  login() {
    this.authService.login( this.email, this.password).subscribe(
      (response: any) => {
        this.toastService.makeToast("Logged in successfully", 'Close', 5000);
        this.router.navigate(['products']);
      },
      (error: any) => {
        console.log(error)
        this.toastService.makeToast(error.message, 'Close', 5000);
        this.router.navigate(['/']);
      }
    );
  }
}
