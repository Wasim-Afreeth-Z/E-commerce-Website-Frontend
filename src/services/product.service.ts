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
  getProduct(id:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/display/${id}`)
  }

  // get the data By UserId
  getProductById(id: string): Observable<any> {
    // const token = localStorage.getItem('token')!
    // const userid = localStorage.getItem('userId')!
    const header = new HttpHeaders({
      'content-type': 'Application/json',
      'token': localStorage.getItem('token')!,
      'id': localStorage.getItem('userId')!
    })
    return this.http.get(`${this.baseUrl}/products/displaybyid/${id}`, { headers: header })
  }

  // update the data to database
  updateProduct(id: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'content-type': 'Application/json'
    })
    return this.http.put(`${this.baseUrl}/products/update/${id}`, data)
  }

  // update the quantiy product
  updateQuantityProduct(id: string, quantity: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/updateQuantity/${id}`, quantity)
  }

  // delete the data from database
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/delete/${id}`)
  }

  // category List from database
  categoryList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/categorylist`)
  }

  // category Filter from database
  categoryFilter(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/category/${id}`)
  }

  // category Filter Admin from database
  categoryFilterForDashboard(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/categorydashboard/`, request)
  }

  // search Filter from database
  searchFilter(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/search/${id}`)
  }

  // search Filter Admin from database
  searchFilterForDashboard(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/searchdashboard/`, request)
  }

  // Delete All Product
  DeleteAllProduct(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/deleteallproduct/${id}`)
  }

   // get the data from database
  ViewProduct(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/viewproduct`, request)
  }

}