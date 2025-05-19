import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiurl = "http://localhost:5199/api/";
  constructor(private httpclient:HttpClient) { }

  addProduct(productData:any):Observable<any>{
    return this.httpclient.post(this.apiurl+"AddUpdateProduct",productData);
  }
  getAllProducts():Observable<any>{
    return this.httpclient.get(this.apiurl+"GetAllProducts");

  }

  uploadFiles(files:any){
    var formD = new FormData();
    for (var i=0;i<files.length;i++){
      formD.append("files",files[i]);
    }
    return this.httpclient.post(this.apiurl+"UploadFiles",formD);
  }

  getProductById(id:any):Observable<any>{
    return this.httpclient.get(this.apiurl+"GetProductByID?id="+id);
  }

  deleteProductById(id:any):Observable<any>{
    return this.httpclient.get(this.apiurl+"DeleteProductByID?id="+id);
  }
    getAllorderds():Observable<any>{
    return this.httpclient.get(this.apiurl+"GetOrdersByUserID?id=0");
  }
  ChangeOrderStatusByAdmin(id:any, status:any):Observable<any>{
    return this.httpclient.get(this.apiurl+"ChangeOrderStatusByAdmin?id="+id+"&status="+status);
  }
  getCustomers():Observable<any>{
    return this.httpclient.get(this.apiurl+"getCustomers");
  }
    getDashboardCount():Observable<any>{
    return this.httpclient.get(this.apiurl+"getDashboardCount");
  }
      getSalesRevenue():Observable<any>{
    return this.httpclient.get(this.apiurl+"getSalesRevenue");
  }
}
