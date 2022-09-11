import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../admin/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  public forgetform !: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, public auth: AuthService,private router :Router,private toastrService: ToastrService) { }
  ngOnInit(): void {
    this.forgetform = this.fb.group({
      email: [''],
    }) 
  }
  submit(){
    console.log("eeee000",this.forgetform.value.email);
    this.auth.forgetPassword(this.forgetform.value).subscribe(res => {
     
      this.router.navigateByUrl('/home')
      this.toastrService.success( "E-mail de vérification envoyé Vérifiez votre boîte aux lettres");


    console.log("eeee",this.forgetform.value.email);
      // this.employeForm.reset();
      
    }, err => {
      console.log("error!!!!!!",err.error.message)
      this.toastrService.error( err.error.message);
    })
    }
  
}