import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet,CartComponent,RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  isLogin: boolean = false;
  cartShow=false
  constructor(private router:Router, private appcomp:AppComponent){
    var userInfo = localStorage.getItem("customerInfo");
     if(localStorage.getItem("userinfo")){
      appcomp.logout();
    }
    if(userInfo){
      this.isLogin = true;
    }
  }

  login(){
    this.router.navigate(['/login']);
  }

  logout(){
    localStorage.removeItem("customerInfo");
    this.isLogin = false;
    this.router.navigate(['/login']);
  }
  openCart(value: boolean) {
    this.cartShow = value;
  }

}
