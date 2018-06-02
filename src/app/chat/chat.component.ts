import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { hello } from '../hello';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from './chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  greetings: hello[] = [];
  disabled: boolean;
  name: string;
  game :hello; 
  private token=null;
   username;
   from:String;
   id2:String;
   to:String;
   listmessage:hello[]=[];
  constructor(private _authservice:AuthService,private route: ActivatedRoute,private _chat:ChatService) { }
  
  ngOnInit() {
    this.token=this._authservice.loadToken();
    this.username=this._authservice.decodeToken("sub",this._authservice.loadToken());
    console.log(this.username)
    console.log(this.token)
    this.getmessage()
    console.log(this.listmessage)
    const id = this.route.snapshot.paramMap.get('id');
    this.id2=id
    
    const socket = new SockJS('http://localhost:8088/jsa-stomp-endpoint',null,{headers:new HttpHeaders({'Content-Type': 'application/json','Authorization':this.token})});
      
    this.stompClient = Stomp.over(socket);
    
    const _this = this;
    var thisheaders={'Authorization':this.token};

    this.stompClient.connect(thisheaders, function (frame) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);
      
      _this.stompClient.subscribe('/topic/'+id, function (hello) {
       _this.showGreeting(JSON.parse(hello.body));
             
      });
    });
  }
  title = 'JavaSampleApproach';
  description = 'Angular-WebSocket Demo';
 
  
  private stompClient = null;
 

 
  setConnected(connected: boolean) {
    this.disabled = !connected;
 
    if (connected) {
      this.greetings = [];
    }
  }
 
  
 
  sendName() {
    const id = this.route.snapshot.paramMap.get('id');
    this.stompClient.send(
      '/jsa/hello',
      {},
      JSON.stringify({ 'fromuser':this.username ,'message': this.name,'touser':this.id2 })
    );
  }
 
  showGreeting(message) {
    console.log(message)
    this.game=message;
    
    this.greetings.push(this.game);
  }
  getmessage(){
    const id = this.route.snapshot.paramMap.get('id');
    return this._chat.Getmessage(this.username,id).subscribe(res=>{
      for (const i in res) {
        this.listmessage.push(res[i])
      }
      
      
    })
    
  }
}
