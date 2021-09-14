import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-loans-client',
  templateUrl: './loans-client.component.html',
  styleUrls: ['./loans-client.component.scss'],
  providers: [UserService, LoanService]
})
export class LoansClientComponent implements OnInit {
  public step: number = 0;
  public loanForm = this.buildFormLoad();
  public typeForm: String = "";
  public idClient: any = "";
  public token: any = "";
  public dateToday: any;
  loansRequest: any;
  minDate: Date;

  constructor(private fmBuilder: FormBuilder,
    private userService: UserService,
    private loanService: LoanService,
    private activatedRoute: ActivatedRoute) {

    this.token = this.userService.getToken();



    


  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((dataRoute) => {
      this.idClient = dataRoute.get('id');
    })

    this.getLoansClient();
    console.log(this.loansRequest);

    const yesterdayDays = new Date(Date.now());
    this.minDate = new Date(yesterdayDays)
  }

  buildFormLoad() {
    return this.fmBuilder.group({
      idUser: ['', Validators.required],
      amount: [0, Validators.required],
      paymentDate: [Date, Validators.required],
      description: this.fmBuilder.group({
        description: [''],
        direction: [''],
        mark: [''],
        model: [''],
        year: [0],
        type: ['']
      }),
      typeLoan: ['', Validators.required]
    })
  }
  
  getLoansClient(){
    this.loanService.getLoansClient(this.idClient, this.token).subscribe(data => { this.loansRequest = data })
  }

  addLoan() {
    this.loanService.addLoanClient(this.idClient, this.token, this.loanForm.value).subscribe(
      response =>{

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Prestamo Agregado',
          showConfirmButton: false,
          timer: 1500
        })

        this.loanForm.reset();
        this.getLoansClient();
        this.showLoanModal = false;
        this.step = 0;
      },
      error=>{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se logro Agregar el Prestamo',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )

    
    
  }

  next() {
    if (this.step === 1) {
      this.step = 1;
    } else {
      this.step++
    }
  }


  checkForm() {
    if (this.loanForm.value.typeLoan.toString() === "Mobiliario") {
      this.typeForm = "Mobiliario";
    }
    if (this.loanForm.value.typeLoan.toString() === "Vehículo") {
      this.typeForm = "Vehículo";
    }
    if (this.loanForm.value.typeLoan.toString() === "Joyería") {
      this.typeForm = "Joyería";
    }
    if (this.loanForm.value.typeLoan.toString() === "Línea Blanca") {
      this.typeForm = "Línea Blanca";
    }
    if (this.loanForm.value.typeLoan.toString() === "Inmobiliario") {
      this.typeForm = "Inmobiliario";
    }
  }

  previous() {
    if (this.step === 0) {
      this.step = 0;
    } else {
      this.step--
    }
  }

  cancel() {
    this.step = 0;
  }



  showLoanModal: boolean = false;
}
