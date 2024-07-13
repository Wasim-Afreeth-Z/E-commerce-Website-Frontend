import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  http: HttpClient = inject(HttpClient)
  private baseUrl = 'http://localhost:5000'; 

  // send the data to database
  CreateProduct(request: any): Observable<any> {
    const header = new HttpHeaders({
      'content-type': 'Application/json'
    })
    return this.http.post(`${this.baseUrl}/products/create/`, request, { headers: header })
  }

  // get the data from database
  getProduct(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/display/`)
  }

  // get the data By UserId
  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/displaybyid/${id}`)
  }

  // update the data to database
  updateProduct(id: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'content-type': 'Application/json'
    })
    return this.http.put(`${this.baseUrl}/products/update/${id}`, data)
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

   // category Filter from database
   categoryFilterForDashboard(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/categorydashboard/`,request)
  }
   // search Filter from database
   searchFilter(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/search/${id}`)
  }
}