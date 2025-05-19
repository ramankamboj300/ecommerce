import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'E-Commerce';
  IsLogin: boolean = false;
  constructor(private router:Router){
    if(localStorage.getItem("userinfo")){
      this.IsLogin = true;
    }else{
      this.IsLogin = false;
    }
  }

  logout(){
    localStorage.removeItem("userinfo");
    this.IsLogin = false;
    this.router.navigate(['/login']);

  }


}
