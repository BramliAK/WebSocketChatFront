import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { User } from '../user';
@Injectable()
export class ListuserService {

  constructor(private http:HttpClient,private _auth:AuthService) { }
  private host:String="http://localhost:8088";
  private token=null;

  Getuser(){
    this.token=this._auth.loadToken();

    return this.http.get<User>(this.host+'/user/all',{headers:new HttpHeaders({'Authorization':this.token})})
  }
  Userexist(user:User){
    this.token=this._auth.loadToken();
     return this.http.get<boolean>(this.host+'/rest/user/bool/'+user.nom,{headers:new HttpHeaders({'Authorization':this.token})})
  }

}
