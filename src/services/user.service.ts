import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 // Subject to trigger the function
 private headerFunctionSubject = new Subject<void>();

 // Observable for myaccount to trigger the Header function
 headerFunction$ = this.headerFunctionSubject.asObservable();

 // Method for myaccount to call
 triggerHeaderFunction() {
   this.headerFunctionSubject.next();
 }

  http: HttpClient = inject(HttpClient)
  private baseUrl = environment.BASEURL;

  // send the user data to database
  SignUp(request: any): Observable<any> {
    const header = new HttpHeaders({
      'content-type': 'Application/json'
    })
    return this.http.post(`${this.baseUrl}/user/signup/`, request, { headers: header })
  }

  // check user data is there or not
  login(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/login/`, request);
  }

  // Save the token in database
  Token(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/token/`, request);
  }

  // remove token form database in users table when logout
  TokenRemove(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/tokenremove/`, request);
  }

  //get user detail
  getuser(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/getuser`, request);
  }

  //Update the user detail
  UpdateUser(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/update`, request);
  }

  // delete the User Account
  deleteAccount(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/delete`, request)
  }
}
