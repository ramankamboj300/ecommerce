import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLogin: boolean = false;
  email: any;
  password: any;

  constructor(private loginservice:LoginService,private router:Router){
    if(localStorage.getItem("userinfo")){
    var userInfo = JSON.parse(localStorage.getItem("userinfo") || '{}');
      if(userInfo.id==1){
          this.router.navigate(['/overview']);
        }else{
          debugger
          this.router.navigate(['/homepage']);
        }
      }
  }
  toggleForm(){
    this.isLogin = !this.isLogin;
  }
  login(){
    debugger
    this.loginservice.login(this.email,this.password).subscribe((res:any)=>{
      if(res.message=="Login Success"){
        if(res.result.id==1){
          localStorage.setItem("userinfo",JSON.stringify(res.result));
          this.router.navigate(['/overview']);
        }else{
          debugger
          localStorage.setItem("customerInfo",JSON.stringify(res.result));
          this.router.navigate(['/homepage']);
        }
      };
      alert(res.message);
  })
}

  ngOnInit() {
    const flipContainer = document.getElementById('flipBox');

    document.getElementById('toSignup')?.addEventListener('click', () => {
      flipContainer?.classList.add('show-signup');
    });

    document.getElementById('toLogin')?.addEventListener('click', () => {
      flipContainer?.classList.remove('show-signup');
    });
  }
}
