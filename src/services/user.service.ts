import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http: HttpClient = inject(HttpClient)
  private baseUrl = 'http://localhost:5000'; 

  // send the user data to database
  SignUp(request: any): Observable<any> {
    const header = new HttpHeaders({
      'content-type': 'Application/json'
    })
    return this.http.post(`${this.baseUrl}/user/signup/`, request, { headers: header })
  }

  // check user data is there or not
  login(request: any): Observable<any> {
    const header = new HttpHeaders({
      'content-type': 'Application/json'
    })
    return this.http.post(`${this.baseUrl}/user/login/`, request, { headers: header });
  }

  //get user detail
  getuser(id:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/getuser/${id}`);
  }
  
  //Update the user detail
  UpdateUser(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/update/${id}`,data);
  }

  // delete the User Account
  deleteAccount(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user/delete/${id}`)
  }

}
