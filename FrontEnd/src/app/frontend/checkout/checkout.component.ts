import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HomeService } from '../home/home.service';
import { Router } from '@angular/router';

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

  constructor(private fb:FormBuilder,private service:HomeService, private router:Router) {
    this.orderForm = this.fb.group({
      name: [''],
      email: [''],
      address: [''],
      mobile: [''],
      password:[''],

    });
    this.cartDetail = JSON.parse(localStorage.getItem("cart") || "[]");
    this.TotalAmount = this.cartDetail.reduce((acc: any, item: any) => acc + item.price, 0);
  }

 async placeOrder(){
    console.log(this.orderForm.value);
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
      this.router.navigate(['/homepage']);
    }
  }

}
