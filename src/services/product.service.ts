import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  http: HttpClient = inject(HttpClient)
  private baseUrl = environment.BASEURL;

  // send the data to database
  CreateProduct(request: any): Observable<any> {
    const header = new HttpHeaders({
      'content-type': 'Application/json'
    })
    return this.http.post(`${this.baseUrl}/products/create/`, request, { headers: header })
  }

  // get the data from database
  getProduct(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/display`, request)
  }

  // get the data By UserId
  getProductById(request: any): Observable<any> {
    // const token = localStorage.getItem('token')!
    // const userid = localStorage.getItem('userId')!
    const header = new HttpHeaders({
      'content-type': 'Application/json',
      'token': localStorage.getItem('token')!,
      'id': localStorage.getItem('userId')!
    })
    return this.http.post(`${this.baseUrl}/products/displaybyid`, request, { headers: header })
  }

  // update the data to database
  updateProduct(request: any): Observable<any> {
    const headers = new HttpHeaders({
      'content-type': 'Application/json'
    })
    return this.http.post(`${this.baseUrl}/products/update`, request)
  }

  // update the quantiy product
  updateQuantityProduct(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/updateQuantity`, request)
  }

  // delete the data from database
  deleteProduct(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/delete`, request)
  }

  // category List from database
  categoryList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/categorylist`)
  }

  // category Filter from database
  categoryFilter(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/category`, request)
  }

  // category Filter Admin from database
  categoryFilterForDashboard(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/categorydashboard/`, request)
  }

  // search Filter from database
  searchFilter(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/search/`, request)
  }

  // search Filter Admin from database
  searchFilterForDashboard(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/searchdashboard/`, request)
  }

  // Delete All Product
  DeleteAllProduct(request: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/deleteallproduct`, request)
  }

  // get the data from database
  ViewProduct(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/viewproduct`, request)
  }

}