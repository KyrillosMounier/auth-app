// home.component.ts
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService) {}
    userList: UserModel [] = []
  logout(): void {
    this.authService.logout();
  }
  getAllUsersData(){
    this.authService.getProtectedData().subscribe(
        (response:UserModel[]) => {
         if(response && response.length > 0)
            this.userList = response
        },
        (error) => {
     
          console.error('Fetch data failed', error);
         
        }
      );
  }
  ngOnInit()
  {
    this.getAllUsersData()
  }
}
