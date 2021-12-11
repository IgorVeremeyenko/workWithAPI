import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../services/users.service";
import {UserModel} from "../models/UserModel";
import {PostModel} from "../models/PostModel";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user!: UserModel;
  userPosts: PostModel[] = [];

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly userService: UsersService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    const userId = this.getUserId() ?? "";
    //TODO: Обработать null id
    this.userService.getUser(+userId)
      .subscribe((res: any) => {
          this.user = res.data;
          this.loadPosts();
      })
  }

  loadPosts() {
    this.userService.getUserPosts(this.user.id)
      .subscribe((res: any) => {
        this.userPosts = res.data;
        console.log(this.userPosts);
      }, (error => {
        console.log(error);
      }))
  }

  getUserId(): string | null {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

}
