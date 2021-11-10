import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { Storage } from '@capacitor/storage';
// const { Storage } = Plugins;
 
const TOKEN_KEY = 'my-token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  constructor(private http: HttpClient) { 
    this.loadToken();
  }
  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });    
    if (token && token.value) {
      // console.log(token.value);
      this.token = token.value;
      // console.log(this.token);
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
  login(credentials: {email, password}): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/login`, credentials).pipe(
      map((data: any) => data.token),
      switchMap(token => {
        return from(
          Storage.set({key: TOKEN_KEY, value: token}),  
          );
       
      }),
      
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
    
  }
  register(credentials: {name,email, password}): Observable<any>{
    return this.http.post(`http://127.0.0.1:8000/api/register`, credentials).pipe(
      map((data: any) => data.token),
      switchMap(token => {
        return from(
          Storage.set({key: TOKEN_KEY, value: token}),  
          );
       
      }),
      
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({key: TOKEN_KEY});
  }
  // async tokenReturn(){
  //   hola = "hola"
  //   return  await Storage.get({ key: 'my-token' });
  // }
  tokenReturn() {
    // const checkName = async () => {
    //   const { value } = await Storage.get({ key: 'my-token' });
      
    //   // alert(`Hello ${this.token}!`);
    //   return alert(`Hello ${value}!`);
    // };
    let rToken = async () =>{
      const token = await Storage.get({ key: 'my-token' });
      return token;
    }
    
      // return rToken;
  }
  async returnT(){
    const token = await Storage.get({ key: 'my-token' });

    return token
  }
  getToken(){
    return Storage.get({key: TOKEN_KEY});
  }
  
  
}
