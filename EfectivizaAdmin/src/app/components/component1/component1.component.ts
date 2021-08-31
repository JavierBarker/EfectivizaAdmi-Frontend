import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.scss']
})
export class Component1Component implements OnInit {

  public step : number = 0;
  public loanForm = this.buildFormLoad();
  public typeForm : String = "";
  constructor(private fmBuilder: FormBuilder) { }

  ngOnInit(): void {
    const form1 = document.querySelector('#form1');
    form1.classList.toggle('hidden');
  }

  buildFormLoad(){
    return this.fmBuilder.group({
      name :['', Validators.required],
      typeLoan: ['', Validators.required]

    })
  }


  changeForm(){
    const form1 = document.querySelector('#form1');
    const form2 = document.querySelector('#form2');

    form1.classList.toggle('hidden');
    form2.classList.toggle('hidden');
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

}
