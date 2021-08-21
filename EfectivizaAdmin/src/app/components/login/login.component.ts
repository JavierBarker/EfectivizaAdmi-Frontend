import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public userLogged: any;
  public token: any;
  public identity: any;
  public loginForm = this.buildForm();

  constructor(private userService: UserService, private router: Router, private fmBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  buildForm(){
    return this.fmBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }



  setToken(){
    this.userService.login(this.loginForm.value, true).subscribe(
      response =>{
        this.token = response.token;
        localStorage.setItem('token', this.token);
        this.router.navigate(['/homePage']);
      }
    )
  }

  login(){
    this.userService.login(this.loginForm.value, false).subscribe(
      response =>{

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User Logged in Correctly',
          showConfirmButton: false,
          timer: 1500
        })

        /*let user = response.userFound;
        user.token = response.token;
        this.router.navigate(['/homePage'])
        this.identity = response.token;
        localStorage.setItem('identity',JSON.stringify(user));*/

        this.identity = response.userFound;
        localStorage.setItem('identity',JSON.stringify(this.identity));
        this.setToken();

      }
    )
  }

}
