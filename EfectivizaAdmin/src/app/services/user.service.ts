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

  login(user: any, getToken = null): Observable<any>{

    if(getToken != null){
      user.getToken = getToken;
    }
    return this.http.post(`${this.url}/login`,user,{headers: this.headersVar});

  }

  presionar():Observable<any>{

    var token = this.getToken();
    var headers = new HttpHeaders({'Authorization':token})

    return this.http.get(`${this.url}/presionar`,{headers: headers})

  }

  createUser(user: any):Observable<any>{
    let params = JSON.stringify(user);
    let headersToken = this.headersVar.set('Authorization', this.getToken());
    return this.http.post(`${this.url}/createUser`, params, {headers: headersToken} );
  }


  getUsers():Observable<any>{
    let headersToken = this.headersVar.set('Authorization', this.getToken());
    return this.http.get(`${this.url}/getUsers`, {headers: headersToken});
  }

  getUserId(id: string):Observable<any>{
    let headersToken = this.headersVar.set('Authorization', this.getToken());
    return this.http.get(`${this.url}/getUserId/${id}`, {headers: headersToken});
  }

  deleteUser(id: string): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', this.getToken());
    return this.http.delete(`${this.url}/deleteUser/${id}`, {headers: headersToken});
  }

  editUser(id: string, user: any): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', this.getToken());
    return this.http.put(`${this.url}/editUser/${id}`,user, {headers: headersToken});
  }


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
    /*
    var token2: any = localStorage.getItem('token');
    //token2 = JSON.parse(token2)

    if(token2.token != 'undefined'){
      this.token = token2.token;
    }else{
      this.token = null;
    }

    return this.token;*/
    var token2 = localStorage.getItem('token');
    if(token2 != 'undefined'){
      this.token = token2;
    }else{
      this.token = null;
    }
    return this.token;
  }


}
