import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../app/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  http: HttpClient = inject(HttpClient)
  private baseUrl = environment.BASEURL;

  // get the data from database
  DisplayProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/super_admin/display`)
  }

  // search Filter for products from database
  searchFilterForProducts(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/super_admin/search-product`, request)
  }

  // category Filter from database
  categoryFilter(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/super_admin/category`,request)
  }

  // get the data from database
  DisplayUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/super_admin/display-user`)
  }

  // delete the User
  deleteUser(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/super_admin/delete-user`,request)
  }

}
