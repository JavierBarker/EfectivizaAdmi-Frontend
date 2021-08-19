import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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

  login(){
    this.userService.login(this.loginForm.value).subscribe(
      response =>{

        let user = response.userFound;
        user.token = response.token;
        this.router.navigate(['/homePage'])
        this.identity = response.token;
        localStorage.setItem('identity',JSON.stringify(user));

      }
    )
  }

}
