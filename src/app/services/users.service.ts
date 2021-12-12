import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, tap, of} from "rxjs";
import * as CryptoJS from "crypto-js"

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  pages: number = 1;

  url = environment.APIUrl;

  cache: Map<string, Observable<{}>> = new Map<string, Observable<{}>>();

  private getMd5(obj: any): string {
    const hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(obj));
    return hash.toString();
  }

  private cashGet(url: string): Observable<{}> | undefined{
    const getHash = this.getMd5(url);
    const getCache = this.cache.get(getHash)
    if( getCache != undefined){
      console.log('from hash')
      return getCache;
    }
    return undefined;
  }
  constructor(private readonly http: HttpClient) { }

  getUsers(page: number): Observable<{}> {
    const url = this.url + 'users?' + `page=${page}`;
    const cash = this.cashGet(url)
    if(cash != undefined){
      return cash!
    }
    console.log("from api");
    const dataHash = this.getMd5(url)
      return this.http.get(url)
        .pipe(tap(data => {
          if(this.cache.size < 5){
            this.cache.set(dataHash, of(data))
          }          
        }
        ));
  }

  getUser(id: number): Observable<{}> {    
    const url = this.url + 'users/'+ id
    const cash = this.cashGet(url)
    if(cash != undefined){
      return cash!
    }
    console.log("from api");
    const dataHash = this.getMd5(url)
    return this.http.get(url)
    .pipe(tap(data => {
      if(this.cache.size < 5){
        this.cache.set(dataHash, of(data))
      }          
    }
    ));
  }

  getUserPosts(user_id: number): Observable<{}> {
    const url = this.url + 'users/'+ user_id + '/posts'
    const cash = this.cashGet(url)
    if(cash != undefined){
      return cash!
    }
    console.log("from api");
    const dataHash = this.getMd5(url)
    return this.http.get(url)
    .pipe(tap(data => {
      if(this.cache.size < 5){
        this.cache.set(dataHash, of(data))
      }          
    }
    ));
  }
}
