import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{

  constructor(private _AuthenticationService:AuthenticationService, private _Router:Router) {}

  isLoading:boolean = false;
  apiError:string = '';


  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/[a-zA-Z0-9]{8,}$/)])
  })

  handleLogin(loginForm:FormGroup){
    this.isLoading = true;
    if(loginForm.valid){
      this._AuthenticationService.login(loginForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          if(res.message === 'success'){
            localStorage.setItem('userToken', res.token);
            this._AuthenticationService.decodeUserData();
            this._Router.navigate(['/home']);
          }
          else{
            this.apiError = res.message
          }
        }
      })
    }    
  }

  ngOnInit(): void {
    if(localStorage.getItem('userToken') !== null) {      
      this._Router.navigate(['/home'])
    }
  }

  forgotPassword(){
    alert('Oops!! You lost your account. Create another one.')
  }

  goRegister(){
    this._Router.navigate(['/register'])
  }

}
