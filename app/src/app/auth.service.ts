import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = 'http://localhost:3000/api/register'
  private _loginUrl = 'http://localhost:3000/api/login'
  constructor(private http:HttpClient, private _router:Router) { }
  
  registerUser(user:any):Observable<any>{
    return this.http.post<any>(this._registerUrl, user)
  }
  loginUser(user:any):Observable<any>{
    return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logoutUser(){
    return localStorage.removeItem('token')
    this._router.navigate(['/events'])
  }
}

