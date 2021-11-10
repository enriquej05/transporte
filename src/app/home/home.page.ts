import { AuthenticationService } from './../services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const TOKEN_KEY = 'my-token';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public token;
  
  httpOptions = {
    headers: new HttpHeaders()
  }
  constructor(private authService: AuthenticationService, private router: Router, public http:HttpClient,) {
  
   
    const token = Storage.get({ key: 'my-token' }).then( res => {
      this.httpOptions.headers = new HttpHeaders({
        'Authorization': `Bearer ${res.value}`
      });
      });
    }
  
  
  async checkName(): Promise<void>{
    
  }
 
  

  perfil(){
    this.http.get('http://localhost:8000/api/perfil',this.httpOptions).subscribe(data=>{
      //console.log(data[1]);
      console.log(data);
     
    
    })
    console.log(this.httpOptions);
  }
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
  
}
