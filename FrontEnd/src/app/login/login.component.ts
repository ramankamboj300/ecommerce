import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLogin: boolean = false;
  email: any;
  password: any;
  signupForm:any;
  constructor(private loginservice:LoginService,private router:Router,private appcomp:AppComponent,private fb:FormBuilder){
    if(localStorage.getItem("userinfo")){
    var userInfo = JSON.parse(localStorage.getItem("userinfo") || '{}');
      if(userInfo.id==1){
          this.router.navigate(['/overview']);
        }else{
          debugger
          this.router.navigate(['/homepage']);
        }
      }
      this.signupForm = this.fb.group({
        name: [''],
        password: [''],
        email: [''],
      });
  }
  toggleForm(){
    this.isLogin = !this.isLogin;
  }
  login(){
    debugger
    this.loginservice.login(this.email,this.password).subscribe((res:any)=>{
      if(res.message=="Login Success"){
        localStorage.setItem("token",res.token);
        if(res.result.id==1){
          localStorage.setItem("userinfo",JSON.stringify(res.result));
      this.appcomp.checkLogin();

          this.router.navigate(['/overview']);
        }else{
          debugger
          localStorage.setItem("customerInfo",JSON.stringify(res.result));
          this.router.navigate(['/homepage']);
        }
      }else{
        alert(res.message);
      }
  })
}
createUser(){
  console.log("signupForm",this.signupForm.value);
  this.loginservice.createUser(this.signupForm.value).subscribe((res:any)=>{  
    if(res.message=="Ok"){
      alert("User Created Successfully");
      this.signupForm.reset();
    }else{
      alert(res.message);
    }
  });
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
