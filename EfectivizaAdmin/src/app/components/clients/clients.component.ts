import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  providers: [ UserService]
})
export class ClientsComponent implements OnInit {

  public clientForm = this.buildForm();
  public token; 
  public getUserVar: any;

  constructor(
    private userService: UserService,
    private router: Router, 
    private fmBuilder: FormBuilder) {
      //this.token = this.userService.getToken();
    }

  ngOnInit(): void {
    this.getUser();
  }

  buildForm(){
    return this.fmBuilder.group({
      dpi      : ['', Validators.required],
      name     : ['', Validators.required],
      lastname : ['', Validators.required],
      username : ['', Validators.required],
      password : ['', Validators.required],
      rol      : ['', Validators.required]
    })
  }


  getUser(){
    this.userService.getUsers().subscribe(
      response=>{
        this.getUserVar = response.foundUsers;
      }
    )
  }

  addUser(){
    this.userService.createUser(this.clientForm.value).subscribe(
      response =>{
        
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario Agregado',
          showConfirmButton: false,
          timer: 1500
        })

        

        this.showCreateModal = false;
        this.getUser();
        
      }
    )
  }

  showCreateModal: boolean = false;
  

}
