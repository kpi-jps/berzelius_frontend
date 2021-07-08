import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  baseURL = 'http://localhost:8080/api/usuarios/';

  constructor(private http : HttpClient) { }
  //registra um novo contato no banco de dados
  serviceRegisterUser(user) : Observable<any>{
    let body = new HttpParams();
    body = body.set("name", user.name);
    body = body.set("email", user.email);
    body = body.set("login", user.login);
    body = body.set("password", user.password);
    body = body.set("adm", user.adm);
    return this.http.post(this.baseURL, body, {observe: "response"});
  }
  //obtem todos os usuários registrados no banco de dados
  serviceGetUsers() : Observable<User[]> {
    return this.http.get<User[]>(this.baseURL);
  }

  serviceGetAccess(access, id : string) : Observable<any> {
    let body = new HttpParams();
    body = body.set("login", access.login);
    body = body.set("password", access.password);
    return this.http.post(this.baseURL + id, body, {observe: "response"});
  }
  

}
