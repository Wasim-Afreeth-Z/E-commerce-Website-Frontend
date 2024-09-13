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
  displaySaveForLater(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/saveforlater/displaysaveforlater/${id}`)
  }

   // delete the Save For Later product
   deleteSaveForLater(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/saveforlater/deletesaveforlater/${id}`)
  }

  // update the quantiy save for later
  updateQuantitySaveForLater(id: string, quantity: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/saveforlater/updateQuantity/${id}`, quantity)
  }

   // update the saveforlater stock
   updateSaveForLaterStock(id: string, stock: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/saveforlater/updatestock/${id}`, stock)
  }

   // update the WishList products
   updateSaveForLaterProduct(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/saveforlater/updatesaveforlaterproduct/${id}`, data)
  }

   // update the saveforlater stock when Delete Account
   updateSaveForLaterStockDeleteAccount(id: string, stock: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/saveforlater/updatestockdeleteaccount/${id}`, stock)
  }

  // Delete All the Save For Later Product
  DeleteAllSaveForLaterProduct(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/saveforlater/deleteallsaveforlater/${id}`)
  }

  //View Product Form SaveForLater
  ViewProductFormSaveForLater(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/saveforlater/viewproductformsaveforlater`,request)
  }

}
