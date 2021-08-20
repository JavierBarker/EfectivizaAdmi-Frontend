import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  MenuItem= [
    {
      title: 'clientes',
      link: '/homePage/clients'
    },
    {
      title: 'componente 1',
      link: '/homePage/component1',
      selected: true
    },
    {
      title: 'componente 2',
      link: '/homePage/component2'
    }
  ];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
