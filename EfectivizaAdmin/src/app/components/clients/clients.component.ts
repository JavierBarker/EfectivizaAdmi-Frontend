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

  public serchUsername: any;

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
        if(value.phone !== this.getUserId.phone) this.formEditChanges.phone = value.phone
        if(value.email !== this.getUserId.email) this.formEditChanges.email = value.email
      }
    )
  }

  buildForm(){
    return this.fmBuilder.group({
      dpi      : ['', Validators.required],
      name     : ['', Validators.required],
      lastname : ['', Validators.required],
      username : ['', Validators.required],
      phone : ['', Validators.required],
      email : [''],
      password : ['', Validators.required],
      rol      : ['', Validators.required]
    })
  }

  editForm(){
    return this.fmBuilder.group({
      dpi      : ['', Validators.required],
      name     : ['', Validators.required],
      lastname : ['', Validators.required],
      phone : ['', Validators.required],
      email : ['', Validators.required],
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
        this.clientForm.reset();

      },
      error=>{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Debe llenar todos los campos obligatorios',
          showConfirmButton: false,
          timer: 1500
        })
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
    if (this.formEditChanges.dpi.length === 0) {
      delete this.formEditChanges.dpi;
    }
    if (this.formEditChanges.name.length === 0) {
      delete this.formEditChanges.name;
    }
    if (this.formEditChanges.lastname.length === 0) {
      delete this.formEditChanges.lastname;
    }
    if (this.formEditChanges.username.length === 0) {
      delete this.formEditChanges.username;
    }
    if(this.formEditChanges.phone.length === 0){
      delete this.formEditChanges.phone;
    }
    if(this.formEditChanges.email.length === 0){
      delete this.formEditChanges.email;
    }

    this.userService.editUser(id,this.formEditChanges).subscribe(
      response=>{

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario Editado',
          showConfirmButton: false,
          timer: 1500
        })

        this.getUser();
        this.showEditModal = false;

      },
      error=>{

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se pudo Editar el usuario',
          showConfirmButton: false,
          timer: 1500
        })

      }
    )
  }

  serchClientByUsername(){
    this.userService.serchClient(this.clientForm.value.username).subscribe(
      response=>{
        this.getUserVar = response.foundUsers;
      }
    )
    
  }

  showCreateModal: boolean = false;
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  showClientModal: boolean = false;


}