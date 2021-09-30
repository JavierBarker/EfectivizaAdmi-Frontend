import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-page',
  providers: [LoanService, UserService],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  private token: any;
  public loansDeadLine: any;
  public loansNormal: any;
  public userLogged: any;
  public getLoanById: any;
  public showModalLoan: boolean = false;
  public showModalLoanClient: boolean = false;

  constructor(private loanService: LoanService, private userService: UserService) {
    this.token = this.userService.getToken();
    this.userLogged = this.userService.getIdentity();
   }

  ngOnInit(): void {
    
    if (this.userLogged.rol === 'ROL_ADMIN') {
      this.getLoans();
      this.deadLineForInstallment();
    }else{
      this.getLoansClient();
      this.deadLineForInstallmentUser();
    }
    
    
  }

  deadLineForInstallment(){

    this.loanService.deadLineForInstallment(this.token).subscribe(data =>{this.loansDeadLine = data})

  }
  deadLineForInstallmentUser(){

    this.loanService.deadLineForInstallmentUser(this.token, this.userLogged._id).subscribe(data =>{this.loansDeadLine = data})

  }

  getLoans(){
    this.loanService.getLoans(this.token).subscribe(data =>{this.loansNormal = data})

  }

  getLoansClient(){
    this.loanService.getLoansClient(this.userLogged._id, this.token).subscribe(data => { this.loansNormal = data })
  }

  loanById(id: String){

    this.loanService.getLoan(this.token,id).subscribe(data =>{this.getLoanById = data})

  }

}
