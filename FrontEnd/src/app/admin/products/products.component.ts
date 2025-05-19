import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  link = "http://localhost:5199/";
  productForm :any;
  image: any;
categories=[{"categoryName":"Electronics"},{"categoryName":"Mobile"},{"categoryName":"SmartWatch"}]
  ProductImages: any=[];
  products: any=[];
  ProductCoverImage:any;
  SelectedFiles: any;
  constructor(private fb:FormBuilder,private service:ProductsService){
  this.productForm =  this.fb.group({
    id: [0],
      productName: [''],
      price: [''],
      description: [''],
      category: [''],
      productsImages: [''],
      coverImage: [''],
    });

    this.getAllProducts();
  }

  addProduct() {  
    debugger
     console.log("formvalue",this.productForm.value);
     if(this.SelectedFiles){

     this.service.uploadFiles(this.SelectedFiles).subscribe((res:any)=>{
      console.log("res",res);
      this.productForm.patchValue({
        coverImage: res.result[0],
      });
     this.service.addProduct(this.productForm.value).subscribe((res:any)=>{
      console.log("res",res);
      alert(res.message);
      this.productForm.reset();
      this.getAllProducts();
     });
    });
  }else{
    this.service.addProduct(this.productForm.value).subscribe((res:any)=>{
      console.log("res",res);
      alert(res.message);
      this.productForm.reset();
      this.getAllProducts();
     });
  }

  }

  uploadMultipleFiles(event:any){
    debugger
    this.service.uploadFiles(Array.from(event.target.files)).subscribe((res:any)=>{
      var images = res.result.join(',');
      this.productForm.patchValue({
        productsImages: images,
      });
    });
    
  }

  async getAllProducts() {
    var data = await this.service.getAllProducts().toPromise();
    this.products = data.result;
    console.log("res",data);

  }

  deleteProductById(id:any){
    this.service.deleteProductById(id).subscribe((res:any)=>{
      console.log("res",res);
      alert(res.message);
      this.getAllProducts();
    });
  }

  getProductById(id:any){
    this.service.getProductById(id).subscribe((res:any)=>{
      console.log("getres",res);
      this.productForm.patchValue({
        id: res.result.id,
        productName: res.result.productName,
        price: res.result.price,
        description: res.result.description,
        category: res.result.category,
        productsImages: res.result.productsImages,
        coverImage: res.result.coverImage,
      });
    })
  }

  onImageUpload(event:any){
     var file = event.target.files;
     this.SelectedFiles = Array.from(event.target.files);
     if(file.length==1){
      var reader = new FileReader();
      reader.onload = (e:any)=>{
        this.ProductCoverImage = e.target.result;
      }
      reader.readAsDataURL(file[0]);
     }else{
      for (let index = 0; index < file.length; index++) {
        var reader = new FileReader();
        reader.onload = (e:any)=>{
          var img  = e.target.result;
          this.ProductImages.push(img);
        }
        reader.readAsDataURL(file[index]);
      }
     }
  }

}
