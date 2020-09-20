import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/http-services/http.service';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/api-urls.enum';
import { LocalStorageService } from 'src/app/core/data-services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage ='';
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private localStorage:LocalStorageService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  onSubmit() {
    if(this.loginForm.value.username === "Admin" && this.loginForm.value.password === "Admin123"){
      alert("You Login as a test user, Please create user in DB");
      this.router.navigate(['/dashboard/create-user'])

    }
    const payload = {
      email_address: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
     this.httpService.post(ApiUrls.logInUser,payload).subscribe((res:any)=>{
       console.log(res, "user login");
       this.localStorage.setLocalStorage('userDetails',res.userDetails)
       if(res.status===200){
        if(res.userDetails.userType ==="Admin"){
          this.router.navigate(['/dashboard/create-user'])
        }else {
          alert("Invalid user Type");
        }
       }
       
       
     },error=>{
       console.log(error,'error');
       if(error.error){
         this.errorMessage = error.error.message;
       }
     })
    console.log('this.loginForm', this.loginForm.value,payload);
  }
}
