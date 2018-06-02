import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { ChatComponent } from '../chat/chat.component';
import { ListuserComponent } from '../listuser/listuser.component';
const routes: Routes = [
  { path: 'login', component: AuthComponent  },
  { path: 'chat/:id', component: ChatComponent  },
  { path: 'chat', component: ListuserComponent  }
  
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
