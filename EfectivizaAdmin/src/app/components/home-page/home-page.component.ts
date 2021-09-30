import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  userLogged: any;
  showProfileModal: boolean = false;

  MenuItemAdmin= [
    {
      title: 'Principal',
      link: '/homePage/mainPage'
    },
    {
      title: 'Clientes',
      link: '/homePage/clients'
    },
    {
      title: 'Contactos',
      link: '/homePage/contact'
    }
  ];

  MenuItemClient= [
    {
      title: 'Principal',
      link: '/homePage/mainPage',
    },
    {
      title: 'Contactos',
      link: '/homePage/contact'
    }
  ];

  constructor(private userService: UserService, private router: Router) {
    this.userLogged = this.userService.getIdentity();
  }

  ngOnInit(): void {

  }

  logOut(){

    localStorage.clear();
    this.router.navigate(['/login'])

  }

}
