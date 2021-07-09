import { Component, OnInit, Input } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { EventEmitter, Output } from '@angular/core';

import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() activeUser: User; //recebe informações do usuário logado e ativo
  users : User [] = [];
  confirmMsg : string; //mensagem do confirm
  confirm : boolean = false; //controla a vizualizaçãao do modal de confirm
  constructor(private userService: UserServiceService) { }
  
  getUsers() {
    this.userService.serviceGetUsers().subscribe(response => {
      //não adiciona o usuário adm logado.
      for(let i = 0; i < response.length; i++) {
        if (response[i]._id != this.activeUser._id) {
          this.users.push(response[i]);
        }
      }
      
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

}
