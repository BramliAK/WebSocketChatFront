import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { AuthService } from './auth/auth.service';
import { RoutingModule } from './routing/routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { ChatService } from './chat/chat.service';
import { ListuserComponent } from './listuser/listuser.component';
import { ListuserService } from './listuser/listuser.service';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ChatComponent,
    ListuserComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService,ChatService,ListuserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
