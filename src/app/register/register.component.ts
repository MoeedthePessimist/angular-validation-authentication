import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  passwordRegex = new RegExp(
    '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    const token = this.tokenStorageService.getToken();
    if (token) {
      this.redirectToHome();
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const { username, email, password } = this.form;
    console.log(username, email, password);
    if (!this.emailRegex.test(email) || !this.passwordRegex.test(password)) {
      console.log(this.passwordRegex.test(password));
      console.log(this.emailRegex.test(email));
      this.isSignUpFailed = true;
      this.errorMessage = 'Invalid email or password';
    } else {
      this.authService.register(username, email, password).subscribe(
        (data) => {
          console.log(data);
          this.errorMessage = '';
          this.isSignUpFailed = false;
          this.redirectToLogin();
        },
        (err) => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    }
    console.log(this.errorMessage);
  }

  // function to redirect the user to the home page
  redirectToHome(): void {
    this.router.navigateByUrl('/home');
  }

  redirectToLogin(): void {
    const data = {
      value: true,
      username: this.form.username,
      password: this.form.password,
    };
    this.router.navigateByUrl('/login', { state: data });
  }
}
