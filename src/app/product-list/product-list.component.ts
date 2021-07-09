import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductServiceService } from '../product-service.service';
import { EventEmitter, Output } from '@angular/core';


import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Output() onEditProduct = new EventEmitter<Object>();
  @Output() onDelProduct = new EventEmitter<Object>();
  constructor(private productService: ProductServiceService) { }
  products : Product[] = [];//armazena os produtos recuperados do banco de dados
  confirm : boolean = false; //controla a vizualizaçãao do modal de confirm
  confirmMsg : string; //mensagem do confirm
  edit : boolean = false //controla a visualização do modal com o formulário de edição
  productForm : FormGroup //controla o formulário de cadastramento de produtos
  namePlaceHolder : string = 'Nome';
  descriptionPlaceHolder : string = 'Descrição';
  unityPlaceHolder : string = 'Unidade (kg, L, etc)';
  quantityPlaceHolder : string = 'Quantidade';
  obsPlaceHolder : string = 'Observações em geral';
  productId : string; //armazena o id do produto para os processos de deleção e edição
  
  //inicia o formulário de edição
  private initForm() : void {
    this.productForm = new FormGroup({
      name : new FormControl(null, [Validators.required]),
      description : new FormControl(null, [Validators.required]),
      unity : new FormControl(null, [Validators.required]),
      quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
      obs: new FormControl(null)
    });
  }
  
  initEdit(product : Product) {
    this.edit = true;
    this.productForm.get('name').setValue(product.name);
    this.productForm.get('description').setValue(product.description);
    this.productForm.get('unity').setValue(product.unity);
    this.productForm.get('quantity').setValue(product.quantity);
    this.productForm.get('obs').setValue(product.obs);
    this.productId = product._id;
    console.log(product);
  }

  onSubmitEdit() {
    let msg = '';
    if(this.productForm.get('name').valid && this.productForm.get('description').valid && this.productForm.get('unity').valid && this.productForm.get('quantity').valid){
      let product = {
        name: this.productForm.get('name').value,
        description: this.productForm.get('description').value,
        unity: this.productForm.get('unity').value,
        quantity: this.productForm.get('quantity').value,
        obs: this.productForm.get('obs').value,
        inStock: true //seta como se existe o produto em estoque
      }
      if (product.quantity == 0) {
        product.inStock = false;
      }
      this.productService.serviceUpdateProduct(product, this.productId).subscribe(res => {
        if(res.ok == true) {
          msg = 'Produto atualizado com sucesso!';
          this.onEditProduct.emit({msg: msg, type: "success", update: true});
          this.edit = false;
          
        } else {
          msg = 'Erro, o produto não foi atualizado!';
          this.onEditProduct.emit({msg: msg, type: "error", update: false});
        }
      });
    } else {
      //console.log("campos não preenchidos");
      msg = '';
      if(!this.productForm.get('name').valid){
        msg += 'Campo "Nome do reagente" não preenchido! ';
      } 
      if(!this.productForm.get('description').valid) {
        msg += 'Campo "Descrição" não preenchido ou com formato inválido! ';
      }
      if(!this.productForm.get('unity').valid) {
        msg += 'Campo "Unidade" não preenchido! ';
      } 
      if(!this.productForm.get('quantity').valid) {
        msg += 'Campo "Quantidade" não preenchido!';
      }
      this.onEditProduct.emit({msg: msg, type: "error", update: false});
    }
  }

  cancelEdit() {
    this.edit = false;
  }

  cancelDel() {
    this.confirm = false;
  }

  initDel(product : Product) {
    this.confirm = true;
    this.productId = product._id;
    this.confirmMsg = 'Tem certeza que deseja deletar o produto: ' + product.name + ' ?';
  }

  onDel() {
    let msg : string = '';
    this.productService.serviceDeleteProduct(this.productId).subscribe(res => {
      if(res.ok == true) {
        msg = 'Produto deletado com sucesso!';
        this.onDelProduct.emit({msg: msg, type: "success", del: true});
        this.confirm = false;
      } else {
        msg = 'Erro, o produto não foi deletado!'
        this.onDelProduct.emit({msg: msg, type: "error", del: false});
      }
    });
  }

  getProducts() {
    this.productService.serviceGetProducts().subscribe(response => {
      this.products = response;
      //console.log(response);
    });
  }
  
  ngOnInit(): void {
    this.getProducts();
    this.initForm();
  }

 
  
}
