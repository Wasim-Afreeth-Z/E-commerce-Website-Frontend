import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SaveForLaterService {

  http: HttpClient = inject(HttpClient)
  private baseUrl = environment.BASEURL;

   // send the save for later to database
   SaveForLater(request: any): Observable<any> {
    const header = new HttpHeaders({
      'content-type': 'Application/json'
    })
    return this.http.post(`${this.baseUrl}/saveforlater/create`, request, { headers: header })
  }

  // get the data from display the Save For Later
  displaySaveForLater(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/saveforlater/displaysaveforlater`, request)
  }

   // delete the Save For Later product
   deleteSaveForLater(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/saveforlater/deletesaveforlater`,request)
  }

  // update the quantiy save for later
  updateQuantitySaveForLater(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/saveforlater/updateQuantity`, request)
  }

   // update the saveforlater stock
   updateSaveForLaterStock(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/saveforlater/updatestock`, request)
  }

   // update the WishList products
   updateSaveForLaterProduct(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/saveforlater/updatesaveforlaterproduct`, request)
  }

   // update the saveforlater stock when Delete Account
   updateSaveForLaterStockDeleteAccount(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/saveforlater/updatestockdeleteaccount`, request)
  }

  // Delete All the Save For Later Product
  DeleteAllSaveForLaterProduct(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/saveforlater/deleteallsaveforlater`, request)
  }

  //View Product Form SaveForLater
  ViewProductFormSaveForLater(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/saveforlater/viewproductformsaveforlater`,request)
  }

}
