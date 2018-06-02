import { hello } from './../hello';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class ChatService {

  constructor(private http:HttpClient,private _auth:AuthService) { }
  private host:String="http://localhost:8088";
  private token=null;
send:any;
  Getmessage(user,user1){
    this.token=this._auth.loadToken();
    this.send=JSON.stringify({
      "fromuser": user,
	    "touser": user1})
    return this.http.post<hello>(this.host+'/findmess',this.send,{headers:new HttpHeaders({'Content-Type': 'application/json','Authorization':this.token})})
 
  }
}
