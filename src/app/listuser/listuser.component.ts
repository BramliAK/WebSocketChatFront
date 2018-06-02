import { Component, OnInit , ViewChild, AfterViewInit } from '@angular/core';
import { ListuserService } from './listuser.service';
import { hello } from '../hello';
import { User } from '../user';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { collectExternalReferences } from '@angular/compiler';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit{

  greetings: User[] = [];
  disabled: boolean;
  name: string;
  game :User; 
  private token=null;
   username;
   id2:String;
  private stompClient = null;
  listuser:User[]=[]

  
  constructor(private router : Router,private _authservice:AuthService,private route: ActivatedRoute,private _conncte:ListuserService) { }
  test:any;
 
  message:User[];

  receiveMessage($event) {
    this.message = $event

    console.log("//////////////////////////////////////////////////////////")
    console.log(this.message)
    console.log("//////////////////////////////////////////////////////////")
    console.log(this.listuser)
    this.listuser=this.message
    this.greetings=[]
    
  }
  ngOnInit() {

    this.token=this._authservice.loadToken();
    this.username=this._authservice.decodeToken("sub",this._authservice.loadToken());
    const id = this.route.snapshot.paramMap.get('id');
    this.id2=id
    this.userconnecte()
    this.sendName()
    const socket = new SockJS('http://localhost:8088/jsa-stomp-endpoint',null,{headers:new HttpHeaders({'Content-Type': 'application/json','Authorization':this.token})});
      
    this.stompClient = Stomp.over(socket);
    
    const _this = this;
    var thisheaders={'Authorization':this.token};

    this.stompClient.connect(thisheaders, function (frame) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);
      
      _this.stompClient.subscribe('/topic/connecte/user', function (user) {
       _this.showGreeting(JSON.parse(user.body));
            
      });
    });
    
    
  }

 
 
userconnecte(){
  this._conncte.Getuser().subscribe(res=>{
    for (const i in res) {
      
      this._conncte.Userexist(res[i]).subscribe(r=>{
        if(r){
          this.listuser.push(res[i])
        }
      })
      
      
    }
  });
}
 
  setConnected(connected: boolean) {
    this.disabled = !connected;
 
    if (connected) {
      this.greetings = [];
    }
  }
 
  
 
  sendName() {
    setTimeout(() => {
      this.stompClient.send(
        '/jsa/connecte',
        {},
        this.username
      );
    }, 500);
    
  }
 
  showGreeting(message) {
    //console.log(message)
    let bool:boolean=true;
    this.game=message;
    for (const i in this.listuser) {
      
      if (this.listuser[i].nom==this.game.nom) {
        
        bool=false
      }
    }
    for (const i in this.greetings) {
      
      if (this.greetings[i].nom==this.game.nom) {
        
        bool=false
      }
    }
    
    if(bool){
    this.greetings.push(this.game);
    console.log(this.greetings)
    }
  }
 

}
