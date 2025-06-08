import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiurl = "http://localhost:5199/api/";
  constructor(private httpclient:HttpClient) { }
  
  createOrder(amount:any):Observable<any> {
    return this.httpclient.post<any>(this.apiurl + "Payment/createOrder", { amount });
  }
    verifyPayment(obj:any):Observable<any> {
    return this.httpclient.post<any>(this.apiurl + "Payment/verify-payment",  obj );
  }
  getInvoiceDetailByOrderID(OrderID: any): Observable<any> {
    return this.httpclient.get<any>(this.apiurl + "getInvoiceDataByOrderID?OrderID=" + OrderID);
  }
}
