import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'authentificationClient';
  private roles: string[];
  isLoggedIn:boolean ;
  showAdminBoard:boolean ;
  showModeratorBoard:boolean;
  username: string;
  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = false;
    this.showAdminBoard = false;
    this.showModeratorBoard = false;
    this.username = '';
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
