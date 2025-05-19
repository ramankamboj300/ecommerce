import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: any[] = [];  
  link = "http://localhost:5199/";
  grandTotal: any;
  totalItems: any;

constructor(private router:Router) {
  this.getCartItemsFromLocalStorage();
 }

getCartItemsFromLocalStorage() {
  console.log('cartitems',JSON.parse(localStorage.getItem('cart') || '[]'));
  this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  this.grandTotal = this.cartItems.reduce((acc, item) => acc + item.price, 0);
  this.totalItems = this.cartItems.length;
}
removeItemFromCart(item: any) {
  const index = this.cartItems.indexOf(item);
  if (index > -1) {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.getCartItemsFromLocalStorage();
  }
}
navigatetoCheckout(){
  debugger
  this.router.navigate(['/homepage/checkout']);
}
}
