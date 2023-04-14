import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private _AuthenticationService:AuthenticationService, private _Router:Router) {}

  registerForm:FormGroup = new FormGroup({
    first_name:new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    last_name:new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email:new FormControl(null, [Validators.required, Validators.email]),
    age:new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
    password:new FormControl(null, [Validators.required, Validators.pattern(/[a-zA-Z0-9]{8,}$/)])
  })

  isLoading:boolean = false;
  apiError:string = '';

  handleRegister(registerForm:FormGroup){
    this.isLoading = true;
    if(registerForm.valid){
      this._AuthenticationService.register(registerForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          if(res.message === 'success'){
            this._Router.navigate(['/login'])
          }
          else{
            this.apiError = res.errors.email.message
          }
        }
      })
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem('userToken') !== null){
      this._Router.navigate(['/home']);
    }
  }

  goLogin(){
    this._Router.navigate(['/login'])
  }
}
