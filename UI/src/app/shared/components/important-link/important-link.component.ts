import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/http-services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-important-link',
  templateUrl: './important-link.component.html',
  styleUrls: ['./important-link.component.scss']
})
export class ImportantLinkComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  linkClick(link){
    this.router.navigate([link]);
  }
}
