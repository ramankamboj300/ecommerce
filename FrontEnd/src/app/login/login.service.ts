import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiurl = "http://localhost:5199/api/";
  constructor(private httpclient:HttpClient) { }


  login(email:any,password:any):Observable<any>{
    debugger
    return this.httpclient.get(this.apiurl+"Login?email="+email+"&password="+password);
  }
  getOrdersByUserID(userId:any):Observable<any>{
    return this.httpclient.get(this.apiurl+"GetOrdersByUserID?id="+userId);
  }
}
