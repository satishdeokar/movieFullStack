import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpService } from 'src/app/core/http-services/http.service';
import { ApiUrls } from 'src/app/config/api-urls.enum';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  moviesList: any;
  tableData: any;
  ELEMENT_DATA: any;
  dataSource = new MatTableDataSource;

  @ViewChild('search') search: ElementRef<HTMLInputElement>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['title', 'directorName', 'bannerUrl', 'dateReleased', 'action'];

  total: number;
  recordPerPage: number;
  currentPage = 1;
  pageSizeOptions: string[];

  constructor(
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.httpService.get(ApiUrls.getMovies).subscribe((res: any) => {
      this.moviesList = res['data'];
      console.log(this.moviesList,'this.moviesList',res)
      this.dataSource = new MatTableDataSource(this.moviesList);
      this.total = this.moviesList.totalMovies;
      setTimeout(()=>{ 
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
       }, 30);
    }, (err) => {
      console.log('err', err);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.recordPerPage = pageData.pageSize;
  }


  edit(movie, i?) {
    this.router.navigateByUrl(`dashboard/movies/create-movie/${movie._id}`);
  }
  delete(movie, i?) {
    this.httpService.secureDelete(`${ApiUrls.deleteMovie}?id=${movie._id}`).subscribe((res) => {
      console.log('res', res);
      if (res) {
        const itemIndex = this.moviesList.findIndex(obj => obj['_id'] === movie['_id']);
        this.moviesList.splice(itemIndex, 1);
        this.dataSource = new MatTableDataSource(this.moviesList);
      }
    }, (err) => {
      console.log('err', err);
    });
  }
}

