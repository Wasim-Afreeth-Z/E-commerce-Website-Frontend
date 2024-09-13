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
  searchFilterForProducts(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/super_admin/search-product/${id}`)
  }

  // category Filter from database
  categoryFilter(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/super_admin/category/${id}`)
  }

  // get the data from database
  DisplayUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/super_admin/display-user`)
  }

  // delete the User
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/super_admin/delete-user/${id}`)
  }

}
