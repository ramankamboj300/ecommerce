import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HomeService } from '../home/home.service';
import { Router } from '@angular/router';
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  orderForm:any;
  cartDetail: any;
  TotalAmount: any;
  isLogin = false;
  constructor(private fb:FormBuilder,private service:HomeService, private router:Router,private paymentService:PaymentService) {
    this.orderForm = this.fb.group({
      name: [''],
      email: [''],
      address: [''],
      mobile: [''],
      password:[''],

    });
    this.cartDetail = JSON.parse(localStorage.getItem("cart") || "[]");
    this.TotalAmount = this.cartDetail.reduce((acc: any, item: any) => acc + item.price, 0);
    if (localStorage.getItem("customerInfo")) {
      this.isLogin = true;
      var customerInfo = JSON.parse(localStorage.getItem("customerInfo") || '{}');
      this.orderForm.patchValue({
        name: customerInfo.name,
        email: customerInfo.email,
      });
    }
  }

 async placeOrder(){
    var cart = JSON.parse(localStorage.getItem("cart") || "[]");
    var cartDetail = cart.map((item: any) => ({
      id: item.id,
      price: item.price,
    }));
    var obj = {
      name: this.orderForm.value.name,
      email: this.orderForm.value.email,
      shippingAddress: this.orderForm.value.address,
      mobile: this.orderForm.value.mobile,
      password: this.orderForm.value.password,
      products: cartDetail,
      orderAmount: cart.reduce((acc: any, item: any) => acc + item.price, 0).toString(),
      quantity: cart.length,
    }
    var data = await this.service.placeOrder(obj).toPromise();
    console.log(data);
    if (data.result) {
      alert("Order Placed Successfully");
      localStorage.removeItem("cart");
      this.orderForm.reset();
      this.router.navigate(['/invoice'], { queryParams: { orderID: data.result } });
    }
  }

  createpayment(){
    debugger
      var cart = JSON.parse(localStorage.getItem("cart") || "[]");
    var cartDetail = cart.map((item: any) => ({
      price: item.price,
    }));
    var amount = cartDetail[0].price;
    this.paymentService.createOrder(amount).subscribe((data:any)=>{
      const options = {
        key:"adas",
        amount: data.amount,
        currency: data.currency,
        name: "E-Commerce",
        description: "Test Transaction",
        order_id: data.orderId,
        handler: (response:any) => {
          this.paymentService.verifyPayment(response).subscribe((res:any)=>{
            if(res.message=="Payment verified successfully"){
              this.placeOrder();
            }else{
              alert("Payment Failed");
            }
          });
        },
        prefill: {
          name: this.orderForm.value.name,
          email: this.orderForm.value.email,
          contact: this.orderForm.value.mobile.toString()
        },
        theme:{
          color: "#3399cc"
        }
      }
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    });
  }

}
