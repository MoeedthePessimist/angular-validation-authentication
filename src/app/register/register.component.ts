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
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  header = 'Register';

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

  onSubmit(data: any) {
    // console.log('register component', data.username, data.password);

    const { username, password } = data;

    this.authService.register(username, password).subscribe(
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

  // function to redirect the user to the home page
  redirectToHome(): void {
    this.router.navigateByUrl('/home');
  }

  redirectToLogin(): void {
    // const data = {
    //   value: true,
    //   username: this.form.username,
    //   password: this.form.password,
    // };
    // this.router.navigateByUrl('/login', { state: data });
  }
}
