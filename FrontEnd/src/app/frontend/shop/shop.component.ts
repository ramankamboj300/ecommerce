import { Component } from '@angular/core';
import { HomeService } from '../home/home.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
Products: any;
categories=[{"categoryName":"Electronics"},{"categoryName":"Mobile"},{"categoryName":"SmartWatch"}]
  link = "http://localhost:5199/";
  cartShow: boolean = false;
  constructor(private homeservice:HomeService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.homeservice.getAllProducts().subscribe((data) => {
      console.log(data);
      this.Products = data.result;
    });
  }
  showHideCart(val:any){
    this.cartShow=val;
  }

  productAddedToCart(product: any) {
    debugger
    var cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    cartItems.push(product);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    this.toastr.success("Product Added to Cart: " + product.productName, "Success");
    this.cartShow=true;
  }

  searchProducts(searchTerm: any) {
    if (searchTerm.value) {
      this.Products = this.Products.filter((product: any) =>
        product.productName.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    } else {
      this.getAllProducts();
    }
  }
  async filterProducts(cat:any){
    debugger
    var data = await this.homeservice.getAllProducts().toPromise();
    if(data.result){
      this.Products = data.result;
    }
    if(cat.value){
      this.Products = this.Products.filter((product: any) =>
        product.category.toLowerCase().includes(cat.value.toLowerCase())
      );
    }
  }
async filterProductsusingPriceRange(priceRange:any){
  debugger
  var data = await this.homeservice.getAllProducts().toPromise();
  if(data.result){
    this.Products = data.result;
  }
  if(priceRange.value){
    if(priceRange.value=="1500+"){
      this.Products = this.Products.filter((product: any) =>
      product.price > priceRange.value
    );
  }else{

    this.Products = this.Products.filter((product: any) =>
      product.price < priceRange.value
  );
}
  }
}
}
