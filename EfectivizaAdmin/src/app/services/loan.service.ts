import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { GLOBAL } from './global.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  public headersVar = new HttpHeaders().set('Content-Type', 'application/json');
  public token: any;
  public identity: any;
  public url: String = "";

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getLoansClient(id: String, token: any): Observable<any>{

    let headersToken = this.headersVar.set('Authorization', token);


    return this.http.get(`${this.url}/getClientLoans/${id}`, { headers: headersToken})

  }

}
