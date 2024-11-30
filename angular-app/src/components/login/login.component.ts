import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { LoginModel } from '../../models/login.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage ='';
  loginData : LoginModel = new LoginModel()

  constructor(private authService: AuthService, private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    this.authService.login(this.loginData).subscribe(
      (response) => {
        this.snackBar.open('Login Successful!', 'Close', {
            duration: 1000,
          });
        this.authService.storeToken(response.access_token);
        this.router.navigate(['/home']);
        this.errorMessage = '';
        this.loginData = new LoginModel();
      },
      (error) => {
   
        console.error('Login failed', error);
        this.errorMessage = error?.error?.message || error.message;
        console.error(' errorMessage', this.errorMessage);

      }
    );
  }
  registerRedirect()
  {
    this.router.navigate(['/signup']);

  }
}
