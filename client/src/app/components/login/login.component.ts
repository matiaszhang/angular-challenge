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
  hide = true;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  pwdFormControl = new FormControl('', [Validators.required]);

  constructor(
    @Inject('AuthService') private authService: any,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  login() {
    if (this.emailFormControl.valid && this.pwdFormControl.valid) {
      this.authService.login(this.email, this.password).subscribe(
        (response: any) => {
          this.toastService.makeToast('Logged in successfully', 'Close', 3000);
          this.router.navigate(['products']);
        },
        ({ error }: any) => {
          this.toastService.makeToast(error.message, 'Close', 3000);
          this.router.navigate(['/']);
        }
      );
    } else {
      this.toastService.makeToast('Please input correctly', 'Close', 300);
    }
  }
}
