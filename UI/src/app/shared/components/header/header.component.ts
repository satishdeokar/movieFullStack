import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/data-services/local-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  userDetails:any;
  isLogin=false;
  constructor(
    private router: Router,
    private localStorage:LocalStorageService,
  ) { 
    this.userDetails= this.localStorage.getLocalStorage('userDetails');
    if(this.userDetails && this.userDetails.userName){
      this.isLogin=true
    }
  }

  ngOnInit() {
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
  login(){
    this.router.navigate(['/user/user/login'])
    
  }
  logOut(){
    this.localStorage.clearLocalStorageItem();
    this.router.navigate(['/user/landing'])
  }
}
