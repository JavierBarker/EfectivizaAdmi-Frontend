import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { GLOBAL } from './global.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public headersVar = new HttpHeaders().set('Content-Type', 'application/json');
  public token: any;
  public identity: any;
  public url: String = "";

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url
  }

  login(user: any, getToken = true): Observable<any>{

    return this.http.post(`${this.url}/login`,{...user,getToken},{headers: this.headersVar});

  }

  /*presionar():Observable<any>{

    var token = this.getToken();
    var headers = new HttpHeaders({'Authorization':token})

    return this.http.get(`${this.url}/presionar`,{headers: headers})

  }*/

  getIdentity(){
    var identidty2 = JSON.stringify(localStorage.getItem('identity'));
    if(identidty2 != 'undefined'){
      this.identity = identidty2
    }else{
      this.identity = null;
    }

    return this.identity;
  }

  getToken(){
    var token2: any = localStorage.getItem('identity');
    token2 = JSON.parse(token2)

    if(token2.token != 'undefined'){
      this.token = token2.token;
    }else{
      this.token = null;
    }

    return this.token;
  }


}
