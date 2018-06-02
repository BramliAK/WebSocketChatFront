import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private router : Router,private _authService:AuthService) { }

  ngOnInit() {
  }
  onSubmit(user:NgForm){
    console.log(user.value.username)
    this._authService.login(user.value.username,user.value.password).subscribe(
      resp=>{
        let jwt=resp.headers.get('Authorization');
        console.log(jwt)
        this._authService.saveToken(jwt);
        this.router.navigateByUrl('/chat');

      }
    )
    
  }
}
