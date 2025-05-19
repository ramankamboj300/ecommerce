import { Component } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  Orders:any = [];
  Products: any;
  constructor(private service:ProductsService){
    this.getAllorderds();
  }

  getAllorderds(){
    this.service.getAllorderds().subscribe((data:any)=>{
      console.log('orders', data);
      if(data.message=="Ok"){
        this.Orders = data.result;
         this.Orders = this.Orders.map((item: any) => {
          const totalPrice = item.productsDetail.reduce((sum: number, product: any) => {
            return sum + product.totalPrice;
          }, 0);
          return { ...item, totalPrice };
        });
      }
    },(error:any)=>{
      console.log(error);
    })
  }

  getProductDetail(detail:any){
     this.Products = detail;
  }
  ChangeOrderStatusByAdmin(id:any, status:any){
    this.service.ChangeOrderStatusByAdmin(id, status.value).subscribe((data:any)=>{
      console.log('ChangeOrderStatusByAdmin', data);
      if(data.message=="Ok"){
        this.getAllorderds();
        alert("Order Status Changed Successfully");
      }
    },(error:any)=>{
      console.log(error);
    })
  }
}
