import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {UsersComponent} from "./users/users.component";
import {UserComponent} from "./user/user.component";
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent
  },
  {
    path: 'user/:id', component: UserComponent
  },
  {
    path: 'add-user', component: AddUserComponent
  }
]

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  bootstrap: [AppComponent],
})
export class AppRoutingModule { }
