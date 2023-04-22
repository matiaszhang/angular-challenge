import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  email = '';
  password = '';
  confirmPassword = '';

  constructor(@Inject('AuthService') private authService: any) {}

  ngOnInit(): void {}

  register() {
    if (this.password === this.confirmPassword) {
      this.authService.register(this.email, this.password).subscribe(
        (response: any) => {
          // Handle successful registration
        },
        (error: any) => {
          // Handle error
        }
      );
    } else {
      // Handle password mismatch
    }
  }
}
