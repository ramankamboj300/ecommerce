import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  apiurl = "http://localhost:5199/api/";
  constructor(private httpclient:HttpClient) { }


  getAllProducts():Observable<any>{
    debugger
    return this.httpclient.get(this.apiurl+"GetAllProducts");
  }
  placeOrder(order:any):Observable<any>{
    debugger
    return this.httpclient.post(this.apiurl+"PlaceOrder",order);
  }
}
