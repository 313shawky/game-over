import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{

  constructor(private _HttpClient:HttpClient, private _Router:Router) { 
    if(localStorage.getItem('userToken') !== null){
          this.decodeUserData();
        }
  }

  userData = new BehaviorSubject(null);

  decodeUserData(){
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken:any = jwtDecode(encodedToken);
    this.userData.next(decodedToken);
  }

  register(userObject:object):Observable<any>{
    return this._HttpClient.post('https://sticky-note-fe.vercel.app/signup', userObject)
  }

  login(userObject:object):Observable<any>{
    return this._HttpClient.post('https://sticky-note-fe.vercel.app/signin', userObject)
  }

  logout(){
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }

}
