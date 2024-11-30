import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SignupModel } from '../../models/signup.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']

})
export class SignupComponent {
  signupData : SignupModel = new SignupModel()
  errorMessage ='';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.signup(this.signupData).subscribe(
      () => {
        this.loginRedirect();
        this.errorMessage = '';
      this.signupData = new SignupModel();
      },
      (error) => {
        console.error('Signup failed', error);
        this.errorMessage = error?.error?.message || error.message;
        console.error(' errorMessage', this.errorMessage);
      }

    );
  }
  loginRedirect(){
    this.router.navigate(['/login']);

  }
}
