import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  http: HttpClient = inject(HttpClient)
  private baseUrl = environment.BASEURL;

  // send the cart to database
  mycart(request: any): Observable<any> {
    const header = new HttpHeaders({
      'content-type': 'Application/json'
    })
    return this.http.post(`${this.baseUrl}/order/mycart`, request, { headers: header })
  }

   // update Quantity in home
   updateQuantityinhome(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/order/updateQuantityinhome/`, request)
  }

  // get the data from display the cart
  displaycart(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/order/displaycart/${id}`)
  }

  // get the data from display the cart Out of Stock
  displaycartOutofStock(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/order/displaycartOutofStock/${id}`)
  }

  // view product for mcart
  ViewProductFormCart(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/order/viewproductformcart`, request)
  }

  // update the quantiy cart
  updateQuantityCart(id: string, quantity: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/order/updateQuantity/${id}`, quantity)
  }


  // delete the cart
  deleteCart(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/order/deletecart/${id}`)
  }

  // send the address to database
  // addAddress(request: any): Observable<any> {
  //   const header = new HttpHeaders({
  //     'content-type': 'Application/json'
  //   })
  //   return this.http.post(`${this.baseUrl}/order/address`, request, { headers: header })
  // }

  // send the address to database
  myOrder(request: any): Observable<any> {
    const header = new HttpHeaders({
      'content-type': 'Application/json'
    })
    return this.http.post(`${this.baseUrl}/order/myorder`, request, { headers: header })
  }

  // clear cart
  ClearCart(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/order/clearcart/${id}`)
  }

  // Delete All Cart Product
  DeleteAllCartProduct(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/order/deleteallcartproduct/${id}`)
  }

  // get the data from display my Orders
  displayMyOrders(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/order/displaymyorders/${id}`)
  }

  // get the data from display my Orders in dashboard
  displayMyOrdersdashboard(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/order/displaymyordersdashboard/${id}`)
  }

  // get the data from display Address
  // displayAddress(id: string): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/order/displayaddress/${id}`)
  // }

  // update the status
  updatestatus(id: string, status: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/order/updatestatus/${id}`, status)
  }

  // update the status When Delete Account 
  updatestatusDeleteAccount(id: string, status: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/order/updatestatusdeleteaccount/${id}`, status)
  }

  // update the cart stock
  updateCartStock(id: string, stock: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/order/updatestock/${id}`, stock)
  }

  // update the cart products
  updateCartProduct(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/order/updatecartproduct/${id}`, data)
  }

  // update the cart stock When deleteaccount
  updateCartStockDeleteAccount(id: string, stock: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/order/updatestockdeleteaccount/${id}`, stock)
  }

}
