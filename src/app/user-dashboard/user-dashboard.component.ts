import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserServiceService } from '../user-service.service';
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user : User;
  constructor(
    private userService: UserServiceService,
    private routes : Router,
    private route : ActivatedRoute,
    private location : Location

    ) { }
  
  getUser() {
    let id = this.route.snapshot.paramMap.get("id"); //retorna o id da rota
    this.userService.serviceGetUser(id).subscribe(response => {
      this.user = response;
      console.log(this.user);
    }) 
  }
  ngOnInit(): void {
    this.getUser();
  }

}
