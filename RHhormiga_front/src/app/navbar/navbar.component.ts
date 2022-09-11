import { Component, OnInit } from '@angular/core';
import { AuthService } from '../admin/services/auth.service';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // token=sessionStorage.getItem('token')||""
  // user:any=jwt_decode(this.token)

  constructor(public auth: AuthService,private route:Router) { }

  ngOnInit(): void {
  }
  logout() {
    this.auth.logout().subscribe((data) => {
      sessionStorage.clear();

      this.auth.isauth=false;
      console.log("datalog",data)
      this.route.navigateByUrl("home")
    });


   
}
}
 