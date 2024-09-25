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
  displaycart(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/order/displaycart/`, request)
  }

  // get the data from display the cart Out of Stock
  displaycartOutofStock(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/order/displaycartOutofStock/`, request)
  }

  // view product for mcart
  ViewProductFormCart(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/order/viewproductformcart`, request)
  }

  // update the quantiy cart
  updateQuantityCart(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/order/updateQuantity/`, request)
  }


  // delete the cart
  deleteCart(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/order/deletecart/`, request)
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
  ClearCart(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/order/clearcart`,request)
  }

  // Delete All Cart Product
  DeleteAllCartProduct(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/order/deleteallcartproduct`, request)
  }

  // get the data from display my Orders
  displayMyOrders(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/order/displaymyorders`, request)
  }

  // get the data from display my Orders in dashboard
  displayMyOrdersdashboard(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/order/displaymyordersdashboard`, request)
  }

  // get the data from display Address
  // displayAddress(id: string): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/order/displayaddress/${id}`)
  // }

  // update the status
  updatestatus(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/order/updatestatus`, request)
  }

  // update the status When Delete Account 
  updatestatusDeleteAccount(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/order/updatestatusdeleteaccount`, request)
  }

  // update the cart stock
  updateCartStock(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/order/updatestock`, request)
  }

  // update the cart products
  updateCartProduct(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/order/updatecartproduct`, request)
  }

  // update the cart stock When deleteaccount
  updateCartStockDeleteAccount(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/order/updatestockdeleteaccount`, request)
  }

}
