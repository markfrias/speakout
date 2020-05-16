import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './shared/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  userDetails;
  
  

  constructor(public userService: UserService, private router: Router){ }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/home']);
  }

  openContextMenu() {
    document.getElementById('dd-content').classList.toggle("show");
  }

  
  

}