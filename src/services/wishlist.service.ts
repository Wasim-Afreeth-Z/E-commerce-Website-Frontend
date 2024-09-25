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
  displaywishlist(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/wishlist/displaywishlist`,request)
  }

  // delete the wishlist product
  deleteWishlist(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/wishlist/deletewishlist`,request)
  }

  // update the Wishlist stock
  updateWishlistStock(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/wishlist/updatestock`, request)
  }

  // update the WishList products
  updateWishListProduct(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/wishlist/updatewishlistproduct`, request)
  }

   // update the quantiy wishlist
   updateQuantityWishlist(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/wishlist/updateQuantity`, request)
  }

  // update the Wishlist stock when Delete Account
  updateWishlistStockDeleteAccount(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/wishlist/updatestockdeleteaccount`, request)
  }

  // Delete All the Wishlist Product
  DeleteAllWishlistProduct(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/wishlist/deleteallwishlistproduct`, request)
  }
  
  //ViewProductFormWishlist
  ViewProductFormWishlist(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/wishlist/viewproductformwishlist`,request)
  }

}
