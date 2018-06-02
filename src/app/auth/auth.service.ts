import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';


@Injectable()
export class AuthService {

 
  private host:String="http://localhost:8088";
  private roles:Array<{any}>
  private jwtToken=null;
  constructor(private http:HttpClient) { }
  login(name,mp){
    var user=JSON.stringify({nom:name,password:mp})
     //console.log(user)
     
    return this.http.post(this.host+"/login",user,{observe:'response'})
    ;
  }
  saveToken(jwt:string){
    
    let jwtHelper =new JwtHelper();
    this.jwtToken=jwt;
   
    localStorage.setItem("token",this.jwtToken)
  
  }
  loadToken(){
    return localStorage.getItem("token");
  }
  logout(){
    localStorage.removeItem("token");
    this.jwtToken=null;
  }
  decodeToken(type,jwt){
    let jwtHelper =new JwtHelper();
    
    if(type=="roles")
      return jwtHelper.decodeToken(jwt).roles;
    else if(type=="sub")
      return jwtHelper.decodeToken(jwt).sub;

  }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
});

}
