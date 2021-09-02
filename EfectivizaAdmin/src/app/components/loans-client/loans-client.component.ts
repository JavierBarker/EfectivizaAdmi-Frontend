import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-loans-client',
  templateUrl: './loans-client.component.html',
  styleUrls: ['./loans-client.component.scss'],
  providers: [UserService, LoanService]
})
export class LoansClientComponent implements OnInit {
  public step : number = 0;
  public loanForm = this.buildFormLoad();
  public typeForm : String = "";
  public idClient: any = "";
  public token: any = "";
  loansRequest: any;

  constructor(private fmBuilder: FormBuilder,
    private userService: UserService,
    private loanService: LoanService,
    private activatedRoute: ActivatedRoute) {

      this.token = this.userService.getToken();

    }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((dataRoute)=>{
      this.idClient = dataRoute.get('id');
    })

    this.loanService.getLoansClient(this.idClient,this.token).subscribe(data=>{this.loansRequest = data})

  }

  buildFormLoad(){
    return this.fmBuilder.group({
      name :['', Validators.required],
      typeLoan: ['', Validators.required]

    })
  }


  next(){
    if (this.step === 1 ) {
      this.step = 1;
    }else{
      this.step++
    }
  }


  checkForm(){
    if (this.loanForm.value.typeLoan.toString() === "Mobiliario") {
      this.typeForm = "Mobiliario";
    }
    if (this.loanForm.value.typeLoan.toString() === "Vehículo") {
      this.typeForm = "Vehículo";
    }
    if (this.loanForm.value.typeLoan.toString() === "Joyeria") {
      this.typeForm = "Joyeria";
    }
    if (this.loanForm.value.typeLoan.toString() === "Linea Blanca") {
      this.typeForm = "Linea Blanca";
    }
    if (this.loanForm.value.typeLoan.toString() === "Inmobiliario") {
      this.typeForm = "Inmobiliario";
    }
  }

  previous(){
    if (this.step === 0) {
      this.step = 0;
    }else{
      this.step--
    }
  }

  cancel(){
    this.step = 0;
  }



  showLoanModal: boolean = false;
}
