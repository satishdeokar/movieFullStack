import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl: string = environment.baseUrl;
  headers: HttpHeaders;

  private headerOptions: any = {
    'Content-type': 'application/json',
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.headers = new HttpHeaders(this.headerOptions);
  }

  /**
   * for using get method.
   * @param url : url where request
   * @param params
   */
  secureGet(url: string, params?: object) {
    const apiUrl = `${this.baseUrl}${url}${this.generateQueryString(params)}`;
    return this.http.get(apiUrl, {
      headers: this.headers
    });
  }

  /**
   * for using put method
   * @param url : url where request will be send
   * @param data : body part of post data
   * @param params : Query params
   */
  securePut(url: string, data?: any, params?: object) {
    const apiUrl = `${this.baseUrl}${url}${this.generateQueryString(params)}`;
    return this.http.put(apiUrl, data, {
      headers: this.headers
    });
  }


  /**
   * for using put method
   * @param url : url where request will be send
   * @param data : body part of post data
   * @param params : Query params
   */
  securePost(url: string, data?: any, params?: object) {
    const apiUrl = `${this.baseUrl}${url}${this.generateQueryString(params)}`;
    return this.http.post(apiUrl, data, {
      headers: this.headers
    });
  }

  /**
   * delete method does not have any body part
   * passes object id as parameter
   * also passes token in header part
   * @param url : url where request will be send
   */
  secureDelete(url: string, data?: any, params?: object) {
    const apiUrl = `${this.baseUrl}${url}${this.generateQueryString(params)}`;
    return this.http.request('DELETE', apiUrl, {
      headers: this.headers,
      body: data,
    });
  }

  /**
  * for using put method
  * @param url : url where request will be send
  * @param data : body part of post data
  * @param params : Query params
  */
  post(url: string, data?: any, params?: object) {
    const apiUrl = `${this.baseUrl}${url}${this.generateQueryString(params)}`;
    return this.http.post(apiUrl, data);
  }

  /**
   * for using get method.
   * @param url : url where request
   * @param params
   */
  get(url: string, params?: object) {
    
    const apiUrl = `${this.baseUrl}${url}${this.generateQueryString(params)}`;
    console.log(apiUrl,'apiUrl')
    return this.http.get(apiUrl);
  }
  /**
   * Helper Method that will generate the queryString.
   * @param params Object to be converted into URLSearchParam.
   */
  generateQueryString(params?: object): string {
    let queryString = '';
    const httpParam = new URLSearchParams();
    Object.keys(params || {}).forEach(key => httpParam.set(key, params[key]));
    queryString = httpParam.toString() ? `?${httpParam.toString()}` : '';
    return queryString;
  }
}
