import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserServiceService } from '../user-service.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user : User;
  userInfo : boolean = false; //controla a visualização das informações do usuário
  
  productsList : boolean = false; //controla a visualização da lista de produtos
  orderList : boolean = false; //controla a visualização de lista de pedidos
  alert : boolean; //controla vizualização do "popUp" de alerta
  success : boolean; //indica se mensagem de sucesso
  error : boolean; //indica se mensagem de erro
  msg : string; //mensagem apresentada por alertas
  constructor(
    private userService: UserServiceService,
    private route : ActivatedRoute,
    ) { }
  
  getUser() {
    let id = this.route.snapshot.paramMap.get("id"); //retorna o id da rota
    this.userService.serviceGetUser(id).subscribe(response => {
      this.user = response;
      //console.log(this.user);
      this.userInfo = true;
    }) 
  }
  

  //inicia o processo de listagem de produtos
  initListProducts() {
    this.productsList = true;
    this.orderList = false;
  }


  ngOnInit(): void {
    this.getUser();
  }

}
