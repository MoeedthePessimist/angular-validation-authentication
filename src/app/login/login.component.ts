import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // initializing variables
  errorMessage: string = 'Incorrect Email or Password';
  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  roles: string[] = [];
  form: any = {
    username: '',
    password: '',
  };
  isSignedUp: boolean = false;

  // initializing the serviece objects
  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  // init function to check if the user is already logged in by checking an existence of a token in the session storage
  ngOnInit(): void {
    const token = this.tokenStorageService.getToken();
    if (token) {
      this.isLoggedIn = true;
      this.redirectToHome();
    }
    console.log(history.state);
    if (history.state) {
      const data = history.state;
      console.log(data);
      this.isSignedUp = data.value;
      this.form.username = data.username;
      this.form.password = data.password;
    }
  }

  // function to login the user
  onSubmit(event: Event): void {
    event.preventDefault();
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe(
      (data) => {
        console.log(data);
        this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveUser(JSON.stringify(data));
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getUser().roles;
        this.redirectToHome();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  // function to redirect the user to the home page
  redirectToHome(): void {
    this.router.navigateByUrl('/home');
  }
}
