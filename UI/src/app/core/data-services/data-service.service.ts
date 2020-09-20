import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {


  private dataSource = new BehaviorSubject<any>({});
  currentData = this.dataSource.asObservable();
  constructor() { }

  changeData(newData: any) {
    console.log("changeData",newData)
    this.dataSource.next(newData);
  }
}
