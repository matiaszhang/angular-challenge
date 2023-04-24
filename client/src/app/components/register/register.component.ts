import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email = '';
  password = '';
  confirmPassword = '';

  pwdHide = true;
  rePwdHide = true;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  pwdFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  rePwdFormControl = new FormControl('', [Validators.required]);

  constructor(
    @Inject('AuthService') private authService: any,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register() {
    if (
      this.pwdFormControl.valid &&
      this.rePwdFormControl.valid &&
      this.emailFormControl
    ) {
      alert(1);
      this.authService.register(this.email, this.password).subscribe(
        (response: any) => {
          this.toastService.makeToast('Registered successfully', 'Close', 3000);
          this.router.navigate(['/']);
        },
        ({ error }: any) => {
          this.toastService.makeToast(error.message, 'Close', 3000);
        }
      );
    } else {
      this.toastService.makeToast('Please input correctly', 'Close', 3000);
    }
  }
}
