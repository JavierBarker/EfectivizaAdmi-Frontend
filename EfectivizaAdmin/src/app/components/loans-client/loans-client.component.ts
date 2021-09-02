import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-loans-client',
  templateUrl: './loans-client.component.html',
  styleUrls: ['./loans-client.component.scss']
})
export class LoansClientComponent implements OnInit {
  public step : number = 0;
  public loanForm = this.buildFormLoad();
  public typeForm : String = "";

  constructor(private fmBuilder: FormBuilder) { }

  ngOnInit(): void {
    
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
