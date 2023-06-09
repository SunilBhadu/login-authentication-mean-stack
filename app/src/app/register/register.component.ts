import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerUserData:User= {
    email :'',
    password : ''
  }
  constructor(private _auth:AuthService, private _router:Router){

  }
  registerUser(){
    this._auth.registerUser(this.registerUserData).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        this._router.navigate(['/special'])
      },
      err => console.log(err)
      
      
    )
    
  }
}
