import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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
  public loginForm = new FormControl();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  getToken(){
    this.userService.login(this.userLogged,'true').subscribe(

      response =>{
        this.token = response.token;
        localStorage.setItem('token',this.token);

      },
      error =>{
        console.log(<any>error)
      }

    )
  }

  login(){
    this.userService.login(this.userLogged).subscribe(
      response =>{
        this.identity = response.userFound;
        localStorage.setItem('identity',JSON.stringify(this.identity));
        this.getToken();
      }
    )
  }

}
