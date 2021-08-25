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
  public clientEditForm = this.editForm();
  public token;
  public getUserVar: any;
  public getUserId: any;
  public formEditChanges: any = {};

  constructor(
    private userService: UserService,
    private router: Router,
    private fmBuilder: FormBuilder) {
      //this.token = this.userService.getToken();
    }

  ngOnInit(): void {
    this.getUser();
    this.clientEditForm.valueChanges.subscribe(
      value=>{
        if(value.dpi !== this.getUserId.dpi) this.formEditChanges.dpi  = value.dpi;
        if(value.name!==this.getUserId.name) this.formEditChanges.name = value.name;
        if( value.lastname !== this.getUserId.lastname ) this.formEditChanges.lastname = value.lastname
        if(value.username !== this.getUserId.username) this.formEditChanges.username = value.username
      }
    )
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

  editForm(){
    return this.fmBuilder.group({
      dpi      : ['', Validators.required],
      name     : ['', Validators.required],
      lastname : ['', Validators.required],
      username : ['', Validators.required],
    })
  }


  getUser(){
    this.userService.getUsers().subscribe(
      response=>{
        this.getUserVar = response.foundUsers;
      }
    )
  }

  getIdUser(id: string){

    this.userService.getUserId(id).subscribe(
      response=>{
        this.getUserId = response.foundUser;
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

  deleteUser(id: string){

    this.userService.deleteUser(id).subscribe(
      response=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario Eliminado',
          showConfirmButton: false,
          timer: 1500
        })
        this.showDeleteModal = false;
        this.getUser();


      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se pudo Eliminar el usuario',
          showConfirmButton: false,
          timer: 1500
        })

      }

    )

  }

  editUser(id: string){
    this.userService.editUser(id,this.formEditChanges).subscribe(
      response=>{
        this.getUser();
        this.showEditModal = false;
      },
      error=>{
        console.log(<any>error);

      }
    )
  }

  showCreateModal: boolean = false;
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;


}
