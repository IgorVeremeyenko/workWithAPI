import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, tap, of} from "rxjs";
import {UserModel} from "../models/UserModel";
import * as CryptoJS from "crypto-js"

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = environment.APIUrl;

  private getMd5(obj: any): string {
    const hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(obj));
    return hash.toString();
  }

  constructor(private readonly http: HttpClient) { }

  getUsers(page: number): Observable<{}> {
    const url = this.url + 'users?' + `page=${page}`;
    const hash = this.getMd5(url);

    const storageValue = localStorage.getItem("cash");
    if (storageValue != null) {
      const decoded = JSON.parse(storageValue!);
      console.log("from storage");
      console.log(decoded);
      return of(decoded);
    }

    console.log("from api");
    return this.http.get(url)
      .pipe(tap(data => {
          const jsonData = JSON.stringify(data);
          localStorage.setItem("cash", jsonData);
        }
      ));
  }

  getUser(id: number): Observable<{}> {
    return this.http.get(this.url + 'users/' + id);
  }

  getUserPosts(user_id: number): Observable<{}> {
    return this.http.get(this.url + 'users/' + user_id + '/posts');
  }
}
