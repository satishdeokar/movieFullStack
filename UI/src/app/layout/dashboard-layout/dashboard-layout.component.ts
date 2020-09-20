import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { LocalStorageService } from 'src/app/core/data-services/local-storage.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  userDetails:any;
  fillerNav = [
    { name: 'Create User', route: '/dashboard/create-user', icon: 'account_circle' },
    { name: 'Create Movie', route: '/dashboard/movies/create-movie', icon: 'list' },
    { name: 'Movie List', route: '/dashboard/movies/movie-list', icon: 'list' }
  ];

  fillerContent = Array.from({ length: 10 }, () =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua.`);

  private mobileQueryListener: () => void;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private localStorage:LocalStorageService
    ) {
      // this.userDetails= this.localStorage.getLocalStorage('userDetails');
      // if(this.userDetails.userType==="Admin"){
      //   this.fillerNav = [
      //     { name: 'Create User', route: '/dashboard/create-user', icon: 'account_circle' }
      //   ];
      // }else {
      //   this.fillerNav = [
      //     { name: 'companies', route: '/dashboard/inventory', icon: 'list' },
      //   ];
      // }
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

}
