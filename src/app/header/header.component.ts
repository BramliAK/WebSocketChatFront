import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { hello } from '../hello';
import { User } from '../user';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ListuserComponent } from '../listuser/listuser.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  greetings: User[] = [];
  disabled: boolean;
  name: string;
  game :User; 
  private token=null;
   username;
   id2:String;
  private stompClient = null;
  listuser:User[]=[]
  message: User[] = [];

  @Output() messageEvent = new EventEmitter<User[]>();

  
  constructor(private _authservice:AuthService,private router : Router,private route: ActivatedRoute) { }
  test:any;
  ngOnInit() {
    
    this.token=this._authservice.loadToken();
    this.username=this._authservice.decodeToken("sub",this._authservice.loadToken());
    const id = this.route.snapshot.paramMap.get('id');
    this.id2=id
    
    
    const socket = new SockJS('http://localhost:8088/jsa-stomp-endpoint',null,{headers:new HttpHeaders({'Content-Type': 'application/json','Authorization':this.token})});
      
    this.stompClient = Stomp.over(socket);
    
    const _this = this;
    
    var thisheaders={'Authorization':this.token};

    this.stompClient.connect(thisheaders, function (frame) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);
      let i=0
      _this.stompClient.subscribe('/topic/deconnecte/user', function (user) {
        _this.showGreeting(JSON.parse(user.body));
       
          _this.senddata()
         
        
      });
      
      
    });
  
  }

 senddata(){
    this.messageEvent.emit(this.greetings)
    
 }
 
  setConnected(connected: boolean) {
    this.disabled = !connected;
 
    if (connected) {
      this.greetings = [];
    }
  }

  logout(){
   
    
     this.sendName()
     
  }
 
  sendName() {
    

      setTimeout(() => {
      this.stompClient.send(
        '/jsa/deconnecte',
        {},
        this.username
      );
      
    }, 500);
    
    this._authservice.logout();
    this.router.navigateByUrl('/login');
  }
 
  showGreeting(message) {
    //console.log(message)
    this.greetings=[]
    
    this.game=message;
    
    for (const i in this.game) {
      
      this.greetings.push(this.game[i]);
      
    }
    
    
    
  }

}
