import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  access : boolean = true; //controla a visualização do formulário de acesso
  register : boolean = false; //controla a visualização do formulário de registro
  formRegister : FormGroup; //controla o formuário de registro
  formAccess : FormGroup; //controla o formulário de acesso
  
  //definindo os placeholders do formulários
  namePlaceHolder : string = 'Nome';
  emailPlaceHolder : string = 'email@email.com';
  loginPlaceHolder : string = 'Login';
  passwdPlaceHolder : string = '********';

  //ativa a vizualização do formulário de registro
  activeRegister() : void {
    this.access = false;
    this.register = true;
  }
  //ativa a vizualização do formulário de acesso
  activeAccess() : void {
    this.access = true;
    this.register = false;
  }
  constructor() { }

  //inicia o formulário de acesso
  private initFormAccess() : void{
    this.formAccess = new FormGroup({
      loginAccess : new FormControl(null, [Validators.required]),
      passwdAccess : new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  //inicia o formulário de registro
  private initFormRegister() : void{
    this.formRegister = new FormGroup({
      nameRegister : new FormControl(null, [Validators.required]),
      emailRegister : new FormControl(null, [Validators.required, Validators.email]),
      loginRegister : new FormControl(null, [Validators.required]),
      passwdRegister : new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }
  
  ngOnInit(): void {
    //inicializa o os formulários com a inicialização do componente
    this.initFormAccess();
    this.initFormRegister(); 
  }

}
