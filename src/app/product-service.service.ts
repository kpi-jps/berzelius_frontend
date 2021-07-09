import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from "rxjs";
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  
  baseURL = 'http://localhost:8080/api/produtos/';

  constructor(private http : HttpClient) { }
  //registra um novo contato no banco de dados
  serviceRegisterProduct(product) : Observable<any>{
    let body = new HttpParams();
    body = body.set("name", product.name);
    body = body.set("description", product.description);
    body = body.set("unity", product.unity);
    body = body.set("quantity", product.quantity);
    body = body.set("obs", product.obs);
    body = body.set("inStock", product.inStock);
    return this.http.post(this.baseURL, body, {observe: "response"}); 
  }

  //atualiza um produto específico no banco de dados
  serviceUpdateProduct(product, id : string) : Observable<any>{
    let body = new HttpParams();
    body = body.set("name", product.name);
    body = body.set("description", product.description);
    body = body.set("unity", product.unity);
    body = body.set("quantity", product.quantity);
    body = body.set("obs", product.obs);
    body = body.set("inStock", product.inStock);
    return this.http.put(this.baseURL + id, body, {observe: "response"});
  }
  //obtem todos os produtoss registrados no banco de dados
  serviceGetProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(this.baseURL);
  }

  //deleta um um produto específico no banco de dados
  serviceDeleteProduct(id : string) : Observable<any>{
    return this.http.delete(this.baseURL + id, {observe: "response"});
  }

}
