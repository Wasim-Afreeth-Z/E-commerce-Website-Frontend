import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  http: HttpClient = inject(HttpClient)
  private baseUrl = environment.BASEURL;

  // send the mywishlist to database
  myWishlist(request: any): Observable<any> {
    const header = new HttpHeaders({
      'content-type': 'Application/json'
    })
    return this.http.post(`${this.baseUrl}/wishlist/create`, request, { headers: header })
  }

  // get the data from display the wishlist
  displaywishlist(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/wishlist/displaywishlist/${id}`)
  }

  // delete the wishlist product
  deleteWishlist(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/wishlist/deletewishlist/${id}`)
  }

  // update the Wishlist stock
  updateWishlistStock(id: string, stock: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/wishlist/updatestock/${id}`, stock)
  }

  // update the WishList products
  updateWishListProduct(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/wishlist/updatewishlistproduct/${id}`, data)
  }

   // update the quantiy wishlist
   updateQuantityWishlist(id: string, quantity: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/wishlist/updateQuantity/${id}`, quantity)
  }

  // update the Wishlist stock when Delete Account
  updateWishlistStockDeleteAccount(id: string, stock: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/wishlist/updatestockdeleteaccount/${id}`, stock)
  }

  // Delete All the Wishlist Product
  DeleteAllWishlistProduct(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/wishlist/deleteallwishlistproduct/${id}`)
  }
  
  //ViewProductFormWishlist
  ViewProductFormWishlist(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/wishlist/viewproductformwishlist`,request)
  }

}
