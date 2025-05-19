import { Component } from '@angular/core';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-myaccount',
  standalone: true,
  imports: [],
  templateUrl: './myaccount.component.html',
  styleUrl: './myaccount.component.css'
})
export class MyaccountComponent {
customerInfo:any;
  OrderDetails: any;
  constructor(private logserv:LoginService){
    this.customerInfo = JSON.parse(localStorage.getItem('customerInfo') || '{}');
    this.getOrdersByUserID();
  }

  getOrdersByUserID(){
    this.logserv.getOrdersByUserID(this.customerInfo.id).subscribe((data:any)=>{
      if(data.message == "Ok"){
        this.OrderDetails = data.result;
        this.OrderDetails = this.OrderDetails.map((item: any) => {
          const totalPrice = item.productsDetail.reduce((sum: number, product: any) => {
            return sum + product.totalPrice;
          }, 0);
          return { ...item, totalPrice };
        });
        console.log("orders", this.OrderDetails);
      }
    },(error:any)=>{
      console.log("error", error);
    });
  }

}
