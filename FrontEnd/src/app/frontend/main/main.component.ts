import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet,CartComponent,RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  isLogin: boolean = false;
  constructor(private router:Router){
    var userInfo = localStorage.getItem("customerInfo");
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

}
