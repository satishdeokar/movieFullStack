import { Component, OnInit, ViewChild, AfterViewInit, Input, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/core/http-services/http.service';
import { DataServiceService } from 'src/app/core/data-services/data-service.service';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  tableData: any;
  ELEMENT_DATA: any;
  dataSource = new MatTableDataSource;

  // tslint:disable-next-line: no-input-rename
 // @Input('tableConfig')
  tableConfig: any;
  // tslint:disable-next-line: no-input-rename
   

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[];

  total: number;
  recordPerPage: number;
  currentPage = 1;
  pageSizeOptions: string[];


  @Output() eventToEmit = new EventEmitter<object>();

  constructor(
    private dataService: DataServiceService
  ) {
  }

  ngOnInit() {
    console.log('this.tableConfig in child comp###', this.tableConfig)
    this.dataService.currentData.subscribe(data => {
      this.tableConfig = data
      this.loadTable(this.tableConfig);
    });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadTable(data) {
    if (data) {
      this.tableData = data;
      this.displayedColumns = this.tableData.headers;
      this.ELEMENT_DATA = this.tableData.elementsData.sort((a, b) => (b - a));
      this.total = this.tableData.pagination.total;
      console.log('this.loadTable', this.tableData)
      this.recordPerPage = this.tableData.pagination.recordPerPage;
      this.pageSizeOptions = this.tableData.pagination.pageSizeOptions;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, 0);
    }
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.recordPerPage = pageData.pageSize;
  }

  onTableAction(item, row = null) {
    console.log('item ##### ', item);
    //this.deleteRowDataTable(row._id);
    console.log(row)
    const tableData = {
      eventType: item,
      data: row
    };
    // console.log('tableData', tableData);
    this.eventToEmit.emit(tableData);
  }




}
