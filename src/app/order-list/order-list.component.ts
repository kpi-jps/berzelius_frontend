import { Component, OnInit, Input } from '@angular/core';

import { ProductServiceService } from '../product-service.service';
import { OrderServiceService } from '../order-service.service';
import { EventEmitter, Output } from '@angular/core';
import { User } from '../user';
import { Product } from '../product';
import { Order } from '../order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  @Input() activeUser: User; //recebe informações do usuário logado e ativo
  @Output() onEditProduct = new EventEmitter<Object>();
  @Output() onDelProduct = new EventEmitter<Object>();
  @Output() onOrderProduct = new EventEmitter<Object>();
  constructor(private productService: ProductServiceService, private orderService: OrderServiceService) { }
  orders : Order[] = []
  confirm : boolean = false; //controla a vizualizaçãao do modal de confirm
  confirmMsg : string; //mensagem do confirm
  process : boolean = false //controla a visualização do modal do processamento de pedidos
  selectedProduct : Product;//armazena o produto selecionado para pedido
  productName : String = '';
  productQuantity : Number = 0;
  productUnity : String = '';
 
  productId : string; //armazena o id do produto para os processos de deleção e edição
  empty : boolean = false; //indica se a lista de produtos está vazia

  cancelProcess() {
    this.process = false;
  }

  cancelDel() {
    this.confirm = false;
  }

  initDel(product : Product) {
    this.confirm = true;
    this.productId = product._id;
    this.confirmMsg = 'Tem certeza que deseja deletar o produto: ' + product.name + ' ?';
  }
  onDel() {}
  getOrders() {
    this.orderService.serviceGetOrders().subscribe(response => {
      if (response.length == 0) {
        this.empty = true;
      } else {
        this.orders = response;
        //console.log(response);
      }
      
    });
  }

  ngOnInit(): void {
    this.getOrders()
  }

}
