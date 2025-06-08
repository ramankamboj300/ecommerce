import { Component } from '@angular/core';
import { HomeService } from '../frontend/home/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product:any;
    link = "http://localhost:5199/";
  ProductImage: any;
  cartShow: any;
 constructor(private service:HomeService,private router :ActivatedRoute,private toastr:ToastrService) {
  this.router.queryParamMap.subscribe((params: any) =>
      this.GetProductByID(params.params.id)
    );
 }

 GetProductByID(id:any){
    this.service.GetProductByID(id).subscribe((data)=>{
      console.log(data);
      this.product=data.result;
      this.ProductImage= this.product.coverImage;
    })
 }
 showImage(img:any){
  this.ProductImage = img;
 }
   productAddedToCart(product: any) {
    debugger
    var cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    cartItems.push(product);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    this.toastr.success("Product Added to Cart: " + product.productName, "Success");
    this.cartShow=true;
  }

}
