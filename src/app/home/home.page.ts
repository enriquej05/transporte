import { AuthenticationService } from './../services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
const TOKEN_KEY = 'my-token';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  token = '';
  constructor(private authService: AuthenticationService, private router: Router) {}
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
  
  loadToken() {
    const checkName = async () => {
      const { value } = await Storage.get({ key: 'name' });
    
      alert(`Hello ${value}!`);
    };
  }
  checkName = async () => {
    const { value } = await Storage.get({ key: 'my-token' });
  
    alert(`Hello ${value}!`);
  };
}
