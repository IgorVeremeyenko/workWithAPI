import { Component, OnInit } from '@angular/core';
import {UsersService} from "../services/users.service";
import {UserModel} from "../models/UserModel";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: UserModel[] = [];

  page: number = 1;

  maxPages!: number;

  constructor(private readonly usersService: UsersService, private readonly router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  canGoPrevious(): boolean {
    return !(this.page <= 1);
  }

  canGoNext(): boolean {
    return !(this.page >= this.maxPages);
  }

  previousPageClick() {
    if(this.canGoPrevious()) {
      this.page -= 1;
      this.loadUsers();
    }
  }

  nextPageClick() {
    if(this.canGoNext()) {
      this.page += 1;
      this.loadUsers();
    }
  }

  userDetails(id: number){
    this.router.navigateByUrl(`/user/${id}`);
  }

  loadUsers() {
    this.usersService.getUsers(this.page)
      .subscribe((res: any) => {
        this.maxPages = res.meta.pagination.pages;
        this.users = res.data;
      })
  }

}
