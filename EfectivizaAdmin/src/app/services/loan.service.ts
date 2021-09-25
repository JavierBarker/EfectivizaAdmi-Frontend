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

  getLoans(token: any): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token);
    return this.http.get(`${this.url}/getLoans`, {headers: headersToken});
  }

  getLoan(token: any, id: String):Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token);
    return this.http.get(`${this.url}/getLoan/${id}`, {headers: headersToken});
  }

  addLoanClient(id: String, token: string, user: any):Observable<any>{
    let params = JSON.stringify(user);
    let headersToken = this.headersVar.set('Authorization', token);
    return this.http.post(`${this.url}/createLoan/${id}`, params, {headers: headersToken} );

  }

  editLoan(id: string, token: string,  user: any):Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token);
    return this.http.put(`${this.url}/editLoan/${id}`,user, {headers: headersToken});
  }

  getLoanById(id: string, token):Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token);
    return this.http.get(`${this.url}/getLoanById/${id}`, {headers: headersToken});
  }

  deadLineForInstallment(token): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token);
    return this.http.get(`${this.url}/deadlineForInstallment`, {headers: headersToken});
  }

  deadLineForInstallmentUser(token,id: String): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token);
    return this.http.get(`${this.url}/deadlineForInstallmentUser/${id}`, {headers: headersToken});
  }

  deleteLoanById(id: string, token: any):Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token);
    return this.http.delete(`${this.url}/deleteLoanById/${id}`, {headers: headersToken});
  }
}
