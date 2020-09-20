import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/http-services/http.service';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/api-urls.enum';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  createUserForm: FormGroup;
  errorMessage ='';
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) { }
  ngOnInit() {
    this.createUserForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      email_address: ["", [Validators.required]],
      password: ["", [Validators.required]],
      address: ["", [Validators.required]],
      mobileNumber: ["", [Validators.required]],
    });
  }

  onSubmit() {
    const payload = {
      userName: this.createUserForm.value.username,
      email_address: this.createUserForm.value.email_address,
      password: this.createUserForm.value.password,
      address: this.createUserForm.value.address,
      mobileNumber: this.createUserForm.value.mobileNumber,
      userType: 'Admin'
    };
    console.log(payload,'payload')
     this.httpService.post(ApiUrls.createUser,payload).subscribe(res=>{
       console.log(res, "user created");
       alert("User Created")
       this.createUserForm.reset();
      //  this.router.navigate(['/dashboard/inventory'])
     },error=>{
       console.log(error,'error');
       if(error.error){
         this.errorMessage = error.error.message;
       }
     })
    //this.companies.value
    //console.log('this.createUserForm', this.companies.value);
  }
}