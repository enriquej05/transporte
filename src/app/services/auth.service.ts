import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public estado: boolean;
  public token: string;
  public correo: string;
  public usuario: User;
  constructor() {
    this.usuario = {
      // id:null,
      name: '',
      email: '',
      password: '',
      // phone: '',
       }
   }
  
  obtenerToken(){
    
    if(JSON.parse(localStorage.getItem('currentToken'))){
      var currentToken = JSON.parse(localStorage.getItem('currentToken'));
    var token = currentToken.token; // your token 
    //console.log(token);  
    this.estado = true;
    }else{
      this.estado = false;
      //console.log("No hay token");
    }
    return this.estado;
  }
  retornarToken(){
    if(JSON.parse(localStorage.getItem('currentToken'))){
    var currentToken = JSON.parse(localStorage.getItem('currentToken'));
    this.token = currentToken.token; // your token 
    //console.log(this.token);  
    }else{
      //console.log("No hay token");
    }
    return this.token;
  }
  retornarDataUser(){
    
     
    //  console.log("entro al data");
    if(JSON.parse(localStorage.getItem('currentUser'))){
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.usuario.name = currentUser.token; // your token 
      //console.log(this.correo);  
      }else{
        //console.log("No hay rol");
      }
    if(JSON.parse(localStorage.getItem('currentEmail'))){
    var currentEmail = JSON.parse(localStorage.getItem('currentEmail'));
    this.usuario.email = currentEmail.token; // your token 
    //console.log(this.correo);  
    }else{
      //console.log("No hay correo");
    }
    
      //console.log(this.usuario);
    return this.usuario;
  }
}

