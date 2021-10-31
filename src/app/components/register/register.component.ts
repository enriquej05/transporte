import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  credentials: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  async register(){
    const loading = await this.loadingController.create();
    await loading.present();
    
    this.authService.register(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss();        
        this.router.navigateByUrl('/home', { replaceUrl: true });
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'El registro a fallado',
          message: res.error,
          buttons: ['OK'],
        });
 
        await alert.present();
      }
    );
  }
  get email() {
    return this.credentials.get('email');
  }
  
  get password() {
    return this.credentials.get('password');
  }
  
  get name() {
    return this.credentials.get('name');
  }
  // obtenerToken(){
  //   var currentUser = JSON.parse(localStorage.getItem('currentUser')); 
  //   var token = currentUser.token; // your token 
  //   //console.log(token);
  // }
}
