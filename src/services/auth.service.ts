import { inject, Injectable } from '@angular/core';
import { environment } from '../app/environment/environment';
import { AES } from 'crypto-js';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // npm i crypto-js
  // encryption
  encryptData(value: any) {
    return AES.encrypt(
      JSON.stringify(value), environment.SECRETKEY
    ).toString();
  }

  // decryption
  decryptData(value: any) {
    return JSON.parse(
      AES.decrypt(value.data, environment.SECRETKEY)
        .toString(CryptoJS.enc.Utf8)
    )
  }

  isLogedin: boolean = false

  login() {
    this.isLogedin = true
  }

  logOut(): void {
    this.isLogedin = false
  }

  isAuthentication(): boolean {
    return this.isLogedin
  }

  http: HttpClient = inject(HttpClient)
  private baseUrl = environment.BASEURL;

  // get the data from database
  DisplayAdmins(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/display`)
  }

  // create the admin
  CreateAdmin(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/create`,request)
  }

  // Update Admin Detail
   UpdateAdminDetail(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/update/${id}`, data);
  }

  // delete the Admin
  deleteAdmin(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/delete`,request)
  }

   //product Image Upload
   ProductImageUpload(formdata: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/upload-image`, formdata);
  }

   //product Multiple Image Upload
   ProductMultipleImageUpload(formdata: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/upload-multiple-image`, formdata);
  }


}
