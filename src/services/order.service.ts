import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  http: HttpClient = inject(HttpClient)
  private baseUrl = 'http://localhost:5000'; 

  // send the cart to database
  mycart(request: any): Observable<any> {
    const header = new HttpHeaders({
      'content-type': 'Application/json'
    })
    return this.http.post(`${this.baseUrl}/order/mycart`, request, { headers: header })
  }

   // get the data from database
   getcart(): Observable<any> {
    return this.http.get(`${this.baseUrl}/order/getcart`)
  }

   // get the data from display the cart
   displaycart(id:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/order/displaycart/${id}`)
  }

  // update the quantiy
  updateQuantity(id: string, quantity: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/order/updateQuantity/${id}`, quantity)
  }

  
  // delete the cart
  deleteCart(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/order/deletecart/${id}`)
  }

  // send the address to database
   addAddress(request: any): Observable<any> {
    const header = new HttpHeaders({
      'content-type': 'Application/json'
    })
    return this.http.post(`${this.baseUrl}/order/address`, request, { headers: header })
  }

  // send the address to database
   myOrder(request: any): Observable<any> {
    const header = new HttpHeaders({
      'content-type': 'Application/json'
    })
    return this.http.post(`${this.baseUrl}/order/myorder`, request, { headers: header })
  }

    // clear cart
    ClearCart(): Observable<any> {
      return this.http.delete(`${this.baseUrl}/order/clearcart`)
    }

}
